#![no_std]
#![no_main]

mod demux_matrix;
mod layout;

#[link_section = ".boot2"]
#[used]
pub static BOOT2: [u8; 256] = rp2040_boot2::BOOT_LOADER_W25Q080;

#[rtic::app(device = rp2040_hal::pac, peripherals = true, dispatchers = [PIO0_IRQ_0, PIO0_IRQ_1, PIO1_IRQ_0])]
mod app {
    use cortex_m::prelude::{
        _embedded_hal_watchdog_Watchdog, _embedded_hal_watchdog_WatchdogEnable,
    };
    use defmt_rtt as _;
    // use embedded_time::duration::Extensions;
    // use embedded_time::rate::Extensions as RateExtensions;
    use panic_probe as _;
    use rp2040_hal::{
        self,
        fugit::MicrosDurationU32,
        clocks::init_clocks_and_plls,
        pio::PIOExt,
        sio::Sio,
        timer::{ Alarm, Alarm0, Timer },
        usb::UsbBus,
        watchdog::Watchdog,
        gpio,
    };

    // rp2040 implementations of the embedded_hal::digital::{InputPin,OutputPin} traits
    type InputPin = gpio::Pin<gpio::DynPinId, gpio::FunctionSioInput, gpio::PullUp>;
    type OutputPin = gpio::Pin<gpio::DynPinId, gpio::FunctionSioOutput, gpio::PullUp>;

    // use core::iter::once;

    use crate::demux_matrix::DemuxMatrix;
    use crate::layout as kb_layout;

    use keyberon::debounce::Debouncer;
    use keyberon::key_code;
    use keyberon::layout::{CustomEvent, Event, Layout};
    use keyberon::matrix::Matrix;
    // use keyberon::keyboard::Leds;

    use usb_device::{
        prelude::UsbDeviceState,
        class_prelude::UsbBusAllocator,
        // HACK: import the UsbClass trait, but still allow to use its name for a type later
        class::UsbClass as _,
    };

    type UsbClass = keyberon::Class<'static, UsbBus, ()>;
    type UsbDevice = usb_device::device::UsbDevice<'static, UsbBus>;

    const SCAN_TIME_US: u32 = 1000;
    const EXTERNAL_XTAL_FREQ_HZ: u32 = 12_000_000u32;

    static mut USB_BUS: Option<UsbBusAllocator<UsbBus>> = None;

    #[shared]
    struct Shared {
        usb_dev: UsbDevice,
        usb_class: UsbClass,
        timer: Timer,
        alarm: Alarm0,
        #[lock_free]
        matrix: Matrix<InputPin, OutputPin, 8, 6>,
        layout: Layout<8, 6, 1, kb_layout::CustomActions>,
        #[lock_free]
        debouncer: Debouncer<[[bool; 8]; 6]>,
        #[lock_free]
        watchdog: Watchdog,
    }

    #[local]
    struct Local {}

