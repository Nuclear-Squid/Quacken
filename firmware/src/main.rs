#![no_std]
#![no_main]

mod layout; // 3*6 key layout
mod zero; // QuackenZero-specific matrix scanning

// set the panic handler
use panic_halt as _;

#[unsafe(link_section = ".boot2")]
#[used]
pub static BOOT2: [u8; 256] = rp2040_boot2::BOOT_LOADER_W25Q080;

#[rtic::app(
    device = rp2040_hal::pac,
    peripherals = true,
    dispatchers = [PIO0_IRQ_0, PIO0_IRQ_1, PIO1_IRQ_0]
)]
mod app {
    use crate::layout::{self as kb_layout, QuackenLayout};
    use crate::zero::QuackenZeroMatrix;

    use core::convert::Infallible;

    use cortex_m::delay::Delay;

    use rp2040_hal::{
        self, Clock,
        clocks::init_clocks_and_plls,
        fugit::MicrosDurationU32,
        gpio::Pins,
        pac::CorePeripherals,
        sio::Sio,
        timer::{Alarm, Alarm0, Timer},
        usb::UsbBus,
        watchdog::Watchdog,
    };

    use keyberon::{debounce::Debouncer, key_code::KbHidReport, layout::Layout};

    use usb_device::{
        // HACK: import the UsbClass trait, but still allow to use its name for a type later
        class::UsbClass as _,
        class_prelude::UsbBusAllocator,
        prelude::UsbDeviceState,
    };

    type UsbClass = keyberon::Class<'static, UsbBus, ()>;
    type UsbDevice = usb_device::device::UsbDevice<'static, UsbBus>;

    trait ResultExt<T> {
        fn get(self) -> T;
    }
    impl<T> ResultExt<T> for Result<T, Infallible> {
        fn get(self) -> T {
            match self {
                Ok(v) => v,
                Err(e) => match e {},
            }
        }
    }

    // Fun fact: the keyboard is invisible to `lsusb`
    // if the scan time is set to 10_000 us or above.
    const SCAN_TIME_US: u32 = 1_000;
    const WATCHDOG_TIME_US: u32 = 10_000;
    const EXTERNAL_XTAL_FREQ_HZ: u32 = 12_000_000;

    #[shared]
    struct Shared {
        usb_dev: UsbDevice,
        usb_class: UsbClass,
        alarm: Alarm0,
        #[lock_free]
        watchdog: Watchdog,
    }

    #[local]
    struct Local {
        matrix: QuackenZeroMatrix,
        layout: QuackenLayout,
        debouncer: Debouncer<[[bool; kb_layout::COLS]; kb_layout::ROWS]>,
        delay: Delay,
        timer: Timer,
    }

    #[init(local = [bus: Option<UsbBusAllocator<UsbBus>> = None])]
    fn init(c: init::Context) -> (Shared, Local) {
        // https://github.com/rp-rs/rp-hal/blob/main/rp2040-hal-examples/src/bin/gpio_in_out.rs
        let mut resets = c.device.RESETS;
        let sio = Sio::new(c.device.SIO);
        let pins = Pins::new(
            c.device.IO_BANK0,
            c.device.PADS_BANK0,
            sio.gpio_bank0,
            &mut resets,
        );

        let mut watchdog = Watchdog::new(c.device.WATCHDOG);
        watchdog.pause_on_debug(false);

        let clocks = init_clocks_and_plls(
            EXTERNAL_XTAL_FREQ_HZ,
            c.device.XOSC,
            c.device.CLOCKS,
            c.device.PLL_SYS,
            c.device.PLL_USB,
            &mut resets,
            &mut watchdog,
        )
        .unwrap();

        let core = unsafe { CorePeripherals::steal() };
        let delay = Delay::new(core.SYST, clocks.system_clock.freq().to_Hz());

        let mut timer = Timer::new(c.device.TIMER, &mut resets, &clocks);
        let mut alarm = timer.alarm_0().unwrap();
        alarm
            .schedule(MicrosDurationU32::micros(SCAN_TIME_US))
            .expect("Couldn’t schedule matrix scan, kb is effectively bricked");
        alarm.enable_interrupt();

        let usb = UsbBus::new(
            c.device.USBCTRL_REGS,
            c.device.USBCTRL_DPRAM,
            clocks.usb_clock,
            true,
            &mut resets,
        );

        *c.local.bus = Some(UsbBusAllocator::new(usb));
        let usb_bus = c.local.bus.as_ref().unwrap();

        let usb_class = keyberon::new_class(usb_bus, ());
        let usb_dev = keyberon::new_device(usb_bus);

        watchdog.start(MicrosDurationU32::micros(WATCHDOG_TIME_US));

        #[allow(unused_mut)]
        let Ok(mut matrix) = QuackenZeroMatrix::new_sparkfun_rp2040(pins);
        //// Uncomment if you soldered your microcontroller face down:
        // matrix.upside_down();

        (
            Shared {
                usb_dev,
                usb_class,
                alarm,
                watchdog,
            },
            Local {
                matrix,
                layout: Layout::new(&kb_layout::LAYERS),
                debouncer: Debouncer::new(
                    [[false; kb_layout::COLS]; kb_layout::ROWS],
                    [[false; kb_layout::COLS]; kb_layout::ROWS],
                    5,
                ),
                delay,
                timer,
            },
        )
    }

    // USB events (polling)
    #[task(
        binds = USBCTRL_IRQ,
        priority = 4,
        shared = [usb_dev, usb_class]
    )]
    fn usb_rx(c: usb_rx::Context) {
        let usb = c.shared.usb_dev;
        let kb = c.shared.usb_class;
        (usb, kb).lock(|usb, kb| {
            if usb.poll(&mut [kb]) {
                kb.poll();
            }
        });
    }

    // keyboard events (timer)
    #[task(
        binds = TIMER_IRQ_0,
        priority = 1,
        local = [matrix, layout, debouncer, delay, timer],
        shared = [alarm, watchdog, usb_dev, usb_class],
    )]
    fn process_kbd_events(mut c: process_kbd_events::Context) {
        c.shared.alarm.lock(|a| {
            a.clear_interrupt();
            a.schedule(MicrosDurationU32::micros(SCAN_TIME_US))
                .expect("Couldn’t schedule matrix scan, kb is effectively bricked");
            a.enable_interrupt();
        });

        c.shared.watchdog.feed();

        let delay_1us = || c.local.delay.delay_us(1);
        for event in c
            .local
            .debouncer
            .events(c.local.matrix.get_with_delay(delay_1us).get())
        {
            c.local.layout.event(event);
        }

        c.local.layout.tick();

        if c.shared.usb_dev.lock(|d| d.state()) != UsbDeviceState::Configured {
            return;
        }

        let report: KbHidReport = c.local.layout.keycodes().collect();
        if !c
            .shared
            .usb_class
            .lock(|k| k.device_mut().set_keyboard_report(report.clone()))
        {
            return;
        }

        while let Ok(0) = c.shared.usb_class.lock(|k| k.write(report.as_bytes())) {}
    }
}
