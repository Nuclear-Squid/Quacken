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
  const [new_x, new_y] = rotate(x, y, p.rot);
  return `${new_x + p.x} ${new_y + p.y}`
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

// Returns a custom iterator, similar to Rust’s std::slice::Windows.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators
// https://doc.rust-lang.org/std/primitive.slice.html#method.windows
const array_windows = (arr, len) => ({
    *[Symbol.iterator]() {
        for (let i = 0; i <= arr.length - len; i++) {
            yield arr.slice(i, i + len);
        }
    }
});


function normalize_to(vec2, final_len) {
    const vec_len = Math.sqrt(Math.pow(vec2[0], 2) + Math.pow(vec2[1], 2));
    const new_x = vec2[0] / vec_len * final_len;
    const new_y = vec2[1] / vec_len * final_len;
    return [new_x, new_y];
};


function poly_line_relative(params, corner_radius, segment_coordinates) {
    let output = '';
    let previous_pos = segment_coordinates[0];
    let current_pos = segment_coordinates[0];
    // const iter = segment_coordinates.slice(1);
    const add_pairs = (pair1, pair2) => [pair1[0] + pair2[0], pair1[1] + pair2[1]];

    // for (const [x, y, r] of iter) {
    for (let i = 1; i < segment_coordinates.length; i++) {
        const [x, y, r=0] = segment_coordinates[i];
        current_pos = add_pairs(previous_pos, rotate(x, y, r ?? 0));

        if (i != segment_coordinates.length - 1) {
            const factor = 0.3;
            const start_point = rotate(...normalize_to(segment_coordinates[i - 1], corner_radius), r + 180);
            const mid_point = rotate(...normalize_to(segment_coordinates[i], corner_radius * factor), r + 180);
            const end_point = rotate(...normalize_to(segment_coordinates[i], corner_radius), r + 180);

            // output += arc(
            //     ...add_pairs(current_pos, start_point),
            //     ...add_pairs(current_pos, mid_point),
            //     ...add_pairs(current_pos, end_point),
            //     params,
            // );

            // output += segment(
            //     ...add_pairs(current_pos, start_point),
            //     ...add_pairs(current_pos, end_point),
            //     params,
            // );

            // output += arc(
            //     start_point[0],
            //     start_point[1],
            //     mid_point[0],
            //     mid_point[1],
            //     end_point[0],
            //     end_point[1],
            //     params
            // );

        }

        output += segment(
            previous_pos[0],
            previous_pos[1],
            current_pos[0],
            current_pos[1],
            params
        );

        previous_pos = current_pos;
    }

    return output;
}


