const LAYER_COUNT: usize = 6; // adjust to the number of layers defined below

pub const COLS: usize = 12;
pub const ROWS: usize = 4;

use keyberon::action::{Action, m};
use keyberon::key_code::KeyCode;
use keyberon::layout;

pub type QuackenLayout = layout::Layout<COLS, ROWS, LAYER_COUNT, ()>;

// common shortcuts -- adapt to your OS layout if necessary, e.g. for Ergol:
// const CLOSE: Action<()> = m(&[KeyCode::LCtrl, KeyCode::T].as_slice());
// const COPY:  Action<()> = m(&[KeyCode::LCtrl, KeyCode::W].as_slice());
const CMD: KeyCode = KeyCode::LCtrl; // LGui for macOS
const UNDO: Action<()> = m(&[CMD, KeyCode::Z].as_slice());
const CUT: Action<()> = m(&[CMD, KeyCode::X].as_slice());
const COPY: Action<()> = m(&[CMD, KeyCode::C].as_slice());
const PASTE: Action<()> = m(&[CMD, KeyCode::V].as_slice());
const ALL: Action<()> = m(&[CMD, KeyCode::A].as_slice());
const SAVE: Action<()> = m(&[CMD, KeyCode::S].as_slice());
const CLOSE: Action<()> = m(&[CMD, KeyCode::W].as_slice());

// other shortcuts
const STB: Action<()> = m(&[KeyCode::RShift, KeyCode::Tab].as_slice());
const BCK: Action<()> = Action::KeyCode(KeyCode::MediaBack);
const FWD: Action<()> = Action::KeyCode(KeyCode::MediaForward);

#[rustfmt::skip]
pub static LAYERS: layout::Layers<COLS, ROWS, LAYER_COUNT, ()> = layout::layout! {

    { // base layer -- don't worry about lhe key names, this will reflect your OS keyboard layout
        [ Tab       Q    W    E    R    T         Y    U    I    O    P    BSpace ],
        [ Escape    A    S    D    F    G         H    J    K    L    ;     Enter ],
        [ LShift    Z    X    C    V    B         N    M    ,    .    /    RShift ],
        [ n n n             LAlt LCtrl LGui      (1) Space RAlt             n n n ],
    }

    // Navigation, Numbers, Cmd-ZXCV:
    //  - either pick the `NumNav` layer -- simple, gets the job done
    //  - or the `NumRow` + `VimNav` layers -- less intuitive but sharper

    { // NumNav
        [ t        Tab  Home  Up   End  PgUp      n    7    8    9    n    Delete ],
        [ t    CapsLock Left Down Right PgDown    n    4    5    6    0         t ],
        [ t    {UNDO}{CUT}{COPY}{PASTE}{STB}      n    1    2    3    n         t ],
        [ n n n               t  Space (4)        t    t    t               n n n ],
    }
    { // NumRow
        [ t         !    @    #    $    %         ^    &    *   '('  ')'        t ],
        [ t         1    2    3    4    5         6    7    8    9    0         t ],
        [ t    {UNDO}{CUT}{COPY}{PASTE} n         n    n    n    n    n         t ],
        [ n n n               t    t    t         t    t    t               n n n ],
    }
    { // VimNav
        [ t CapsLock {CLOSE}{BCK}{FWD}  n      Home PgDown PgUp  End  n    Delete ],
        [ t     {ALL}{SAVE}{STB}  Tab   n      Left  Down   Up  Right n         t ],
        [ t    {UNDO}{CUT}{COPY}{PASTE} n         n    n    n    n    n         t ],
        [ n n n               t    t    t         t    t    t               n n n ],
    }

    // Function Keys

    {
        [ t        F1   F2   F3   F4    n         n Pause PScreen ScrollLock n  t  ],
        [ t        F5   F6   F7   F8    n         n  LAlt RCtrl RGui RShift     t  ],
        [ t        F9   F10  F11  F12   n         n    n    n    n    n         t  ],
        [ n n n               t    t    t         t    t    t               n n n  ],
    }

    // Symbols: use this rather than `RAlt` if your keyboard layout has no AltGr key
    // (or if you prefer sending the proper key code, e.g. for keyboard shortcuts).
    // On a non-QWERTY layout, you'll have to make a few adjustments.

    { // QWERTY
        [ t         ^    <    >    $    %         @    &    *  '\''  '`'        t ],
        [ t        '{'  '('  ')'  '}'   =       '\\'   +    -    /   '"'        t ],
        [ t         ~   '['  ']'  '_'   #         |    !    ;    :    ?         t ],
        [ n n n              (2) Space  t         t    t    t               n n n ],
    }

};
