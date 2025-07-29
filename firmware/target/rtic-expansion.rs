#[doc = r" The RTIC application module"] pub mod app
{
    #[doc =
    r" Always include the device crate which contains the vector table"] use
    rp2040_hal :: pac as
    you_must_enable_the_rt_feature_for_the_pac_in_your_cargo_toml; use
    cortex_m :: prelude ::
    {
        _embedded_hal_watchdog_Watchdog,
        _embedded_hal_watchdog_WatchdogEnable,
    }; use defmt_rtt as _; use panic_probe as _; use rp2040_hal; use
    rp2040_hal ::
    {
        clocks :: init_clocks_and_plls, gpio :: dynpin :: DynPin, pio ::
        PIOExt, sio :: Sio, timer :: { Alarm0, Timer }, usb :: UsbBus,
        watchdog :: Watchdog,
    }; use crate :: demux_matrix :: DemuxMatrix; use crate :: layout as
    kb_layout; use keyberon :: debounce :: Debouncer; use keyberon ::
    key_code; use keyberon :: layout :: { CustomEvent, Event, Layout }; use
    rp2040_hal :: usb; use usb_device :: bus :: UsbBusAllocator; use
    usb_device :: class :: UsbClass as _; use usb_device :: device ::
    UsbDeviceState; #[doc = r" User code from within the module"] type
    UsbClass = keyberon :: Class < 'static, usb :: UsbBusType, () > ; type
    UsbDevice = usb_device :: device :: UsbDevice < 'static, usb :: UsbBusType
    > ; const SCAN_TIME_US : u32 = 1000; const EXTERNAL_XTAL_FREQ_HZ : u32 =
    12_000_000u32; static mut USB_BUS : Option < UsbBusAllocator < UsbBus > >
    = None; #[doc = r" User code end"] #[doc = " User provided init function"]
    #[inline(always)] #[allow(non_snake_case)] fn init(c : init :: Context) ->
    (Shared, Local, init :: Monotonics)
    {
        let mut resets = c.device.RESETS; let mut watchdog = Watchdog ::
        new(c.device.WATCHDOG); watchdog.pause_on_debug(false); let clocks =
        init_clocks_and_plls(EXTERNAL_XTAL_FREQ_HZ, c.device.XOSC,
        c.device.CLOCKS, c.device.PLL_SYS, c.device.PLL_USB, & mut resets, &
        mut watchdog,).ok().unwrap(); let sio = Sio :: new(c.device.SIO); let
        pins = rp2040_hal :: gpio :: Pins ::
        new(c.device.IO_BANK0, c.device.PADS_BANK0, sio.gpio_bank0, & mut
        resets,); let mut timer = Timer :: new(c.device.TIMER, & mut resets);
        let mut alarm = timer.alarm_0().unwrap(); let _ =
        alarm.schedule(SCAN_TIME_US); alarm.enable_interrupt(); let
        (mut pio, sm0, sm1, _, _) = c.device.PIO0.split(& mut resets); let
        usb_bus = UsbBusAllocator ::
        new(UsbBus ::
        new(c.device.USBCTRL_REGS, c.device.USBCTRL_DPRAM, clocks.usb_clock,
        true, & mut resets,)); unsafe { USB_BUS = Some(usb_bus); } let usb_dev
        = keyberon :: new_device(unsafe { USB_BUS.as_ref().unwrap() }); type
        usb_class = keyberon :: Class < 'static, usb :: UsbBusType, () > ;
        watchdog.start(10_000_u32); let matrix = DemuxMatrix ::
        new([pins.gpio29.into_push_pull_output().into(),
        pins.gpio28.into_push_pull_output().into(),
        pins.gpio27.into_push_pull_output().into(),
        pins.gpio26.into_push_pull_output().into(),],
        [pins.gpio18.into_pull_up_input().into(),
        pins.gpio20.into_pull_up_input().into(),
        pins.gpio19.into_pull_up_input().into(),
        pins.gpio10.into_pull_up_input().into(),
        pins.gpio4.into_pull_up_input().into(),], 16,);
        (Shared
        {
            usb_dev, usb_class, timer, alarm, matrix : matrix.unwrap(),
            debouncer : Debouncer ::
            new([[false; 16]; 5], [[false; 16]; 5], 10), layout : Layout ::
            new(& kb_layout :: LAYERS), watchdog,
        }, Local {}, init :: Monotonics(),)
    } #[doc = " User HW task: usb_rx"] #[allow(non_snake_case)] fn
    usb_rx(c : usb_rx :: Context)
    {
        use rtic :: Mutex as _; use rtic :: mutex :: prelude :: * ; let usb =
        c.shared.usb_dev; let kb = c.shared.usb_class;
        (usb,
        kb).lock(| usb, kb | { if usb.poll(& mut [kb]) { kb.poll(); } });
    } #[doc = " User HW task: scan_timer_irq"] #[allow(non_snake_case)] fn
    scan_timer_irq(mut c : scan_timer_irq :: Context)
    {
        use rtic :: Mutex as _; use rtic :: mutex :: prelude :: * ; let mut
        alarm = c.shared.alarm;
        alarm.lock(| a |
        { a.clear_interrupt(); let _ = a.schedule(SCAN_TIME_US); });
        c.shared.watchdog.feed(); for event in
        c.shared.debouncer.events(c.shared.matrix.get().unwrap())
        { handle_event :: spawn(Some(event)).unwrap(); } handle_event ::
        spawn(None).unwrap();
    } #[doc = " User SW task handle_event"] #[allow(non_snake_case)] fn
    handle_event(mut c : handle_event :: Context, event : Option < Event >)
    {
        use rtic :: Mutex as _; use rtic :: mutex :: prelude :: * ; let mut
        layout = c.shared.layout; match event
        {
            None =>
            {
                if let CustomEvent :: Press(event) =
                layout.lock(| l | l.tick())
                {
                    match event
                    {
                        kb_layout :: CustomActions :: Underglow => {} kb_layout ::
                        CustomActions :: Bootloader =>
                        { rp2040_hal :: rom_data :: reset_to_usb_boot(0, 0); }
                        kb_layout :: CustomActions :: Display => {}
                    };
                }
            } Some(e) => { layout.lock(| l | l.event(e)); return; }
        } let report : key_code :: KbHidReport =
        layout.lock(| l | l.keycodes().collect()); if !
        c.shared.usb_class.lock(| k |
        k.device_mut().set_keyboard_report(report.clone())) { return; } if
        c.shared.usb_dev.lock(| d | d.state()) != UsbDeviceState :: Configured
        { return; } while let Ok(0) =
        c.shared.usb_class.lock(| k | k.write(report.as_bytes())) {}
    } #[doc = " RTIC shared resource struct"] struct Shared
    {
        usb_dev : UsbDevice, usb_class : UsbClass, timer : Timer, alarm :
        Alarm0, matrix : DemuxMatrix < DynPin, DynPin, 16, 5 > , layout :
        Layout < 16, 5, 1, kb_layout :: CustomActions > , debouncer :
        Debouncer < [[bool; 16]; 5] > , watchdog : Watchdog,
    } #[doc = " RTIC local resource struct"] struct Local {}
    #[doc = r" Monotonics used by the system"] #[allow(non_snake_case)]
    #[allow(non_camel_case_types)] pub struct __rtic_internal_Monotonics();
    #[doc = r" Execution context"] #[allow(non_snake_case)]
    #[allow(non_camel_case_types)] pub struct __rtic_internal_init_Context <
    'a >
    {
        #[doc = r" Core (Cortex-M) peripherals"] pub core : rtic :: export ::
        Peripherals, #[doc = r" Device peripherals"] pub device : rp2040_hal
        :: pac :: Peripherals, #[doc = r" Critical section token for init"]
        pub cs : rtic :: export :: CriticalSection < 'a > ,
    } impl < 'a > __rtic_internal_init_Context < 'a >
    {
        #[doc(hidden)] #[inline(always)] pub unsafe fn
        new(core : rtic :: export :: Peripherals,) -> Self
        {
            __rtic_internal_init_Context
            {
                device : rp2040_hal :: pac :: Peripherals :: steal(), cs :
                rtic :: export :: CriticalSection :: new(), core,
            }
        }
    } #[allow(non_snake_case)] #[doc = " Initialization function"] pub mod
    init
    {
        #[doc(inline)] pub use super :: __rtic_internal_Monotonics as
        Monotonics; #[doc(inline)] pub use super ::
        __rtic_internal_init_Context as Context;
    } mod shared_resources
    {
        use rtic :: export :: Priority; #[doc(hidden)]
        #[allow(non_camel_case_types)] pub struct
        usb_dev_that_needs_to_be_locked < 'a > { priority : & 'a Priority, }
        impl < 'a > usb_dev_that_needs_to_be_locked < 'a >
        {
            #[inline(always)] pub unsafe fn new(priority : & 'a Priority) ->
            Self { usb_dev_that_needs_to_be_locked { priority } }
            #[inline(always)] pub unsafe fn priority(& self) -> & Priority
            { self.priority }
        } #[doc(hidden)] #[allow(non_camel_case_types)] pub struct
        usb_class_that_needs_to_be_locked < 'a > { priority : & 'a Priority, }
        impl < 'a > usb_class_that_needs_to_be_locked < 'a >
        {
            #[inline(always)] pub unsafe fn new(priority : & 'a Priority) ->
            Self { usb_class_that_needs_to_be_locked { priority } }
            #[inline(always)] pub unsafe fn priority(& self) -> & Priority
            { self.priority }
        } #[doc(hidden)] #[allow(non_camel_case_types)] pub struct
        timer_that_needs_to_be_locked < 'a > { priority : & 'a Priority, }
        impl < 'a > timer_that_needs_to_be_locked < 'a >
        {
            #[inline(always)] pub unsafe fn new(priority : & 'a Priority) ->
            Self { timer_that_needs_to_be_locked { priority } }
            #[inline(always)] pub unsafe fn priority(& self) -> & Priority
            { self.priority }
        } #[doc(hidden)] #[allow(non_camel_case_types)] pub struct
        alarm_that_needs_to_be_locked < 'a > { priority : & 'a Priority, }
        impl < 'a > alarm_that_needs_to_be_locked < 'a >
        {
            #[inline(always)] pub unsafe fn new(priority : & 'a Priority) ->
            Self { alarm_that_needs_to_be_locked { priority } }
            #[inline(always)] pub unsafe fn priority(& self) -> & Priority
            { self.priority }
        } #[doc(hidden)] #[allow(non_camel_case_types)] pub struct
        layout_that_needs_to_be_locked < 'a > { priority : & 'a Priority, }
        impl < 'a > layout_that_needs_to_be_locked < 'a >
        {
            #[inline(always)] pub unsafe fn new(priority : & 'a Priority) ->
            Self { layout_that_needs_to_be_locked { priority } }
            #[inline(always)] pub unsafe fn priority(& self) -> & Priority
            { self.priority }
        }
    } #[allow(non_snake_case)] #[allow(non_camel_case_types)]
    #[doc = " Shared resources `usb_rx` has access to"] pub struct
    __rtic_internal_usb_rxSharedResources < 'a >
    {
        #[doc =
        " Resource proxy resource `usb_dev`. Use method `.lock()` to gain access"]
        pub usb_dev : shared_resources :: usb_dev_that_needs_to_be_locked < 'a
        > ,
        #[doc =
        " Resource proxy resource `usb_class`. Use method `.lock()` to gain access"]
        pub usb_class : shared_resources :: usb_class_that_needs_to_be_locked
        < 'a > ,
    } #[doc = r" Execution context"] #[allow(non_snake_case)]
    #[allow(non_camel_case_types)] pub struct __rtic_internal_usb_rx_Context <
    'a >
    {
        #[doc = r" Shared Resources this task has access to"] pub shared :
        usb_rx :: SharedResources < 'a > ,
    } impl < 'a > __rtic_internal_usb_rx_Context < 'a >
    {
        #[doc(hidden)] #[inline(always)] pub unsafe fn
        new(priority : & 'a rtic :: export :: Priority) -> Self
        {
            __rtic_internal_usb_rx_Context
            { shared : usb_rx :: SharedResources :: new(priority), }
        }
    } #[allow(non_snake_case)] #[doc = " Hardware task"] pub mod usb_rx
    {
        #[doc(inline)] pub use super :: __rtic_internal_usb_rxSharedResources
        as SharedResources; #[doc(inline)] pub use super ::
        __rtic_internal_usb_rx_Context as Context;
    } #[allow(non_snake_case)] #[allow(non_camel_case_types)]
    #[doc = " Shared resources `scan_timer_irq` has access to"] pub struct
    __rtic_internal_scan_timer_irqSharedResources < 'a >
    {
        #[doc = " Lock free resource `matrix`"] pub matrix : & 'a mut
        DemuxMatrix < DynPin, DynPin, 16, 5 > ,
        #[doc = " Lock free resource `debouncer`"] pub debouncer : & 'a mut
        Debouncer < [[bool; 16]; 5] > ,
        #[doc =
        " Resource proxy resource `timer`. Use method `.lock()` to gain access"]
        pub timer : shared_resources :: timer_that_needs_to_be_locked < 'a > ,
        #[doc =
        " Resource proxy resource `alarm`. Use method `.lock()` to gain access"]
        pub alarm : shared_resources :: alarm_that_needs_to_be_locked < 'a > ,
        #[doc = " Lock free resource `watchdog`"] pub watchdog : & 'a mut
        Watchdog,
        #[doc =
        " Resource proxy resource `usb_dev`. Use method `.lock()` to gain access"]
        pub usb_dev : shared_resources :: usb_dev_that_needs_to_be_locked < 'a
        > ,
        #[doc =
        " Resource proxy resource `usb_class`. Use method `.lock()` to gain access"]
        pub usb_class : shared_resources :: usb_class_that_needs_to_be_locked
        < 'a > ,
    } #[doc = r" Execution context"] #[allow(non_snake_case)]
    #[allow(non_camel_case_types)] pub struct
    __rtic_internal_scan_timer_irq_Context < 'a >
    {
        #[doc = r" Shared Resources this task has access to"] pub shared :
        scan_timer_irq :: SharedResources < 'a > ,
    } impl < 'a > __rtic_internal_scan_timer_irq_Context < 'a >
    {
        #[doc(hidden)] #[inline(always)] pub unsafe fn
        new(priority : & 'a rtic :: export :: Priority) -> Self
        {
            __rtic_internal_scan_timer_irq_Context
            { shared : scan_timer_irq :: SharedResources :: new(priority), }
        }
    } #[allow(non_snake_case)] #[doc = " Hardware task"] pub mod
    scan_timer_irq
    {
        #[doc(inline)] pub use super ::
        __rtic_internal_scan_timer_irqSharedResources as SharedResources;
        #[doc(inline)] pub use super :: __rtic_internal_scan_timer_irq_Context
        as Context;
    } #[allow(non_snake_case)] #[allow(non_camel_case_types)]
    #[doc = " Shared resources `handle_event` has access to"] pub struct
    __rtic_internal_handle_eventSharedResources < 'a >
    {
        #[doc =
        " Resource proxy resource `usb_dev`. Use method `.lock()` to gain access"]
        pub usb_dev : shared_resources :: usb_dev_that_needs_to_be_locked < 'a
        > ,
        #[doc =
        " Resource proxy resource `usb_class`. Use method `.lock()` to gain access"]
        pub usb_class : shared_resources :: usb_class_that_needs_to_be_locked
        < 'a > ,
        #[doc =
        " Resource proxy resource `layout`. Use method `.lock()` to gain access"]
        pub layout : shared_resources :: layout_that_needs_to_be_locked < 'a >
        ,
    } #[doc = r" Execution context"] #[allow(non_snake_case)]
    #[allow(non_camel_case_types)] pub struct
    __rtic_internal_handle_event_Context < 'a >
    {
        #[doc = r" Shared Resources this task has access to"] pub shared :
        handle_event :: SharedResources < 'a > ,
    } impl < 'a > __rtic_internal_handle_event_Context < 'a >
    {
        #[doc(hidden)] #[inline(always)] pub unsafe fn
        new(priority : & 'a rtic :: export :: Priority) -> Self
        {
            __rtic_internal_handle_event_Context
            { shared : handle_event :: SharedResources :: new(priority), }
        }
    } #[doc = r" Spawns the task directly"] pub fn
    __rtic_internal_handle_event_spawn(_0 : Option < Event > ,) -> Result <
    (), Option < Event > >
    {
        let input = _0; unsafe
        {
            if let Some(index) = rtic :: export :: interrupt ::
            free(| _ |
            (& mut * __rtic_internal_handle_event_FQ.get_mut()).dequeue())
            {
                (& mut *
                __rtic_internal_handle_event_INPUTS.get_mut()).get_unchecked_mut(usize
                :: from(index)).as_mut_ptr().write(input); rtic :: export ::
                interrupt ::
                free(| _ |
                {
                    (& mut *
                    __rtic_internal_P2_RQ.get_mut()).enqueue_unchecked((P2_T ::
                    handle_event, index));
                }); rtic ::
                pend(rp2040_hal :: pac :: interrupt :: PIO0_IRQ_0); Ok(())
            } else { Err(input) }
        }
    } #[allow(non_snake_case)] #[doc = " Software task"] pub mod handle_event
    {
        #[doc(inline)] pub use super ::
        __rtic_internal_handle_eventSharedResources as SharedResources;
        #[doc(inline)] pub use super :: __rtic_internal_handle_event_Context
        as Context; #[doc(inline)] pub use super ::
        __rtic_internal_handle_event_spawn as spawn;
    } #[doc = r" App module"] #[allow(non_camel_case_types)]
    #[allow(non_upper_case_globals)] #[doc(hidden)]
    #[link_section = ".uninit.rtic0"] static
    __rtic_internal_shared_resource_usb_dev : rtic :: RacyCell < core :: mem
    :: MaybeUninit < UsbDevice >> = rtic :: RacyCell ::
    new(core :: mem :: MaybeUninit :: uninit()); impl < 'a > rtic :: Mutex for
    shared_resources :: usb_dev_that_needs_to_be_locked < 'a >
    {
        type T = UsbDevice; #[inline(always)] fn lock < RTIC_INTERNAL_R >
        (& mut self, f : impl FnOnce(& mut UsbDevice) -> RTIC_INTERNAL_R) ->
        RTIC_INTERNAL_R
        {
            #[doc = r" Priority ceiling"] const CEILING : u8 = 4u8; unsafe
            {
                rtic :: export ::
                lock(__rtic_internal_shared_resource_usb_dev.get_mut() as *
                mut _, self.priority(), CEILING, rp2040_hal :: pac ::
                NVIC_PRIO_BITS, & __rtic_internal_MASKS, f,)
            }
        }
    } #[allow(non_camel_case_types)] #[allow(non_upper_case_globals)]
    #[doc(hidden)] #[link_section = ".uninit.rtic1"] static
    __rtic_internal_shared_resource_usb_class : rtic :: RacyCell < core :: mem
    :: MaybeUninit < UsbClass >> = rtic :: RacyCell ::
    new(core :: mem :: MaybeUninit :: uninit()); impl < 'a > rtic :: Mutex for
    shared_resources :: usb_class_that_needs_to_be_locked < 'a >
    {
        type T = UsbClass; #[inline(always)] fn lock < RTIC_INTERNAL_R >
        (& mut self, f : impl FnOnce(& mut UsbClass) -> RTIC_INTERNAL_R) ->
        RTIC_INTERNAL_R
        {
            #[doc = r" Priority ceiling"] const CEILING : u8 = 4u8; unsafe
            {
                rtic :: export ::
                lock(__rtic_internal_shared_resource_usb_class.get_mut() as *
                mut _, self.priority(), CEILING, rp2040_hal :: pac ::
                NVIC_PRIO_BITS, & __rtic_internal_MASKS, f,)
            }
        }
    } #[allow(non_camel_case_types)] #[allow(non_upper_case_globals)]
    #[doc(hidden)] #[link_section = ".uninit.rtic2"] static
    __rtic_internal_shared_resource_timer : rtic :: RacyCell < core :: mem ::
    MaybeUninit < Timer >> = rtic :: RacyCell ::
    new(core :: mem :: MaybeUninit :: uninit()); impl < 'a > rtic :: Mutex for
    shared_resources :: timer_that_needs_to_be_locked < 'a >
    {
        type T = Timer; #[inline(always)] fn lock < RTIC_INTERNAL_R >
        (& mut self, f : impl FnOnce(& mut Timer) -> RTIC_INTERNAL_R) ->
        RTIC_INTERNAL_R
        {
            #[doc = r" Priority ceiling"] const CEILING : u8 = 1u8; unsafe
            {
                rtic :: export ::
                lock(__rtic_internal_shared_resource_timer.get_mut() as * mut
                _, self.priority(), CEILING, rp2040_hal :: pac ::
                NVIC_PRIO_BITS, & __rtic_internal_MASKS, f,)
            }
        }
    } #[allow(non_camel_case_types)] #[allow(non_upper_case_globals)]
    #[doc(hidden)] #[link_section = ".uninit.rtic3"] static
    __rtic_internal_shared_resource_alarm : rtic :: RacyCell < core :: mem ::
    MaybeUninit < Alarm0 >> = rtic :: RacyCell ::
    new(core :: mem :: MaybeUninit :: uninit()); impl < 'a > rtic :: Mutex for
    shared_resources :: alarm_that_needs_to_be_locked < 'a >
    {
        type T = Alarm0; #[inline(always)] fn lock < RTIC_INTERNAL_R >
        (& mut self, f : impl FnOnce(& mut Alarm0) -> RTIC_INTERNAL_R) ->
        RTIC_INTERNAL_R
        {
            #[doc = r" Priority ceiling"] const CEILING : u8 = 1u8; unsafe
            {
                rtic :: export ::
                lock(__rtic_internal_shared_resource_alarm.get_mut() as * mut
                _, self.priority(), CEILING, rp2040_hal :: pac ::
                NVIC_PRIO_BITS, & __rtic_internal_MASKS, f,)
            }
        }
    } #[allow(non_camel_case_types)] #[allow(non_upper_case_globals)]
    #[doc(hidden)] #[link_section = ".uninit.rtic4"] static
    __rtic_internal_shared_resource_matrix : rtic :: RacyCell < core :: mem ::
    MaybeUninit < DemuxMatrix < DynPin, DynPin, 16, 5 > >> = rtic :: RacyCell
    :: new(core :: mem :: MaybeUninit :: uninit());
    #[allow(non_camel_case_types)] #[allow(non_upper_case_globals)]
    #[doc(hidden)] #[link_section = ".uninit.rtic5"] static
    __rtic_internal_shared_resource_layout : rtic :: RacyCell < core :: mem ::
    MaybeUninit < Layout < 16, 5, 1, kb_layout :: CustomActions > >> = rtic ::
    RacyCell :: new(core :: mem :: MaybeUninit :: uninit()); impl < 'a > rtic
    :: Mutex for shared_resources :: layout_that_needs_to_be_locked < 'a >
    {
        type T = Layout < 16, 5, 1, kb_layout :: CustomActions > ;
        #[inline(always)] fn lock < RTIC_INTERNAL_R >
        (& mut self, f : impl
        FnOnce(& mut Layout < 16, 5, 1, kb_layout :: CustomActions >) ->
        RTIC_INTERNAL_R) -> RTIC_INTERNAL_R
        {
            #[doc = r" Priority ceiling"] const CEILING : u8 = 2u8; unsafe
            {
                rtic :: export ::
                lock(__rtic_internal_shared_resource_layout.get_mut() as * mut
                _, self.priority(), CEILING, rp2040_hal :: pac ::
                NVIC_PRIO_BITS, & __rtic_internal_MASKS, f,)
            }
        }
    } #[allow(non_camel_case_types)] #[allow(non_upper_case_globals)]
    #[doc(hidden)] #[link_section = ".uninit.rtic6"] static
    __rtic_internal_shared_resource_debouncer : rtic :: RacyCell < core :: mem
    :: MaybeUninit < Debouncer < [[bool; 16]; 5] > >> = rtic :: RacyCell ::
    new(core :: mem :: MaybeUninit :: uninit());
    #[allow(non_camel_case_types)] #[allow(non_upper_case_globals)]
    #[doc(hidden)] #[link_section = ".uninit.rtic7"] static
    __rtic_internal_shared_resource_watchdog : rtic :: RacyCell < core :: mem
    :: MaybeUninit < Watchdog >> = rtic :: RacyCell ::
    new(core :: mem :: MaybeUninit :: uninit()); #[doc(hidden)]
    #[allow(non_upper_case_globals)] const __rtic_internal_MASK_CHUNKS : usize
    = rtic :: export ::
    compute_mask_chunks([rp2040_hal :: pac :: Interrupt :: PIO0_IRQ_0 as u32,
    rp2040_hal :: pac :: Interrupt :: USBCTRL_IRQ as u32, rp2040_hal :: pac ::
    Interrupt :: TIMER_IRQ_0 as u32]); #[doc(hidden)]
    #[allow(non_upper_case_globals)] const __rtic_internal_MASKS :
    [rtic :: export :: Mask < __rtic_internal_MASK_CHUNKS > ; 3] =
    [rtic :: export ::
    create_mask([rp2040_hal :: pac :: Interrupt :: TIMER_IRQ_0 as u32]), rtic
    :: export ::
    create_mask([rp2040_hal :: pac :: Interrupt :: PIO0_IRQ_0 as u32]), rtic
    :: export :: create_mask([])]; #[allow(non_snake_case)] #[no_mangle]
    #[doc = " User HW task ISR trampoline for usb_rx"] unsafe fn USBCTRL_IRQ()
    {
        const PRIORITY : u8 = 4u8; rtic :: export ::
        run(PRIORITY, ||
        {
            usb_rx(usb_rx :: Context ::
            new(& rtic :: export :: Priority :: new(PRIORITY)))
        });
    } impl < 'a > __rtic_internal_usb_rxSharedResources < 'a >
    {
        #[doc(hidden)] #[inline(always)] pub unsafe fn
        new(priority : & 'a rtic :: export :: Priority) -> Self
        {
            __rtic_internal_usb_rxSharedResources
            {
                #[doc(hidden)] usb_dev : shared_resources ::
                usb_dev_that_needs_to_be_locked :: new(priority),
                #[doc(hidden)] usb_class : shared_resources ::
                usb_class_that_needs_to_be_locked :: new(priority),
            }
        }
    } #[allow(non_snake_case)] #[no_mangle]
    #[doc = " User HW task ISR trampoline for scan_timer_irq"] unsafe fn
    TIMER_IRQ_0()
    {
        const PRIORITY : u8 = 1u8; rtic :: export ::
        run(PRIORITY, ||
        {
            scan_timer_irq(scan_timer_irq :: Context ::
            new(& rtic :: export :: Priority :: new(PRIORITY)))
        });
    } impl < 'a > __rtic_internal_scan_timer_irqSharedResources < 'a >
    {
        #[doc(hidden)] #[inline(always)] pub unsafe fn
        new(priority : & 'a rtic :: export :: Priority) -> Self
        {
            __rtic_internal_scan_timer_irqSharedResources
            {
                #[doc = " Exclusive access resource `matrix`"] matrix : & mut
                *
                (& mut *
                __rtic_internal_shared_resource_matrix.get_mut()).as_mut_ptr(),
                #[doc = " Exclusive access resource `debouncer`"] debouncer :
                & mut *
                (& mut *
                __rtic_internal_shared_resource_debouncer.get_mut()).as_mut_ptr(),
                #[doc(hidden)] timer : shared_resources ::
                timer_that_needs_to_be_locked :: new(priority), #[doc(hidden)]
                alarm : shared_resources :: alarm_that_needs_to_be_locked ::
                new(priority),
                #[doc = " Exclusive access resource `watchdog`"] watchdog : &
                mut *
                (& mut *
                __rtic_internal_shared_resource_watchdog.get_mut()).as_mut_ptr(),
                #[doc(hidden)] usb_dev : shared_resources ::
                usb_dev_that_needs_to_be_locked :: new(priority),
                #[doc(hidden)] usb_class : shared_resources ::
                usb_class_that_needs_to_be_locked :: new(priority),
            }
        }
    } #[allow(non_camel_case_types)] #[allow(non_upper_case_globals)]
    #[doc(hidden)] static __rtic_internal_handle_event_FQ : rtic :: RacyCell <
    rtic :: export :: SCFQ < 9 > > = rtic :: RacyCell ::
    new(rtic :: export :: Queue :: new()); #[link_section = ".uninit.rtic8"]
    #[allow(non_camel_case_types)] #[allow(non_upper_case_globals)]
    #[doc(hidden)] static __rtic_internal_handle_event_INPUTS : rtic ::
    RacyCell < [core :: mem :: MaybeUninit < Option < Event > > ; 8] > = rtic
    :: RacyCell ::
    new([core :: mem :: MaybeUninit :: uninit(), core :: mem :: MaybeUninit ::
    uninit(), core :: mem :: MaybeUninit :: uninit(), core :: mem ::
    MaybeUninit :: uninit(), core :: mem :: MaybeUninit :: uninit(), core ::
    mem :: MaybeUninit :: uninit(), core :: mem :: MaybeUninit :: uninit(),
    core :: mem :: MaybeUninit :: uninit(),]); impl < 'a >
    __rtic_internal_handle_eventSharedResources < 'a >
    {
        #[doc(hidden)] #[inline(always)] pub unsafe fn
        new(priority : & 'a rtic :: export :: Priority) -> Self
        {
            __rtic_internal_handle_eventSharedResources
            {
                #[doc(hidden)] usb_dev : shared_resources ::
                usb_dev_that_needs_to_be_locked :: new(priority),
                #[doc(hidden)] usb_class : shared_resources ::
                usb_class_that_needs_to_be_locked :: new(priority),
                #[doc(hidden)] layout : shared_resources ::
                layout_that_needs_to_be_locked :: new(priority),
            }
        }
    } #[allow(non_snake_case)] #[allow(non_camel_case_types)]
    #[derive(Clone, Copy)] #[doc(hidden)] pub enum P2_T { handle_event, }
    #[doc(hidden)] #[allow(non_camel_case_types)]
    #[allow(non_upper_case_globals)] static __rtic_internal_P2_RQ : rtic ::
    RacyCell < rtic :: export :: SCRQ < P2_T, 9 > > = rtic :: RacyCell ::
    new(rtic :: export :: Queue :: new()); #[allow(non_snake_case)]
    #[doc = "Interrupt handler to dispatch tasks at priority 2"] #[no_mangle]
    unsafe fn PIO0_IRQ_0()
    {
        #[doc = r" The priority of this interrupt handler"] const PRIORITY :
        u8 = 2u8; rtic :: export ::
        run(PRIORITY, ||
        {
            while let Some((task, index)) =
            (& mut * __rtic_internal_P2_RQ.get_mut()).split().1.dequeue()
            {
                match task
                {
                    P2_T :: handle_event =>
                    {
                        let _0 =
                        (& *
                        __rtic_internal_handle_event_INPUTS.get()).get_unchecked(usize
                        :: from(index)).as_ptr().read();
                        (& mut *
                        __rtic_internal_handle_event_FQ.get_mut()).split().0.enqueue_unchecked(index);
                        let priority = & rtic :: export :: Priority ::
                        new(PRIORITY);
                        handle_event(handle_event :: Context :: new(priority), _0)
                    }
                }
            }
        });
    } #[doc(hidden)] mod rtic_ext
    {
        use super :: * ; #[no_mangle] unsafe extern "C" fn main() -> !
        {
            rtic :: export :: assert_send :: < UsbDevice > (); rtic :: export
            :: assert_send :: < UsbClass > (); rtic :: export :: assert_send
            :: < Timer > (); rtic :: export :: assert_send :: < Alarm0 > ();
            rtic :: export :: assert_send :: < DemuxMatrix < DynPin, DynPin,
            16, 5 > > (); rtic :: export :: assert_send :: < Layout < 16, 5,
            1, kb_layout :: CustomActions > > (); rtic :: export ::
            assert_send :: < Debouncer < [[bool; 16]; 5] > > (); rtic ::
            export :: assert_send :: < Watchdog > (); rtic :: export ::
            assert_send :: < Option < Event > > (); const _CONST_CHECK : () =
            {
                if ! rtic :: export :: have_basepri()
                {
                    if (rp2040_hal :: pac :: Interrupt :: USBCTRL_IRQ as usize)
                    >= (__rtic_internal_MASK_CHUNKS * 32)
                    {
                        :: core :: panic!
                        ("An interrupt out of range is used while in armv6 or armv8m.base");
                    } if
                    (rp2040_hal :: pac :: Interrupt :: TIMER_IRQ_0 as usize) >=
                    (__rtic_internal_MASK_CHUNKS * 32)
                    {
                        :: core :: panic!
                        ("An interrupt out of range is used while in armv6 or armv8m.base");
                    }
                } else {}
            }; let _ = _CONST_CHECK; rtic :: export :: interrupt :: disable();
            (0 ..
            8u8).for_each(| i |
            (& mut *
            __rtic_internal_handle_event_FQ.get_mut()).enqueue_unchecked(i));
            let mut core : rtic :: export :: Peripherals = rtic :: export ::
            Peripherals :: steal().into(); let _ =
            you_must_enable_the_rt_feature_for_the_pac_in_your_cargo_toml ::
            interrupt :: PIO0_IRQ_0; let _ =
            you_must_enable_the_rt_feature_for_the_pac_in_your_cargo_toml ::
            interrupt :: PIO0_IRQ_1; let _ =
            you_must_enable_the_rt_feature_for_the_pac_in_your_cargo_toml ::
            interrupt :: PIO1_IRQ_0; const _ : () = if
            (1 << rp2040_hal :: pac :: NVIC_PRIO_BITS) < 2u8 as usize
            {
                :: core :: panic!
                ("Maximum priority used by interrupt vector 'PIO0_IRQ_0' is more than supported by hardware");
            };
            core.NVIC.set_priority(you_must_enable_the_rt_feature_for_the_pac_in_your_cargo_toml
            :: interrupt :: PIO0_IRQ_0, rtic :: export ::
            logical2hw(2u8, rp2040_hal :: pac :: NVIC_PRIO_BITS),); rtic ::
            export :: NVIC ::
            unmask(you_must_enable_the_rt_feature_for_the_pac_in_your_cargo_toml
            :: interrupt :: PIO0_IRQ_0); const _ : () = if
            (1 << rp2040_hal :: pac :: NVIC_PRIO_BITS) < 4u8 as usize
            {
                :: core :: panic!
                ("Maximum priority used by interrupt vector 'USBCTRL_IRQ' is more than supported by hardware");
            };
            core.NVIC.set_priority(you_must_enable_the_rt_feature_for_the_pac_in_your_cargo_toml
            :: interrupt :: USBCTRL_IRQ, rtic :: export ::
            logical2hw(4u8, rp2040_hal :: pac :: NVIC_PRIO_BITS),); rtic ::
            export :: NVIC ::
            unmask(you_must_enable_the_rt_feature_for_the_pac_in_your_cargo_toml
            :: interrupt :: USBCTRL_IRQ); const _ : () = if
            (1 << rp2040_hal :: pac :: NVIC_PRIO_BITS) < 1u8 as usize
            {
                :: core :: panic!
                ("Maximum priority used by interrupt vector 'TIMER_IRQ_0' is more than supported by hardware");
            };
            core.NVIC.set_priority(you_must_enable_the_rt_feature_for_the_pac_in_your_cargo_toml
            :: interrupt :: TIMER_IRQ_0, rtic :: export ::
            logical2hw(1u8, rp2040_hal :: pac :: NVIC_PRIO_BITS),); rtic ::
            export :: NVIC ::
            unmask(you_must_enable_the_rt_feature_for_the_pac_in_your_cargo_toml
            :: interrupt :: TIMER_IRQ_0); #[inline(never)] fn
            __rtic_init_resources < F > (f : F) where F : FnOnce() { f(); }
            __rtic_init_resources(||
            {
                let (shared_resources, local_resources, mut monotonics) =
                init(init :: Context :: new(core.into()));
                __rtic_internal_shared_resource_usb_dev.get_mut().write(core
                :: mem :: MaybeUninit :: new(shared_resources.usb_dev));
                __rtic_internal_shared_resource_usb_class.get_mut().write(core
                :: mem :: MaybeUninit :: new(shared_resources.usb_class));
                __rtic_internal_shared_resource_timer.get_mut().write(core ::
                mem :: MaybeUninit :: new(shared_resources.timer));
                __rtic_internal_shared_resource_alarm.get_mut().write(core ::
                mem :: MaybeUninit :: new(shared_resources.alarm));
                __rtic_internal_shared_resource_matrix.get_mut().write(core ::
                mem :: MaybeUninit :: new(shared_resources.matrix));
                __rtic_internal_shared_resource_layout.get_mut().write(core ::
                mem :: MaybeUninit :: new(shared_resources.layout));
                __rtic_internal_shared_resource_debouncer.get_mut().write(core
                :: mem :: MaybeUninit :: new(shared_resources.debouncer));
                __rtic_internal_shared_resource_watchdog.get_mut().write(core
                :: mem :: MaybeUninit :: new(shared_resources.watchdog)); rtic
                :: export :: interrupt :: enable();
            }); loop { rtic :: export :: nop() }
        }
    }
}