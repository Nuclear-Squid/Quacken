
module.exports = {
    params: {
        designator: 'CIRQUE',
    },

    body: p => {
        return `(gr_circle
            (center ${p.xy})
            (end ${p.x + 20} ${p.y})
            (stroke (width 0.3) (type default))
            (fill no)
            (layer "F.SilkS")
        )`;
    }
}

// (gr_circle
//     (center 215 110)
//     (end 235 115)
//     (stroke
//         (width 0.12)
//         (type default)
//     )
//     (fill no)
//     (layer "F.SilkS")
//     (uuid "c63a96ab-ea7a-4e21-99b0-a5c5f55dab8b")
// )
