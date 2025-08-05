// Keyberon: columns are pull-up inputs, rows are outputs.       ("row2col" on ZMK)
// Quacken Zero: rows are pull-down inputs, columns are outputs. ("col2row" on ZMK)
// So let's define our own matrix to work around this.

const MATRIX_COLS: usize = 6;
const MATRIX_ROWS: usize = 8;

const LAYOUT_COLS: usize = 12;
const LAYOUT_ROWS: usize = 4;

// this could be done with keyberon's debouncer (`transform` function)
fn matrix_to_layout(row: usize, col: usize) -> (usize, usize) {
    if row >= LAYOUT_ROWS {
        (row - LAYOUT_ROWS, LAYOUT_COLS - col - 1)
    } else {
        (row, col)
    }
}

// Import the InputPin and OutputPin traits
use embedded_hal::digital::{InputPin, OutputPin};

// rp2040 implementations of the embedded_hal::digital::InputPin,OutputPin} traits
use rp2040_hal::gpio;
type KbInputPin  = gpio::Pin<gpio::DynPinId, gpio::FunctionSioInput,  gpio::PullDown>;
type KbOutputPin = gpio::Pin<gpio::DynPinId, gpio::FunctionSioOutput, gpio::PullDown>;

pub type QuackenZeroMatrix = Col2RowMatrix<KbOutputPin, KbInputPin>;

use core::convert::Infallible;

// Expose a keyberon::Matrix-compatible type
pub struct Col2RowMatrix<C, R>
where
    C: OutputPin,
    R: InputPin,
{
    cols: [C; MATRIX_COLS],
    rows: [R; MATRIX_ROWS],
}

impl<C, R> Col2RowMatrix<C, R>
where
    C: OutputPin,
    R: InputPin,
{
    /// Creates a new Matrix.
    ///
    /// Assumes rows are pull-down inputs, and columns are output pins
    /// which are set low when not being scanned.
    pub fn new<E>(cols: [C; MATRIX_COLS], rows: [R; MATRIX_ROWS]) -> Result<Self, E>
    where
        C: OutputPin<Error = E>,
        R: InputPin<Error = E>,
    {
        let mut res = Self { cols, rows };
        res.clear()?;
        Ok(res)
    }

    /// Clears the matrix.
    fn clear<E>(&mut self) -> Result<(), E>
    where
        C: OutputPin<Error = E>,
        R: InputPin<Error = E>,
    {
        for c in self.cols.iter_mut() {
            c.set_low()?;
        }
        Ok(())
    }

    /// Creates a new SparkFun Fromicro matrix.
    pub fn new_sparkfun_promicro(pins: gpio::Pins) -> Result<QuackenZeroMatrix, Infallible> {
        QuackenZeroMatrix::new(
            [
                pins.gpio6.into_push_pull_output().into_dyn_pin(),
                pins.gpio7.into_push_pull_output().into_dyn_pin(),
                pins.gpio8.into_push_pull_output().into_dyn_pin(),
                pins.gpio16.into_push_pull_output().into_dyn_pin(),
                pins.gpio14.into_push_pull_output().into_dyn_pin(),
                pins.gpio15.into_push_pull_output().into_dyn_pin(),
            ],
            [
                pins.gpio3.into_pull_down_input().into_dyn_pin(),
                pins.gpio4.into_pull_down_input().into_dyn_pin(),
                pins.gpio5.into_pull_down_input().into_dyn_pin(),
                pins.gpio9.into_pull_down_input().into_dyn_pin(),
                pins.gpio20.into_pull_down_input().into_dyn_pin(),
                pins.gpio19.into_pull_down_input().into_dyn_pin(),
                pins.gpio18.into_pull_down_input().into_dyn_pin(),
                pins.gpio10.into_pull_down_input().into_dyn_pin(),
            ],
        )
    }

    /// Scans the matrix and checks which keys are pressed.
    ///
    /// Every column pin in order is pulled high, and then each row pin is tested:
    /// if it's high, the key is marked as pressed.
    ///
    /// Delay function allows pause to let input pins settle.
    pub fn get_with_delay<F: FnMut(), E>(&mut self, mut delay: F)
        -> Result<[[bool; LAYOUT_COLS]; LAYOUT_ROWS], E>
    where
        C: OutputPin<Error = E>,
        R: InputPin<Error = E>,
    {
        let mut keys = [[false; LAYOUT_COLS]; LAYOUT_ROWS];

        for (ci, col) in self.cols.iter_mut().enumerate() {
            col.set_high()?;
            delay();
            for (ri, row) in self.rows.iter_mut().enumerate() {
                if row.is_high()? {
                    let (layout_row, layout_col) = matrix_to_layout(ri, ci);
                    keys[layout_row][layout_col] = true;
                }
            }
            col.set_low()?;
        }
        Ok(keys)
    }

    /// Scans the matrix and checks which keys are pressed.
    ///
    /// Every column pin in order is pulled high, and then each row pin is tested:
    /// if it's high, the key is marked as pressed.
    pub fn get<E>(&mut self) -> Result<[[bool; LAYOUT_COLS]; LAYOUT_ROWS], E>
    where
        C: OutputPin<Error = E>,
        R: InputPin<Error = E>,
    {
        self.get_with_delay(|| ())
    }
}
