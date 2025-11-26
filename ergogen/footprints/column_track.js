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
      (width 0.25)
      (layer "F.Cu")
    )
  `;
}

module.exports = {
    params: {
        designator: '',
        hummingbird: false,
        key: ''
    },

    body: p => {
        const track_width = 0.2;
        const track_clearence = 0.15;

        const height = [/bottom/, /home/, /top/].findIndex(row => p.key.match(row));
        const [start_x, start_y] = Math.abs(p.rot) < 90 ? [5, -3.8] : [-5, 3.8];
        console.log(start_x)

        const x_offset = (track_width + track_clearence) * height;
        const length = height * 17 + 15

        return segment(start_x + x_offset, start_y, start_x + x_offset, length, p);
    }
}
