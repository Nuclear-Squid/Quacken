# Firmware

## Keyberon

This directory contains our Keyberon driver. It’s been tested with a SparkFun
Pro Micro RP2040 and should be easy to adapt to other controllers.

To flash your keyboard, get in UF2 bootloader mode and do:

```rust
cargo run
```

If `elf2uf2-rs` does not work “as is” (see [this issue][1]), you can install a
patched version with:

```bash
cargo install --git https://github.com/StripedMonkey/elf2uf2-rs.git#c1638b9
```

Note: if you soldered your microcontroller face down, uncomment the
`matrix.upside_down();` line in `main.rs`.

## ZMK

[There is a ZMK Configuration on a dedicated repo][2].
It will be moved here when [this PR][3] gets merged.

[1]: https://github.com/JoNil/elf2uf2-rs/pull/41
[2]: https://github.com/Nuclear-Squid/zmk-keyboard-quacken
[3]: https://github.com/zmkfirmware/zmk/pull/2975
