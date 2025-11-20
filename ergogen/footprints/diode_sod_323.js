
module.exports = {
  params: {
    designator: 'S',
    from: undefined,
    to: undefined
  },
  body: p => {
    const text = `
      (footprint "Diode_SMD:D_SOD-323" (layer "B.Cu")
        ${p.at  /* parametric position */ }

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
}
