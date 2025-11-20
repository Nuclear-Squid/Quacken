// Kailh Choc PG1350
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    hotswap: default is false
//      if true, will include holes and pads for Kailh choc hotswap sockets
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible
//    keycaps: default is false
//      if true, will add choc sized keycap box around the footprint
//
// note: hotswap and reverse can be used simultaneously

module.exports = {
  params: {
    designator: 'S',
    hotswap: false,
    reverse: false,
    keycaps: false,
    hummingbird: false,
    from: undefined,
    to: undefined
  },
  body: p => {
    const [arrow_up, arrow_down] = p.r > 0 ? ['↓', '↑'] : ['↑', '↓'];

    const keycap_outline = p.keycaps ? `` : '';

    const base_switch_outline = `
      (fp_line (start -7 -7) (end -7 7)  (layer "F.SilkS") (width 0.15))
      (fp_line (start -7 7)  (end 7 7)   (layer "F.SilkS") (width 0.15))
      (fp_line (start 7 7)   (end 7 -7)  (layer "F.SilkS") (width 0.15))
      (fp_line (start 7 -7)  (end -7 -7) (layer "F.SilkS") (width 0.15))
    `;

    const hummingbird_switch_outline = p.hummingbird ? `
      (fp_line (start -6.5 -14) (end 6.5 -14) (layer "F.SilkS") (stroke (width 0.15) (type dot)))
      (fp_line (start -6.5 -4)  (end 6.5 -4)  (layer "F.SilkS") (stroke (width 0.15) (type dot)))
      (fp_line (start -6.5 -14) (end -6.5 -4) (layer "F.SilkS") (stroke (width 0.15) (type dot)))
      (fp_line (start 6.5 -4)   (end 6.5 -14) (layer "F.SilkS") (stroke (width 0.15) (type dot)))
      (fp_text user "${arrow_down} standard ${arrow_down}" (at 0 -2.95 ${p.r}) (effects (font (size 0.8 0.8))))
      (fp_text user "${arrow_up} hummingbird ${arrow_up}" (at 0 -9.4 ${p.r}) (effects (font (size 0.8 0.8))))
    ` : '';

    const outline = keycap_outline + base_switch_outline + hummingbird_switch_outline;

    const standard = `
      (module PG1350 (layer F.Cu) (tedit 5DD50112)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${outline}

      ${''/* middle shaft (base) */}
      (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))

      ${''/* stabilizers (base) */}
      (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
    `;

    const hummingbird_footprint = `
      ${''/* middle shaft (hummingbird) */}
      (pad "" np_thru_hole circle (at 0 -11.8) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))

      ${''/* stabilizers (hummingbird) */}
      (pad "" np_thru_hole circle (at 5.5 -11.8) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at -5.5 -11.8) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
    `;

    const keycap = `
      ${'' /* keycap marks */}
      (fp_line (start -9 -8.5) (end 9 -8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9 -8.5) (end 9 8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9 8.5) (end -9 8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start -9 8.5) (end -9 -8.5) (layer Dwgs.User) (width 0.15))
      `
    function pins(def_neg, def_pos, def_side) {
      if(p.hotswap) {
        return `
          ${'' /* holes */}
          (pad "" np_thru_hole circle (at ${def_pos}5 -3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
          (pad "" np_thru_hole circle (at 0 -5.95) (size 3 3) (drill 3) (layers *.Cu *.Mask))

          ${'' /* net pads */}
          (pad 1 smd rect (at ${def_neg}3.275 -5.95 ${p.r}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.from})
          (pad 2 smd rect (at ${def_pos}8.275 -3.75 ${p.r}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.to})
        `
      } else {
          return `
            ${''/* pins */}
            (pad 1 thru_hole circle (at ${def_pos}5  -3.8) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.from})
            (pad 2 thru_hole circle (at ${def_pos}0  -5.9) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.to})
            (pad 3 thru_hole circle (at ${def_pos}-5 -8.0) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.from})
          `
      }
    }
    if(p.reverse) {
      return `
        ${standard}
        ${p.hummingbird ? hummingbird_footprint : ''}
        ${p.keycaps ? keycap : ''}
        ${pins('-', '', 'B')}
        ${pins('', '-', 'F')})
        `
    } else {
      return `
        ${standard}
        ${p.hummingbird ? hummingbird_footprint : ''}
        ${p.keycaps ? keycap : ''}
        ${pins('-', '', 'B')})
        `
    }
  }
}
