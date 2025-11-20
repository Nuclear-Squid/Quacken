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


function rotate(x, y, r) {
  const new_x = x * Math.cos(-r * Math.PI / 180) - y * Math.sin(-r * Math.PI / 180);
  const new_y = x * Math.sin(-r * Math.PI / 180) + y * Math.cos(-r * Math.PI / 180);
  return [new_x, new_y]
}

const diode = (x, y, r, p) => {
  p.r += r;
  const [new_x, new_y] = rotate(x, y, p.r);
  p.x += new_x;
  p.y += new_y;
  p.from = p.diode_from;
  p.to = p.diode_to;
  p.ref[0] = 'D'
  const text = `
    (footprint "Diode_SMD:D_SOD-323" (layer "B.Cu")
      ${'' /* ${p.at  /* parametric position */   }
      (at ${p.x} ${p.y} ${p.r})

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))


      (descr "SOD-323")
      (tags "SOD-323")
      (attr smd)
      (fp_line
        (start -1.61 -0.85)
        (end -1.61 0.85)
        (stroke
          (width 0.12)
          (type solid)
        )
        (layer "B.SilkS")
      )
      (fp_line
        (start -1.61 -0.85)
        (end 1.05 -0.85)
        (stroke
          (width 0.12)
          (type solid)
        )
        (layer "B.SilkS")
      )
      (fp_line
        (start -1.61 0.85)
        (end 1.05 0.85)
        (stroke
          (width 0.12)
          (type solid)
        )
        (layer "B.SilkS")
      )
      (fp_line
        (start -1.6 -0.95)
        (end -1.6 0.95)
        (stroke
          (width 0.05)
          (type solid)
        )
        (layer "B.CrtYd")
      )
      (fp_line
        (start -1.6 -0.95)
        (end 1.6 -0.95)
        (stroke
          (width 0.05)
          (type solid)
        )
        (layer "B.CrtYd")
      )
      (fp_line
        (start -1.6 0.95)
        (end 1.6 0.95)
        (stroke
          (width 0.05)
          (type solid)
        )
        (layer "B.CrtYd")
      )
      (fp_line
        (start 1.6 -0.95)
        (end 1.6 0.95)
        (stroke
          (width 0.05)
          (type solid)
        )
        (layer "B.CrtYd")
      )
      (fp_line
        (start -0.9 -0.7)
        (end 0.9 -0.7)
        (stroke
          (width 0.1)
          (type solid)
        )
        (layer "B.Fab")
      )
      (fp_line
        (start -0.9 0.7)
        (end -0.9 -0.7)
        (stroke
          (width 0.1)
          (type solid)
        )
        (layer "B.Fab")
      )
      (fp_line
        (start -0.3 -0.35)
        (end -0.3 0.35)
        (stroke
          (width 0.1)
          (type solid)
        )
        (layer "B.Fab")
      )
      (fp_line
        (start -0.3 0)
        (end -0.5 0)
        (stroke
          (width 0.1)
          (type solid)
        )
        (layer "B.Fab")
      )
      (fp_line
        (start -0.3 0)
        (end 0.2 -0.35)
        (stroke
          (width 0.1)
          (type solid)
        )
        (layer "B.Fab")
      )
      (fp_line
        (start 0.2 -0.35)
        (end 0.2 0.35)
        (stroke
          (width 0.1)
          (type solid)
        )
        (layer "B.Fab")
      )
      (fp_line
        (start 0.2 0)
        (end 0.45 0)
        (stroke
          (width 0.1)
          (type solid)
        )
        (layer "B.Fab")
      )
      (fp_line
        (start 0.2 0.35)
        (end -0.3 0)
        (stroke
          (width 0.1)
          (type solid)
        )
        (layer "B.Fab")
      )
      (fp_line
        (start 0.9 -0.7)
        (end 0.9 0.7)
        (stroke
          (width 0.1)
          (type solid)
        )
        (layer "B.Fab")
      )
      (fp_line
        (start 0.9 0.7)
        (end -0.9 0.7)
        (stroke
          (width 0.1)
          (type solid)
        )
        (layer "B.Fab")
      )
      (pad "1" smd roundrect
        (at -1.05 0 ${p.r})
        (size 0.6 0.45)
        (layers "B.Cu" "B.Mask" "B.Paste")
        (roundrect_rratio 0.25)
        ${p.to.str}
      )
      (pad "2" smd roundrect
        (at 1.05 0 ${p.r})
        (size 0.6 0.45)
        (layers "B.Cu" "B.Mask" "B.Paste")
        (roundrect_rratio 0.25)
        ${p.from.str}
      )
  )
  `;

  return text;
}

