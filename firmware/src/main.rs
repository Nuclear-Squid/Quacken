#![no_std]
#![no_main]

mod layout;

// set the panic handler
use panic_halt as _;

#[link_section = ".boot2"]
#[used]
pub static BOOT2: [u8; 256] = rp2040_boot2::BOOT_LOADER_W25Q080;

#[rtic::app(device = rp2040_hal::pac, peripherals = true, dispatchers = [PIO0_IRQ_0, PIO0_IRQ_1, PIO1_IRQ_0])]
mod app {
    use crate::layout as kb_layout;

    use core::convert::Infallible;
    use core::mem::MaybeUninit;

    use rp2040_hal::{
        self,
        fugit::MicrosDurationU32,
        clocks::init_clocks_and_plls,
        sio::Sio,
        timer::{ Alarm, Alarm0, Timer },
        usb::UsbBus,
        watchdog::Watchdog,
        gpio,
    };

    use embedded_hal::digital::v2::OutputPin as _;

    // rp2040 implementations of the embedded_hal::digital::{InputPin,OutputPin} traits
    type InputPin = gpio::Pin<gpio::DynPinId, gpio::FunctionSioInput, gpio::PullUp>;
    type OutputPin = gpio::Pin<gpio::DynPinId, gpio::FunctionSioOutput, gpio::PullDown>;

    use keyberon::{
        debounce::Debouncer,
        key_code::KbHidReport,
        layout::Layout,
        matrix::Matrix,
    };

    use usb_device::{
        prelude::UsbDeviceState,
        class_prelude::UsbBusAllocator,
        // HACK: import the UsbClass trait, but still allow to use its name for a type later
        class::UsbClass as _,
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

    // Fun fact, keayboard is invisible to `lsusb` if scan time is set to 10_000 or above.
    const SCAN_TIME_US: u32 = 1000;
    const EXTERNAL_XTAL_FREQ_HZ: u32 = 12_000_000u32;

    #[shared]
    struct Shared {
        usb_dev: UsbDevice,
        usb_class: UsbClass,
        alarm: Alarm0,
        #[lock_free]
        watchdog: Watchdog,
        #[lock_free]
        led_pin: gpio::Pin<
            gpio::bank0::Gpio25,
            gpio::FunctionSioOutput,
            gpio::PullDown
        >,
    }

    #[local]
    struct Local {
        matrix: Matrix<InputPin, OutputPin, 8, 6>,
        layout: Layout<8, 6, 1, ()>,
        debouncer: Debouncer<[[bool; 8]; 6]>,
        timer: Timer,
    }

    #[init(local = [bus: Option<UsbBusAllocator<UsbBus>> = None])]
    fn init(c: init::Context) -> (Shared, Local, init::Monotonics) {
        // https://github.com/rp-rs/rp-hal/blob/main/rp2040-hal-examples/src/bin/gpio_in_out.rs
        let mut resets = c.device.RESETS;
        let sio = Sio::new(c.device.SIO);
        let pins = rp2040_hal::gpio::Pins::new(
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

        let led_pin = pins.gpio25.into_push_pull_output();

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

        watchdog.start(MicrosDurationU32::micros(10_000_u32));

        let Ok(matrix) = cortex_m::interrupt::free(move |_cs| {
            Matrix::new(
                [
                    pins.gpio3.into_pull_up_input().into_dyn_pin(),
                    pins.gpio4.into_pull_up_input().into_dyn_pin(),
                    pins.gpio5.into_pull_up_input().into_dyn_pin(),
                    pins.gpio9.into_pull_up_input().into_dyn_pin(),
                    pins.gpio18.into_pull_up_input().into_dyn_pin(),
                    pins.gpio19.into_pull_up_input().into_dyn_pin(),
                    pins.gpio20.into_pull_up_input().into_dyn_pin(),
                    pins.gpio10.into_pull_up_input().into_dyn_pin(),
                ],
                [
                    pins.gpio16.into_push_pull_output().into_dyn_pin(),
                    pins.gpio14.into_push_pull_output().into_dyn_pin(),
                    pins.gpio15.into_push_pull_output().into_dyn_pin(),
                    pins.gpio8.into_push_pull_output().into_dyn_pin(),
                    pins.gpio7.into_push_pull_output().into_dyn_pin(),
                    pins.gpio6.into_push_pull_output().into_dyn_pin(),
                ],
            )
        });

        (
            Shared {
                usb_dev,
                usb_class,
                alarm,
                watchdog,
                led_pin,
            },
            Local {
                matrix,
                layout: Layout::new(&kb_layout::LAYERS),
                debouncer: Debouncer::new([[false; 8]; 6], [[false; 8]; 6], 5),
                timer,
            },
            init::Monotonics(),
        )
    }

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

    #[task(
        binds = TIMER_IRQ_0,
        priority = 1,
        local = [matrix, layout, debouncer, timer],
        shared = [led_pin, alarm, watchdog, usb_dev, usb_class],
    )]
    fn process_kbd_events(mut c: process_kbd_events::Context) {
        static mut LED_TURNED_ON: bool = false;
        static mut LED_COUNTER: u32 = 100;

        c.shared.alarm.lock(|a| {
            a.clear_interrupt();
            a.schedule(MicrosDurationU32::micros(SCAN_TIME_US))
                .expect("Couldn’t schedule matrix scan, kb is effectively bricked");
            a.enable_interrupt();
        });

        c.shared.watchdog.feed();

        for event in c.local.debouncer.events(c.local.matrix.get().get()) {
            c.local.layout.event(event);
            // // Fit the 4*12 layout into the 8 * 6 matrix (Quacken Zero)
            // let physical_key = {
            //     if event.coord().0 >= 4 {
            //         // event.transform(|row, col| (row - 4, col))
            //         continue;
            //     }
            //     else {
            //         // event.transform(|row, col| (row, 11 - col))
            //         event
            //     }
            // };
            //
            // c.local.layout.event(physical_key);
        }

        c.local.layout.tick();

        if c.shared.usb_dev.lock(|d| d.state()) != UsbDeviceState::Configured {
            return;
        }

        // No matter what we do above, this always fails
        let report: KbHidReport = c.local.layout.keycodes().collect();
        if !c
            .shared
            .usb_class
            .lock(|k| k.device_mut().set_keyboard_report(report.clone()))
        {
            return;
        }

        unsafe {
            if LED_COUNTER == 0 {
                LED_COUNTER = 100;
                if LED_TURNED_ON {
                    c.shared.led_pin.set_low().unwrap();
                } else {
                    c.shared.led_pin.set_high().unwrap();
                }
                LED_TURNED_ON = !LED_TURNED_ON;
            }
            else {
                LED_COUNTER -= 1;
            }
        }

        while let Ok(0) = c.shared.usb_class.lock(|k| k.write(report.as_bytes())) {}
    }
}
