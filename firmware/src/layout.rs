const LAYER_COUNT: usize = 6;

pub const COLS: usize = 12;
pub const ROWS: usize = 4;

use keyberon::layout;
use keyberon::action::{m, Action};
use keyberon::key_code::KeyCode::*;

pub type QuackenLayout = layout::Layout<COLS, ROWS, LAYER_COUNT, ()>;

const BCK: Action<()> = Action::KeyCode(MediaBack);
const FWD: Action<()> = Action::KeyCode(MediaForward);

const CMD:   keyberon::key_code::KeyCode = LCtrl; // LGui for macOS
const UNDO:  Action<()> = m(&[CMD, Z].as_slice());
const CUT:   Action<()> = m(&[CMD, X].as_slice());
const COPY:  Action<()> = m(&[CMD, C].as_slice());
const PASTE: Action<()> = m(&[CMD, V].as_slice());
const ALL:   Action<()> = m(&[CMD, A].as_slice());
const SAVE:  Action<()> = m(&[CMD, S].as_slice());
const CLOSE: Action<()> = m(&[CMD, W].as_slice());
const STAB:  Action<()> = m(&[RShift, Tab].as_slice());
// const CLOSE: Action<()> = m(&[LCtrl, T].as_slice()); // Ergol-specific
// const COPY:  Action<()> = m(&[LCtrl, W].as_slice()); // Ergol-specific

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
        [ t        Tab  Home  Up   End  PgUp      n    7    8    9    n         t ],
        [ t    CapsLock Left Down Right PgDown    n    4    5    6    0         t ],
        [ t    {UNDO}{CUT}{COPY}{PASTE}{STAB}     n    1    2    3    n         t ],
        [ n n n               t  Space (4)        t    t    t               n n n ],
    }
    { // NumRow
        [ t         !    @    #    $    %         ^    &    *   '('  ')'        t ],
        [ t         1    2    3    4    5         6    7    8    9    0         t ],
        [ t    {UNDO}{CUT}{COPY}{PASTE} n         n    n    n    n    n         t ],
        [ n n n               t    t    t         t    t    t               n n n ],
    }
    { // VimNav
        [ t CapsLock {CLOSE}{BCK}{FWD}  n      Home PgDown PgUp  End  n         t ],
        [ t     {ALL}{SAVE}{STAB} Tab   n      Left  Down   Up  Right n         t ],
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
