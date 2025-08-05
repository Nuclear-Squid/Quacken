const LAYER_COUNT: usize = 1;

pub const COLS: usize = 12;
pub const ROWS: usize = 4;

use keyberon::layout;

pub type QuackenLayout = layout::Layout<COLS, ROWS, LAYER_COUNT, ()>;

#[rustfmt::skip]
pub static LAYERS: layout::Layers<COLS, ROWS, LAYER_COUNT, ()> = layout::layout! {
    {
        [  Q  Q  W  E  R  T  Y  U  I  O  P  P  ],
        [  A  A  S  D  F  G  H  J  K  L  ;  ;  ],
        [  Z  Z  X  C  V  B  N  M  ,  .  /  /  ],
        [  Q  Q  W  E  R  T  Y  U  I  O  P  P  ],
    }
};
