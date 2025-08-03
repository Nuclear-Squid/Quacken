// Dummy layout that represents the electrical grid,
// not the physical layout of the keys
#[rustfmt::skip]
pub static LAYERS: keyberon::layout::Layers<12, 4, 1, ()> = keyberon::layout::layout! {
    {
        [  Q  Q  W  E  R  T  Y  U  I  O  P  P  ],
        [  A  A  S  D  F  G  H  J  K  L  ;  ;  ],
        [  Z  Z  X  C  V  B  N  M  ,  .  /  /  ],
        [  Q  Q  W  E  R  T  Y  U  I  O  P  P  ],
    }
};
