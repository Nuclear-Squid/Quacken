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

function switch_body(p) {
    const pins_std = `
        (pad 1 thru_hole circle (at 5 -3.8) (size 2.3 2.3) (drill 1.5) (layers *.Cu *.Mask) ${p.from})
        (pad 2 thru_hole circle (at 0 -5.9) (size 2.3 2.3) (drill 1.5) (layers *.Cu *.Mask) ${p.to})
    `;

    return `(module PG1350 (layer F.Cu) (tedit 5DD50112)
        ${p.at /* parametric position */}

        ${'' /* Just drill the holes, do not assign component for BOM or PCBA */ }
        (attr through_hole board_only exclude_from_pos_files exclude_from_bom dnp)

        ${'' /* footprint reference */}
        (fp_text reference "${p.ref.replace('S', 'SW')}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

        ${''/* middle shaft */}
        (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))

        ${''/* stabilizers */}
        (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))

        ${'' /* keycap */}
        (fp_rect (start -9 -8.5) (end 9 8.5) (stroke (width 0.15) (type solid)) (fill no) (layer "Dwgs.User"))

        ${'' /* base switch marker */}
        (fp_rect (start -7 -7) (end 7 7) (stroke (width 0.15) (type solid)) (fill no) (layer "F.SilkS"))
        (fp_line (start -5.5 0) (end 5.5 0) (stroke (width 0.2) (type solid)) (layer "F.SilkS"))
        (fp_line (start 0 0) (end 0 -5.95) (stroke (width 0.2) (type solid)) (layer "F.SilkS"))

        ${'' /* Include signal pins only if there’s no hotswap */}
        ${p.hotswap ? '' : pins_std}
    )`;
}

function hotswap_socket(p) {
    if (!p.hotswap) return '';

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

    return `(module Adafruit-5118 (layer B.Cu) (tedit 5DD50112)
        ${p.at /* parametric position */}

        (fp_text reference "${p.ref.replace('S', 'SO')}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))


        ${'' /* holes */}
        (pad "" np_thru_hole circle (at 5 -3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at 0 -5.95) (size 3 3) (drill 3) (layers *.Cu *.Mask))

        ${'' /* net pads */}
        (pad 2 smd rect (at  8.275 -3.75 ${p.r}) (size 2.6 2.6) (layers B.Cu B.Paste B.Mask)  ${p.from})
        ${'' /* (pad 1 smd rect (at -3.275 -5.95 ${p.r}) (size 2.6 2.6) (layers B.Cu B.Paste B.Mask)  ${p.to}) */ }
        ${p.hummingbird ? chipped_pad : `(pad 1 smd rect (at -3.275 -5.95 ${p.r}) (size 2.6 2.6) (layers B.Cu B.Paste B.Mask)  ${p.to})`}
    )`;
}


function median_position(p) {
    if (!p.hummingbird) return '';

    return `(module MedianPosition (layer F.Cu) (tedit 5DD50112)
        ${p.at /* parametric position */}

        (fp_text reference "${p.ref.replace('S', 'SM')}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))

        ${'' /* pin hole */ }
        (pad "1" thru_hole circle (at -5 -8) (size 2.3 2.3) (drill 1.5) (layers *.Cu *.Mask) ${p.from})

        ${''/* middle shaft (hummingbird) */}
        (pad "" np_thru_hole circle (at 0 -11.8) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))

        ${''/* stabilizers (hummingbird) */}
        (pad "" np_thru_hole circle (at 5.5 -11.8) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at -5.5 -11.8) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
    )`;
}


module.exports = {
    params: {
        designator: 'S',
        hotswap: false,
        keycaps: false,
        hummingbird: '',
        from: undefined,
        to: undefined,
    },

    body: p => {
        if (typeof p.hummingbird !== 'boolean') {
            if (p.hummingbird[0] === '/') {
                p.hummingbird = (new RegExp(p.hummingbird.slice(1, p.hummingbird.length - 1))).test(p.from.name);
            }
            else if (p.hummingbird[0] === '-' && p.hummingbird[1] === '/') {
                p.hummingbird = !(new RegExp(p.hummingbird.slice(2, p.hummingbird.length - 1))).test(p.from.name);
            }
            else if (typeof p.hummingbird === 'object') {
                p.hummingbird = p.hummingbird.map(s => s.replace('matrix_', '')).includes(p.from.name);
            }
            else {
                p.hummingbird = p.hummingbird.replace('matrix_', '') === p.from.name;
            }
        }

        const track_hummingbird =
            segment(-5, -8, 5.275, -8, p)
            + arc(5.275, -8, 7.275, -9, 8.275, -11, p)
            + segment(8.275, -11, 8.275, -20, p)
        ;


        return switch_body(p) + hotswap_socket(p) + median_position(p);
    }
}
