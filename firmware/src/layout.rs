use keyberon::action::{k, m, Action::*, HoldTapAction, HoldTapConfig};
use keyberon::key_code::KeyCode::*;

// Shift + KeyCode
#[allow(unused_macros)]
macro_rules! s {
    ($k:ident) => {
        m(&[LShift, $k])
    };
}

#[derive(Debug, Clone, Copy, Eq, PartialEq)]
pub enum CustomActions {
}

// #[rustfmt::skip]
// pub static LAYERS: keyberon::layout::Layers<12, 4, 1, CustomActions> = [
    // /* QWERTY */
    // [
        // [k(Tab),    k(Q),   k(W),   k(E),   k(R),   k(T),     k(Y),   k(U),   k(I),     k(O),     k(P),      k(BSpace), ],
        // [k(Escape), k(A),   k(S),   k(D),   k(F),   k(G),     k(H),   k(J),   k(K),     k(L),     k(SColon), k(Enter),  ],
        // [k(LShift), k(Z),   k(X),   k(C),   k(V),   k(B),     k(N),   k(M),   k(Comma), k(Dot),   k(Slash),  k(LShift), ],
        // [k(No),     k(No),  k(No), k(LCtrl), k(LGui), k(LAlt), k(Space), k(RAlt),  k(RCtrl), k(No),  k(No),   k(No),   ],
    // ]
// ];

#[rustfmt::skip]
pub static LAYERS: keyberon::layout::Layers<8, 6, 1, ()> = keyberon::layout::layout! {
    { //[···+··· ···+··· ···+··· ···+··· ···+···|···+··· ···+··· ···+··· ···+··· ···+···],
        [  A  A  A  A  A  A  A  A  ],
        [  A  A  A  A  A  A  A  A  ],
        [  A  A  A  A  A  A  A  A  ],
        [  A  A  A  A  A  A  A  A  ],
        [  A  A  A  A  A  A  A  A  ],
        [  A  A  A  A  A  A  A  A  ],
    }
};