function parallel_bus(offset, index, max_index, segment_coordinates) {
    const angle_between_vec = (vec1, vec2) => {
        const angle_1 = Math.atan2(...vec1) * 180 / Math.PI;
        const angle_2 = Math.atan2(...vec2) * 180 / Math.PI;

        let angle = angle_2 - angle_1
        if (angle >  180) angle -= 180;
        if (angle < -180) angle += 180;

        return angle;
    };

    let was_clockwise_rotation = angle_between_vec([-1, 0], segment_coordinates[1]) >= 0;
    let cummulated_x_offset = 0;
    let cummulated_y_offset = 0;
    let output = [segment_coordinates[0]];

    for (let i = 1; i < segment_coordinates.length - 1; i++) {
        let [x, y, r=0] = segment_coordinates[i];

        const next_rotation = segment_coordinates[i+1][2] ?? 0;
        const is_clockwise_rotation = next_rotation + angle_between_vec(segment_coordinates[i], segment_coordinates[i+1]) > 0;

        let [x_offset, y_offset] = is_clockwise_rotation == was_clockwise_rotation
            ? normalize_to([x, y], offset * index)
            : rotate(...normalize_to([x, y], offset * index), 180);

        let extra_x_offset = 0;
        let extra_y_offset = 0;
        if (next_rotation != 0) {
            if (segment_coordinates[i+1][0] == 0) {
                // * 1.05 to fix rounding errosr
                extra_x_offset = x_offset * Math.sin(Math.abs(next_rotation) * Math.PI / 180) * 1.05;
            }
        }

        if (Math.sign(cummulated_x_offset * x_offset) == -1) {
            x_offset *= 2;
        }
        else if (Math.sign(cummulated_x_offset * x_offset) == 1) {
            x_offset = 0;
        }

        if (Math.sign(cummulated_y_offset * y_offset) == -1) {
            y_offset *= 2;
        }
        else if (Math.sign(cummulated_y_offset * y_offset) == 1) {
            y_offset = 0;
        }

        x_offset += extra_x_offset
        y_offset += extra_y_offset

        cummulated_x_offset += x_offset;
        cummulated_y_offset += y_offset;
        output.push([x + x_offset, y + y_offset, r]);
    }

    output.push(segment_coordinates[segment_coordinates.length - 1]);
    return output;
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


function column_track(p) {
    const key_name_contains = s => p.from.name.match(s);

    // Ignore thumb keys
    if (key_name_contains('default')) return '';

    const track_width = 0.2;
    const track_clearence = 0.2;

    const is_upside_down = Math.abs(p.rot) > 90;

    const track_params = !is_upside_down ? p : {
        x: p.x,
        y: p.y,
        r: p.r + 180,
        rot: p.rot + 180,
    };

    const key_height = 17;
    const median_height = 12.8;
    const height_index = [/bottom/, /home/, /top/].findIndex(row => p.from.name.match(row));
    const extra_height = is_upside_down ? 6 : 14
    const col_height = key_height * height_index + extra_height

    const per_key_params = (() => {
        if (is_upside_down)
            return {
                start_x: -5,
                start_y: 3.8,
                end_y: col_height
            };
        if (p.hummingbird)
            return {
                start_x: -5,
                start_y: -3.8 + median_height,
                end_y: col_height - median_height
            };
        return {
            start_x: 5,
            start_y: -3.8,
            end_y: col_height
        };
    })();

    const per_column_params = (() => {
        // mirror certains parts on the right hand
        const right_hand = key_name_contains('mirror');
        const sign = right_hand ? -1 : 1;
        if (key_name_contains('inner'))
            return {
                x_to_mcu: right_hand ? 37.8 : -22,
                angle_to_mcu: 5 * sign,
                height_offset: -1,
            };
        if (key_name_contains('index'))
            return {
                x_to_mcu: right_hand
                    ? (22.325 - (track_width + track_clearence) * 3)
                    : (-4.15 - (track_width + track_clearence) * 3),
                angle_to_mcu: 5 * sign,
                height_offset: 1.5,
            };
        if (key_name_contains('middle'))
            return {
                x_to_mcu: right_hand ? 7 : 10,
                angle_to_mcu: 5 * sign,
                height_offset: 2,
            };
        if (key_name_contains('ring'))
            return {
                x_to_mcu: right_hand ? -9.3 : 27.3 - (track_width + track_clearence) * 3,
                angle_to_mcu: -1 * sign,
                height_offset: 1,
            };
        if (key_name_contains('pinky'))
            return {
                x_to_mcu: 7.5 * sign,
                angle_to_mcu: -10 * sign,
                end: right_hand
                    ? [[-3, 0], [-10, 0,  10]]
                    : [[10, 0], [ 10, 0, -10]],
            };
        if (key_name_contains('outer'))
            return {
                start_x_offset: right_hand ? 2.2 : 0,
                x_to_mcu: 7.5 * sign,
                angle_to_mcu: -10 * sign,
                height_offset: right_hand ? -2.5 : 1.5,
                end: right_hand
                    ? [[-18, 0], [-10, 0,  10]]
                    : [
                        [9.8, 0],
                        [ 0,-4],
                        [17.2, 0],
                        [10, 0, -10]
                    ],
            };
    })();

    const track = Object.assign(per_key_params, per_column_params);

    let full_track = [
        [track.start_x, track.start_y],
        [-7.5 - track.start_x - (track.start_x_offset ?? 0), 0],
        [ 0, track.end_y + (track.height_offset ?? 0)],
        [track.x_to_mcu, 0],
    ].concat(track.end ?? [[0, 7, track.angle_to_mcu]]);

    return poly_line_relative(
        track_params,
        1.5,
        parallel_bus((track_width + track_clearence), height_index, 2, full_track)
    );
}


function update_reference(p) {
    const reference_number = parseInt(p.ref.replace(p.designator, ''));
    const reference_translation_table = [
        6, 5, 4,
        9, 8, 7,
        12, 11, 10,
        15, 14, 13,
        21, 20, 19,
        25, 26, 27,
        28, 29, 30,
        31, 32, 33,
        34, 35, 36,
        40, 41, 42,
        3, 2, 1,
        18, 17, 16,
        22, 23, 24,
        37, 38, 39,
    ];

    p.ref = p.designator + reference_translation_table[reference_number - 1];
}


module.exports = {
    params: {
        designator: 'SW',
        keycaps: false,
        hummingbird: '',
        from: undefined,
        to: undefined,
    },

    body: p => {
        update_reference(p);

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
            (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
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
