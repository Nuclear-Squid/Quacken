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
      (width 0.2)
      (layer "F.Cu")
    )
  `;
}

function arc(start_x, start_y, middle_x, middle_y, end_x, end_y, params) {
  return `
    (arc
      (start ${absolute_coords(start_x,  start_y,  params)})
      (mid   ${absolute_coords(middle_x, middle_y, params)})
      (end   ${absolute_coords(end_x,    end_y,    params)})
      (width 0.2)
      (layer "F.Cu")
    )
  `;
}


function oval_hole(num, x, y, rot, net) {
    return `
        (pad "${num}" thru_hole oval
            ${'' /* (at 5 -3.8) */ }
            (at ${x} ${y} ${rot})
            (size 2.2 1.6)
            (drill oval 1.25 0.9)
            (layers "*.Cu" "*.Mask")
            (remove_unused_layers no)
            (pintype "passive")
            ${net}
        )
    `;
}


function _switch_body(p) {
    const pins_std = `
        ${oval_hole(1, 5, -3.8, p.rot, p.from)}
        ${oval_hole(2, 0, -5.9, p.rot, p.to)}
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


function median_position(p) {
    // const unrotated_params = Object.assign(p, { rot: p.rot % 180 });
    const track_params = Math.abs(p.rot) < 90 ? p : {
        x: p.x,
        y: p.y - 5,
        r: p.r + 180,
        rot: p.rot + 180,
    };

    return `(module MedianPosition (layer F.Cu) (tedit 5DD50112)
        ${p.at /* parametric position */}

        (fp_text reference "${p.ref.replace('S', 'SM')}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))

        ${'' /* pin hole */ }
        ${oval_hole(1, -5, 9.0, p.rot, p.from)}

        ${''/* middle shaft (hummingbird) */}
        (pad "" np_thru_hole circle (at 0 5.2) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))

        ${''/* stabilizers (hummingbird) */}
        (pad "" np_thru_hole circle (at  5.5 5.2) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at -5.5 5.2) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
    )`
        // Auto route extra pad 1 to std pad 1
        + segment(-5, 9, 0, 9, track_params)
        + arc(0, 9, 2.275, 8, 3.1818, 6, track_params)
        + segment(3.1818, 6, 3.1818, -1.9818, track_params)
        + arc(3.1818, -1.9818, 4, -3.5, 5, -3.8, track_params)
    ;
}


function column_track(p) {
    // Ignore thumb keys
    if (p.from.name.match(/default/)) return '';

    const track_width = 0.2;
    const track_clearence = 0.15;

    const height = [/bottom/, /home/, /top/].findIndex(row => p.from.name.match(row));
    // const start_x = 7;
    // const [start_x, start_y] = Math.abs(p.rot) < 90 ? [5, -3.8] : [-5, 3.8];

    const x_offset = (track_width + track_clearence) * height;
    const length = height * 17 + 10
    let start_y_arc = -3.8
    // const start_y_vertical = -3.8 - 1.4 - x_offset;
    let [start_x_arc, start_x_vertical, start_y_vertical, end_y_vertical] = Math.abs(p.rot) < 90
        ? [-6, -8.3 + (track_width + track_clearence) * (2 - height), -3.8 + 1.4 + x_offset,  length - 1.13]
        : [ 6,  7.6 + (track_width + track_clearence) * height,       -3.8 - 1.4 - x_offset, -length - 1.13]
    ;

    if (Math.abs(p.rot) < 90 && p.hummingbird) {
        start_y_arc      += 12.8;
        start_y_vertical += 12.8;
    }

    let sign = 1;

    if ([/ring/, /pinky/, /inner/].find(col => p.from.name.match(col))) {
        sign *= -1;
    }

    if (p.from.name.match(/mirror/)) {
        sign *= -1;
    }

    end_y_vertical += x_offset * sign;

    const columns = [/inner/, /index/, /middle/, /ring/, /pinky/, /outer/];
    const x_to_mcu = p.from.name.match(/mirror/)
        ? [35, 18, 5, 5, 15, 32]
        : [29, 12, 5, 5, 15, 32]
    ;

    const y_offset = p.from.name.match(/mirror/)
        ? [1, -1, -1, 3, 1, -1]
        : [1, -1, -3, 2, 1, -1]
    ;

    const col_index = columns.findIndex(col => p.from.name.match(col));

    const end_x_mcu = start_x_vertical +  x_to_mcu[col_index] * sign;
    end_y_vertical += y_offset[col_index];

    const arc_size = 1.5;
    const y_sign = Math.abs(p.rot) < 90 ? 1 : -1;
    const x_sign = -sign;

    // If I return the EXACT SAME FUCKING EXPRESSION directily instead of
    // storing it in this useless fucking variable, it evaluates as `undefined`.
    // What the actual fuck.
    const test =
        (Math.abs(p.rot) < 90 && !p.hummingbird ? segment(start_x_arc, start_y_arc, 5, start_y_arc, p) : '')
        + arc(start_x_arc, start_y_arc, start_x_arc + 0.4, start_y_arc - 0.00, start_x_vertical, start_y_vertical, p)
        + segment(start_x_vertical, start_y_vertical, start_x_vertical, end_y_vertical - arc_size * y_sign, p)
        + arc(start_x_vertical, end_y_vertical - arc_size * y_sign, start_x_vertical - 0.5 * x_sign, end_y_vertical - 0.4 * y_sign, start_x_vertical - arc_size * x_sign, end_y_vertical, p)
        + segment(start_x_vertical - arc_size * x_sign, end_y_vertical, end_x_mcu, end_y_vertical, p)
    ;

    return test;
}


module.exports = {
    params: {
        designator: 'S',
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

        // return switch_body(p) + (p.hummingbird ? median_position(p) : '');
        const footprint_name = p.hummingbird ? "Choc_Switch_Median" : "Choc_Switch";

        // const unrotated_params = Object.assign(p, { rot: p.rot % 180 });
        const track_params = Math.abs(p.rot) < 90 ? p : {
            x: p.x,
            y: p.y - 5.2,
            r: p.r + 180,
            rot: p.rot + 180,
        };

        // Auto route extra pad 1 to std pad 1
        const median_track =
            segment(-5, 9, 0, 9, track_params)
            + arc(0, 9, 2.275, 8, 3.1818, 6, track_params)
            + segment(3.1818, 6, 3.1818, -1.9818, track_params)
            + arc(3.1818, -1.9818, 4, -3.5, 5, -3.8, track_params)

        const median_holes = `
            ${'' /* pin hole */ }
            ${oval_hole(1, -5, 9.0, p.rot, p.from)}

            ${''/* middle shaft (hummingbird) */}
            (pad "" np_thru_hole circle (at 0 5.2) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))

            ${''/* stabilizers (hummingbird) */}
            (pad "" np_thru_hole circle (at  5.5 5.2) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
            (pad "" np_thru_hole circle (at -5.5 5.2) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        `;

        return `(module ${footprint_name} (layer F.Cu) (tedit 5DD50112)
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

            ${'' /* Signal pins */}
            ${oval_hole(1, 5, -3.8, p.rot, p.from)}
            ${oval_hole(2, 0, -5.9, p.rot, p.to)}

            ${p.hummingbird ? median_holes : ''}
        )`
            + column_track(p)
            + (p.hummingbird ? median_track : '')
        ;
    }
}