function absolute_coords(x, y, p) {
  const new_x = x * Math.cos(-p.rot * Math.PI / 180) - y * Math.sin(-p.rot * Math.PI / 180) + p.x;
  const new_y = x * Math.sin(-p.rot * Math.PI / 180) + y * Math.cos(-p.rot * Math.PI / 180) + p.y;
  return `${new_x} ${new_y}`
}

function via(x, y, params) {
  return `
    (via (at ${absolute_coords(x, y, params)}) (size 0.8) (drill 0.4) (layers "F.Cu" "B.Cu"))
  `;
}

function segment(start_x, start_y, end_x, end_y, params) {
  return `
    (segment
      (start ${absolute_coords(start_x, start_y, params)})
      (end   ${absolute_coords(end_x,   end_y,   params)})
      (width 0.25)
      (layer "B.Cu")
    )
  `;
}

function arc(start_x, start_y, middle_x, middle_y, end_x, end_y, params) {
  return `
    (arc
      (start ${absolute_coords(start_x,  start_y,  params)})
      (mid   ${absolute_coords(middle_x, middle_y, params)})
      (end   ${absolute_coords(end_x,    end_y,    params)})
      (width 0.25)
      (layer "B.Cu")
    )
  `;
}



module.exports = {
  params: {
    designator: 'S',
    hotswap: false,
    keycaps: false,
    hummingbird: '',
    connect_below: '',
    from: undefined,
    to: undefined,
    diode_from: undefined,
    diode_to: undefined
  },
  body: p => {
    if (typeof p.hummingbird !== 'boolean') {
      if (p.hummingbird[0] === '/') {
        p.hummingbird = (new RegExp(p.hummingbird.slice(1, p.hummingbird.length - 1))).test(p.to.name);
      }
      else if (p.hummingbird[0] === '-' && p.hummingbird[1] === '/') {
        p.hummingbird = !(new RegExp(p.hummingbird.slice(1, p.hummingbird.length - 1))).test(p.to.name);
      }
      else if (typeof p.hummingbird === 'object') {
        p.hummingbird = p.hummingbird.map(s => s.replace('matrix_', '')).includes(p.to.name);
      }
      else {
        p.hummingbird = p.hummingbird.replace('matrix_', '') === p.to.name;
      }
    }

    if (typeof p.connect_below !== 'boolean') {
      if (p.connect_below[0] === '/') {
        p.connect_below = (new RegExp(p.connect_below.slice(1, p.connect_below.length - 1))).test(p.to.name);
      }
      else if (p.connect_below[0] === '-' && p.connect_below[1] === '/') {
        p.connect_below = !(new RegExp(p.connect_below.slice(2, p.connect_below.length - 1))).test(p.to.name);
      }
      else if (typeof p.connect_below === 'object') {
        p.connect_below = p.connect_below.map(s => s.replace('matrix_', '')).includes(p.to.name);
      }
      else {
        p.connect_below = p.connect_below.replace('matrix_', '') === p.to.name;
      }
    }

    const [arrow_up, arrow_down] = p.r > 0 ? ['↓', '↑'] : ['↑', '↓'];

    const standard = `
      (module PG1350 (layer F.Cu) (tedit 5DD50112)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${''/* corner marks */}
      ${'' /* (fp_line (start -7 -6) (end -7 -7) (layer Dwgs.User) (width 0.15)) */ }
      ${'' /* (fp_line (start -7 7) (end -6 7) (layer Dwgs.User) (width 0.15)) */ }
      ${'' /* (fp_line (start -6 -7) (end -7 -7) (layer Dwgs.User) (width 0.15)) */ }
      ${'' /* (fp_line (start -7 7) (end -7 6) (layer Dwgs.User) (width 0.15)) */ }
      ${'' /* (fp_line (start 7 6) (end 7 7) (layer Dwgs.User) (width 0.15)) */ }
      ${'' /* (fp_line (start 7 -7) (end 6 -7) (layer Dwgs.User) (width 0.15)) */ }
      ${'' /* (fp_line (start 6 7) (end 7 7) (layer Dwgs.User) (width 0.15)) */ }
      ${'' /* (fp_line (start 7 -7) (end 7 -6) (layer Dwgs.User) (width 0.15)) */ }

      ${''/* middle shaft */}
      (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))

      ${''/* stabilizers */}
      (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      `
    const keycap = `
      ${'' /* keycap marks */}
      (fp_line (start -9 -8.5) (end 9 -8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9 -8.5) (end 9 8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9 8.5) (end -9 8.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start -9 8.5) (end -9 -8.5) (layer Dwgs.User) (width 0.15))
      `
    const switch_outline = `
      (fp_line (start -7 -7) (end -7 7)  (layer "F.SilkS") (width 0.15))
      (fp_line (start -7 7)  (end 7 7)   (layer "F.SilkS") (width 0.15))
      (fp_line (start 7 7)   (end 7 -7)  (layer "F.SilkS") (width 0.15))
      (fp_line (start 7 -7)  (end -7 -7) (layer "F.SilkS") (width 0.15))
    `;

    const hummingbird_switch_outline = `
      (fp_line (start -6.5 -14) (end 6.5 -14) (layer "F.SilkS") (stroke (width 0.15) (type dot)))
      (fp_line (start -6.5 -4)  (end 6.5 -4)  (layer "F.SilkS") (stroke (width 0.15) (type dot)))
      (fp_line (start -6.5 -14) (end -6.5 -4) (layer "F.SilkS") (stroke (width 0.15) (type dot)))
      (fp_line (start 6.5 -4)   (end 6.5 -14) (layer "F.SilkS") (stroke (width 0.15) (type dot)))
      (fp_text user "${arrow_down} standard ${arrow_down}" (at 0 -2.95 ${p.r}) (effects (font (size 0.8 0.8))))
      (fp_text user "${arrow_up} hummingbird ${arrow_up}" (at 0 -9.4 ${p.r}) (effects (font (size 0.8 0.8))))
    `;

    const pins_std = `
        (pad 1 thru_hole circle (at 5 -3.8) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.from})
        (pad 2 thru_hole circle (at 0 -5.9) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.to})
    `;

    const chipped_pad = `
      (pad "1" smd roundrect
        (at -3.275 -5.95 ${p.rot})
        (size 2.6 2.6)
        (layers "B.Cu" "B.Mask" "B.Paste")
        (roundrect_rratio 0)
        (chamfer_ratio 0.35)
        (chamfer top_left)
        ${p.to}
      )
    `;

    const pins_hotswap = `
      ${'' /* holes */}
      (pad "" np_thru_hole circle (at 5 -3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at 0 -5.95) (size 3 3) (drill 3) (layers *.Cu *.Mask))

      ${'' /* net pads */}
      (pad 2 smd rect (at  8.275 -3.75 ${p.r}) (size 2.6 2.6) (layers B.Cu B.Paste B.Mask)  ${p.from})
      ${'' /* (pad 1 smd rect (at -3.275 -5.95 ${p.r}) (size 2.6 2.6) (layers B.Cu B.Paste B.Mask)  ${p.to}) */ }
      ${p.hummingbird ? chipped_pad : `(pad 1 smd rect (at -3.275 -5.95 ${p.r}) (size 2.6 2.6) (layers B.Cu B.Paste B.Mask)  ${p.to})`}
    `;

    const pin_hummingbird = `
      ${'' /* pin hole */ }
      (pad "3" thru_hole custom
        (at -5 -8 ${p.rot})
        (size 2.232 2.232)
        (drill 1.5
          (offset -0.05 -0.05)
        )
        (layers "*.Cu" "*.Mask")
        (remove_unused_layers no)
        (thermal_bridge_angle 90)
        (options
          (clearance outline)
          (anchor circle)
        )
        (primitives)
        (uuid "f1d6eda7-fb6d-4b4b-a3b1-d0197b19ef18")
        ${p.from}
      )

      ${''/* middle shaft (hummingbird) */}
      (pad "" np_thru_hole circle (at 0 -11.8) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))

      ${''/* stabilizers (hummingbird) */}
      (pad "" np_thru_hole circle (at 5.5 -11.8) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at -5.5 -11.8) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
    `;

    const track_hummingbird = segment(-5, -8, 3, -8, p) + arc(3, -8, 6, -7, 8.275, -3.75, p);
    const track_column = segment(7.775, -3.75, 7.775, 12, p);

    return `
      ${standard}
      ${switch_outline}
      ${p.hummingbird ? hummingbird_switch_outline : '' }
      ${'' /* ${p.keycaps ? keycap : ''} */ }
      ${keycap}
      ${p.hotswap ? pins_hotswap : pins_std}
      ${p.hummingbird ? pin_hummingbird : ''})

      ${segment(-3.2, -5.95, -3.2, 0.25, p)}
      ${via(-3.2, 2.5, p)}

      ${diode(-1.5, -3.2, 90, p)}

      ${p.hummingbird ? track_hummingbird : ''}
      ${p.connect_below ? track_column : ''}
      `
  }
}
