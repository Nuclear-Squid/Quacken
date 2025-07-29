use core::convert::TryInto;
use embedded_hal::digital::v2::{InputPin, OutputPin, PinState};

pub struct DemuxMatrix<C, R, const CS: usize, const RS: usize>
where
    C: OutputPin,
    R: InputPin,
{
    cols: [C; 4],
    rows: [R; RS],
    true_cols: usize,
}

impl<C: OutputPin, R: InputPin, const CS: usize, const RS: usize> DemuxMatrix<C, R, CS, RS>
where
    C: OutputPin,
    R: InputPin,
{
    pub fn new<E>(
        cols: [C; 4],
        rows: [R; RS],
        true_cols: usize,
    ) -> Result<Self, E>
    where
        C: OutputPin<Error = E>,
        R: InputPin<Error = E>,
    {
        let mut res = Self {
            cols,
            rows,
            true_cols,
        };
        res.clear()?;
        Ok(res)
    }
    pub fn clear<E>(&mut self) -> Result<(), E>
    where
        C: OutputPin<Error = E>,
        R: InputPin<Error = E>,
    {
        for c in self.cols.iter_mut() {
            c.set_low()?;
        }
        Ok(())
    }
    fn select_column<E>(&mut self, col: usize)
    where
        C: OutputPin<Error = E>,
        R: InputPin<Error = E>,
    {
        for bit in 0..self.cols.len() {
            let state: u8 = ((col & (0b1 << bit)) >> bit).try_into().unwrap();
            if state == 0 {
                self.cols[bit].set_state(PinState::Low);
            } else if state == 1 {
                self.cols[bit].set_state(PinState::High);
            }
        }
    }
    pub fn get<E>(&mut self) -> Result<[[bool; CS]; RS], E>
    where
        C: OutputPin<Error = E>,
        R: InputPin<Error = E>,
    {
        let mut keys = [[false; CS]; RS];

        for current_col in 0..self.true_cols {
            self.select_column(current_col);
            cortex_m::asm::delay(5000);
            for (ri, row) in (&mut self.rows).iter_mut().enumerate() {
                keys[ri][current_col] = row.is_low()?;
            }
        }
        Ok(keys)
    }
}
