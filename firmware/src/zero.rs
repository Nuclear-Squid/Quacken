/**
The Quacken Zero physical matrix misses Keyberon's expectations on 2 points:
 - it doesn't match the logical layout
 - it is set col2row with pull-down inputs

Besides, the ProMicro GPIO pinout used by Ergogen and ZMK rely on the ProMicro Atmel IDs
-- but rb2040_hal, obviously, does not. So we need a Matrix factory for every ProMicro controller.

    .   +----USB----+               +----USB----+            D+ +----USB----+ D-
    . 1 |           | RAW         0 |           | RAW         1 |           | RAW
    . 0 |           | GND         1 |           | GND         0 |           | GND
    GND | SparkFun  | RST       GND | SparkFun  | RST       GND | Adafruit  | RST
    GND |   Atmel   | VCC       GND |  rp2040   | VCC       GND |  kb2040   | VCC
    . 2 |           | 21          2 |           | 29          2 |           | 29
    . 3 |           | 20          3 |           | 28          3 |           | 28
    . 4 |           | 19          4 |           | 27          4 |           | 27
    . 5 |           | 18          5 |           | 26          5 |           | 26
    . 6 |           | 15          6 |           | 22          6 |           | 18
    . 7 |           | 14          7 |           | 20          7 |           | 20
    . 8 |           | 16          8 |           | 23          8 |           | 19
    . 9 |___________| 10          9 |___________| 21          9 |___________| 10
**/
// The logical layout is a 12×4 matrix: 3×6 + 3 thumb keys for each hand.
// Ergogen has generated an 8*6 matrix rather than a 12×4 one, in order to save two pins:
// the two halves are stacked onto one anather. So here’s q quick helper to work around that.
use crate::layout;
const MATRIX_COLS: usize = 6;
const MATRIX_ROWS: usize = 8;

// this could be done with keyberon's debouncer (`transform` function)
fn matrix_to_layout(row: usize, col: usize) -> (usize, usize) {
    if row >= layout::ROWS {
        (row - layout::ROWS, layout::COLS - col - 1)
    } else {
        (row, col)
    }
}

// Keyberon expects rows to bo outputs, and columns to be pull-up inputs. ("row2col" on ZMK)
// On the Quacken Zero, rows are pull-down inputs and columns are outputs. ("col2row" on ZMK)
// So here's a `Col2RowMatrix` type to implement this.

// rp2040 implementations of the embedded_hal::digital::InputPin,OutputPin} traits
use embedded_hal::digital::{InputPin, OutputPin};
use rp2040_hal::gpio;
type KbInputPin = gpio::Pin<gpio::DynPinId, gpio::FunctionSioInput, gpio::PullDown>;
type KbOutputPin = gpio::Pin<gpio::DynPinId, gpio::FunctionSioOutput, gpio::PullDown>;

pub type QuackenZeroMatrix = Col2RowMatrix<KbOutputPin, KbInputPin>;

use core::convert::Infallible;

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

    /// Creates a new Generic ProMicro matrix.
    pub fn new_promicro(pins: gpio::Pins) -> Result<QuackenZeroMatrix, Infallible> {
        QuackenZeroMatrix::new(
            [
                pins.gpio8.into_push_pull_output().into_dyn_pin(),
                pins.gpio7.into_push_pull_output().into_dyn_pin(),
                pins.gpio6.into_push_pull_output().into_dyn_pin(),
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

    /// Creates a new SparkFun ProMicro RP2040 matrix.
    pub fn new_sparkfun_rp2040(pins: gpio::Pins) -> Result<QuackenZeroMatrix, Infallible> {
        QuackenZeroMatrix::new(
            [
                pins.gpio8.into_push_pull_output().into_dyn_pin(),
                pins.gpio7.into_push_pull_output().into_dyn_pin(),
                pins.gpio6.into_push_pull_output().into_dyn_pin(),
                pins.gpio23.into_push_pull_output().into_dyn_pin(), // promicro 16
                pins.gpio20.into_push_pull_output().into_dyn_pin(), // promicro 14
                pins.gpio22.into_push_pull_output().into_dyn_pin(), // promicro 15
            ],
            [
                pins.gpio3.into_pull_down_input().into_dyn_pin(),
                pins.gpio4.into_pull_down_input().into_dyn_pin(),
                pins.gpio5.into_pull_down_input().into_dyn_pin(),
                pins.gpio9.into_pull_down_input().into_dyn_pin(),
                pins.gpio28.into_pull_down_input().into_dyn_pin(), // promicro 20
                pins.gpio27.into_pull_down_input().into_dyn_pin(), // promicro 19
                pins.gpio26.into_pull_down_input().into_dyn_pin(), // promicro 18
                pins.gpio21.into_pull_down_input().into_dyn_pin(), // promicro 10
            ],
        )
    }

    // To use after creating the QuackenZeroMatrix if the microcontroller was soldered face down.
    // Cols and rows order is modified like this:
    // [c0, c1, c2, c3, c4, c5]           --> [c3, c4, c5, c0, c1, c2]
    // [r0, r1, r2, r3, r4, r5, r6, r7]   --> [r4, r5, r6, r7, r0, r1, r2, r3]
    pub fn upside_down(&mut self) {
        self.cols.rotate_left(MATRIX_COLS / 2);
        self.rows.rotate_left(MATRIX_ROWS / 2);
    }

    /// Scans the matrix and checks which keys are pressed.
    ///
    /// Every column pin in order is pulled high, and then each row pin is tested:
    /// if it's high, the key is marked as pressed.
    ///
    /// Delay function allows pause to let input pins settle.
    pub fn get_with_delay<F: FnMut(), E>(
        &mut self,
        mut delay: F,
    ) -> Result<[[bool; layout::COLS]; layout::ROWS], E>
    where
        C: OutputPin<Error = E>,
        R: InputPin<Error = E>,
    {
        let mut keys = [[false; layout::COLS]; layout::ROWS];

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
    pub fn get<E>(&mut self) -> Result<[[bool; layout::COLS]; layout::ROWS], E>
    where
        C: OutputPin<Error = E>,
        R: InputPin<Error = E>,
    {
        self.get_with_delay(|| ())
    }
}