    #[init]
    fn init(c: init::Context) -> (Shared, Local, init::Monotonics) {
        let mut resets = c.device.RESETS;
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

        // https://github.com/rp-rs/rp-hal/blob/main/rp2040-hal-examples/src/bin/gpio_in_out.rs
        let sio = Sio::new(c.device.SIO);
        let pins = rp2040_hal::gpio::Pins::new(
            c.device.IO_BANK0,
            c.device.PADS_BANK0,
            sio.gpio_bank0,
            &mut resets,
        );

        let mut timer = Timer::new(c.device.TIMER, &mut resets, &clocks);
        let mut alarm = timer.alarm_0().unwrap();
        alarm.schedule(MicrosDurationU32::micros(SCAN_TIME_US));
        alarm.enable_interrupt();

        let (mut pio, sm0, sm1, _, _) = c.device.PIO0.split(&mut resets);

        let usb_bus = UsbBusAllocator::new(UsbBus::new(
            c.device.USBCTRL_REGS,
            c.device.USBCTRL_DPRAM,
            clocks.usb_clock,
            true,
            &mut resets,
        ));

        unsafe {
            USB_BUS = Some(usb_bus);
        }

        let usb_class = keyberon::new_class(unsafe { USB_BUS.as_ref().unwrap() }, ());
        let usb_dev = keyberon::new_device(unsafe { USB_BUS.as_ref().unwrap() });

        watchdog.start(MicrosDurationU32::micros(10_000_u32));

        // Nibble demux matrix, old rp2040 API
        let demux_matrix = DemuxMatrix::new(
            [
                pins.gpio29.into_push_pull_output().into(),
                pins.gpio28.into_push_pull_output().into(),
                pins.gpio27.into_push_pull_output().into(),
                pins.gpio26.into_push_pull_output().into(),
            ],
            [
                pins.gpio18.into_pull_up_input().into(),
                pins.gpio20.into_pull_up_input().into(),
                pins.gpio19.into_pull_up_input().into(),
                pins.gpio10.into_pull_up_input().into(),
                pins.gpio4.into_pull_up_input().into(),
            ],
            16,
        );

        // Quacken keyberon matrix, new rp2040 API
        let matrix = Matrix::new(
            [
                pins.gpio3.into_pull_up_input(),
                pins.gpio4.into_pull_up_input(),
                pins.gpio5.into_pull_up_input(),
                pins.gpio9.into_pull_up_input(),
                pins.gpio18.into_pull_up_input(),
                pins.gpio19.into_pull_up_input(),
                pins.gpio20.into_pull_up_input(),
                pins.gpio10.into_pull_up_input(),
            ],
            [
                pins.gpio16.into_push_pull_output(),
                pins.gpio14.into_push_pull_output(),
                pins.gpio15.into_push_pull_output(),
                pins.gpio8.into_push_pull_output(),
                pins.gpio7.into_push_pull_output(),
                pins.gpio6.into_push_pull_output(),
            ],
        );

        (
            Shared {
                usb_dev,
                usb_class,
                timer,
                alarm,
                matrix: matrix.unwrap(),
                debouncer: Debouncer::new([[false; 8]; 6], [[false; 8]; 6], 10),
                layout: Layout::new(&kb_layout::LAYERS),
                watchdog,
            },
            Local {},
            init::Monotonics(),
        )
    }

    #[task(binds = USBCTRL_IRQ, priority = 4, shared = [usb_dev, usb_class])]
    fn usb_rx(c: usb_rx::Context) {
        let usb = c.shared.usb_dev;
        let kb = c.shared.usb_class;
        (usb, kb).lock(|usb, kb| {
            if usb.poll(&mut [kb]) {
                kb.poll();
            }
        });
    }

    #[task(priority = 2, capacity = 8, shared = [usb_dev, usb_class, layout])]
    fn handle_event(mut c: handle_event::Context, event: Option<Event>) {
        let mut layout = c.shared.layout;
        match event {
            None => {
                if let CustomEvent::Press(event) = layout.lock(|l| l.tick()) {
                    match event {
                        kb_layout::CustomActions::Underglow => {
                        }
                        kb_layout::CustomActions::Bootloader => {
                            rp2040_hal::rom_data::reset_to_usb_boot(0, 0);
                        }
                        kb_layout::CustomActions::Display => {
                        }
                    };
                }
            }
            Some(e) => {
                layout.lock(|l| l.event(e));
                return;
            }
        }

        let report: key_code::KbHidReport = layout.lock(|l| l.keycodes().collect());
        if !c
            .shared
            .usb_class
            .lock(|k| k.device_mut().set_keyboard_report(report.clone()))
        {
            return;
        }
        if c.shared.usb_dev.lock(|d| d.state()) != UsbDeviceState::Configured {
            return;
        }
        while let Ok(0) = c.shared.usb_class.lock(|k| k.write(report.as_bytes())) {}
    }

    #[task(binds = TIMER_IRQ_0, priority = 1, shared = [matrix, debouncer, timer, alarm, watchdog, usb_dev, usb_class])]
    fn scan_timer_irq(mut c: scan_timer_irq::Context) {
        let mut alarm = c.shared.alarm;

        alarm.lock(|a| {
            a.clear_interrupt();
            a.schedule(MicrosDurationU32::micros(SCAN_TIME_US));
        });

        c.shared.watchdog.feed();

        for event in c.shared.debouncer.events(c.shared.matrix.get().unwrap()) {
            handle_event::spawn(Some(event)).unwrap();
        }

        handle_event::spawn(None).unwrap();
    }
}
