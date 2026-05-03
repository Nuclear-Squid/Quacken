module.exports = {
    params: {
        designator: 'U',
    },

    body: p => {
        return ` (footprint "Connector_JST:JST_SH_SM04B-SRSS-TB_1x04-1MP_P1.00mm_Horizontal"
            (layer "F.Cu")
            (uuid "214adb6d-028f-4e0c-a636-2bf68fa7eb7b")
            ${p.at}
            (descr "JST SH series connector, SM04B-SRSS-TB (http://www.jst-mfg.com/product/pdf/eng/eSH.pdf), generated with kicad-footprint-generator")
            (tags "connector JST SH horizontal")
            (property "Reference" ""
                (at 0 -3.98 180)
                (layer "F.SilkS")
                (uuid "db45ac28-765a-48b7-a673-62e3ae51065f")
                (effects
                    (font
                        (size 1 1)
                        (thickness 0.15)
                    )
                )
            )
            (property "Value" ""
                (at 0 3.98 180)
                (layer "F.Fab")
                (uuid "6d2ee480-afd7-4203-b843-c4af57d81b83")
                (effects
                    (font
                        (size 1 1)
                        (thickness 0.15)
                    )
                )
            )
            (property "Datasheet" ""
                (at 0 0 180)
                (layer "F.Fab")
                (hide yes)
                (uuid "157a9ebb-f1ba-4336-ba75-45a2458f5702")
                (effects
                    (font
                        (size 1.27 1.27)
                        (thickness 0.15)
                    )
                )
            )
            (property "Description" ""
                (at 0 0 180)
                (layer "F.Fab")
                (hide yes)
                (uuid "4a01f761-b238-4d1c-a094-cd44f3537267")
                (effects
                    (font
                        (size 1.27 1.27)
                        (thickness 0.15)
                    )
                )
            )
            (attr smd)
            (fp_line
                (start 3.11 0.715)
                (end 3.11 -1.785)
                (stroke
                    (width 0.12)
                    (type solid)
                )
                (layer "F.SilkS")
                (uuid "a1adb881-ea52-4851-b842-86ed3dbb026b")
            )
            (fp_line
                (start 3.11 -1.785)
                (end 2.06 -1.785)
                (stroke
                    (width 0.12)
                    (type solid)
                )
                (layer "F.SilkS")
                (uuid "54d24ce7-6ac5-4d23-9289-c0037d293216")
            )
            (fp_line
                (start -1.94 2.685)
                (end 1.94 2.685)
                (stroke
                    (width 0.12)
                    (type solid)
                )
                (layer "F.SilkS")
                (uuid "d22b9bc5-f624-4b73-b1e1-ce9dccb64e6d")
            )
            (fp_line
                (start -2.06 -1.785)
                (end -2.06 -2.775)
                (stroke
                    (width 0.12)
                    (type solid)
                )
                (layer "F.SilkS")
                (uuid "00701101-499c-44c8-9fdc-2a802ee4b48c")
            )
            (fp_line
                (start -3.11 0.715)
                (end -3.11 -1.785)
                (stroke
                    (width 0.12)
                    (type solid)
                )
                (layer "F.SilkS")
                (uuid "514bb727-28cc-4068-9f7a-b3c08303835c")
            )
            (fp_line
                (start -3.11 -1.785)
                (end -2.06 -1.785)
                (stroke
                    (width 0.12)
                    (type solid)
                )
                (layer "F.SilkS")
                (uuid "8e1606e0-3f33-4191-8765-badc380ba837")
            )
            (fp_line
                (start 3.9 3.28)
                (end 1.69 3.28)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "2e1e4d36-b50f-4477-95c3-b907e0d619be")
            )
            (fp_line
                (start 3.9 0.47)
                (end 3.9 3.28)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "c89d4db0-89cc-46a1-a473-977213f6e595")
            )
            (fp_line
                (start 3.5 0.47)
                (end 3.9 0.47)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "90abfa0a-f462-4cb7-97bb-598e6073c5e9")
            )
            (fp_line
                (start 3.5 -2.18)
                (end 3.5 0.47)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "2205d7db-23c6-4f2b-acfb-e59929479cff")
            )
            (fp_line
                (start 2.3 -2.18)
                (end 3.5 -2.18)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "89edda2f-9f05-4de3-a5b3-4ac57b03f0ce")
            )
            (fp_line
                (start 2.3 -3.28)
                (end 2.3 -2.18)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "fc9239f0-7239-4c8f-bbef-750cacaf9287")
            )
            (fp_line
                (start 1.69 3.28)
                (end 1.69 3.08)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "53e135be-01cf-4546-b594-04052bb1cd74")
            )
            (fp_line
                (start 1.69 3.08)
                (end -1.69 3.08)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "f79993e3-5601-461c-990a-1e803e6a1294")
            )
            (fp_line
                (start -1.69 3.28)
                (end -3.9 3.28)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "99204a6c-a716-475d-ba3b-c9a1e7bb1c06")
            )
            (fp_line
                (start -1.69 3.08)
                (end -1.69 3.28)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "64df6f90-ec0c-4755-b5cb-253900794ec7")
            )
            (fp_line
                (start -2.3 -2.18)
                (end -2.3 -3.28)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "5b97c406-5669-496e-8316-4a700ce3104a")
            )
            (fp_line
                (start -2.3 -3.28)
                (end 2.3 -3.28)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "c9b3423a-c508-42ed-a4a4-67741e77d123")
            )
            (fp_line
                (start -3.5 0.47)
                (end -3.5 -2.18)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "5263aeca-97bd-4f1b-bc92-18b25eb627df")
            )
            (fp_line
                (start -3.5 -2.18)
                (end -2.3 -2.18)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "bd3ad193-f1a0-422b-9d7a-241a9ff74db4")
            )
            (fp_line
                (start -3.9 3.28)
                (end -3.9 0.47)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "6916be7a-b496-4884-8a97-34047d01d3fe")
            )
            (fp_line
                (start -3.9 0.47)
                (end -3.5 0.47)
                (stroke
                    (width 0.05)
                    (type solid)
                )
                (layer "F.CrtYd")
                (uuid "23d4f6eb-479b-4f1d-b4bd-7bf7211fdaec")
            )
            (fp_line
                (start 3 -1.675)
                (end 3 2.575)
                (stroke
                    (width 0.1)
                    (type solid)
                )
                (layer "F.Fab")
                (uuid "a4fb5e62-46d6-4a91-80d4-ab074d068412")
            )
            (fp_line
                (start -1.5 -0.967893)
                (end -1 -1.675)
                (stroke
                    (width 0.1)
                    (type solid)
                )
                (layer "F.Fab")
                (uuid "aedf82d6-4e36-46de-9f62-82a6cb74e588")
            )
            (fp_line
                (start -2 -1.675)
                (end -1.5 -0.967893)
                (stroke
                    (width 0.1)
                    (type solid)
                )
                (layer "F.Fab")
                (uuid "d2b9117e-f5fb-4fb3-ac3b-146da3ed2767")
            )
            (fp_line
                (start -3 2.575)
                (end 3 2.575)
                (stroke
                    (width 0.1)
                    (type solid)
                )
                (layer "F.Fab")
                (uuid "a4949781-8bdf-484d-805c-d8e73b81225b")
            )
            (fp_line
                (start -3 -1.675)
                (end 3 -1.675)
                (stroke
                    (width 0.1)
                    (type solid)
                )
                (layer "F.Fab")
                (uuid "11b6d2c2-9efe-412e-9890-be2cdc83171f")
            )
            (fp_line
                (start -3 -1.675)
                (end -3 2.575)
                (stroke
                    (width 0.1)
                    (type solid)
                )
                (layer "F.Fab")
                (uuid "e900d3a7-5158-4b1d-85a3-164912f9a16d")
            )
            (fp_text user "\${REFERENCE}"
                (at 0 0 180)
                (layer "F.Fab")
                (uuid "aba43ce6-1fa3-4308-88e2-d60909061886")
                (effects
                    (font
                        (size 1 1)
                        (thickness 0.15)
                    )
                )
            )
            (pad "1" smd roundrect
                (at -1.5 -2 180)
                (size 0.6 1.55)
                (layers "F.Cu" "F.Mask" "F.Paste")
                (roundrect_rratio 0.25)
                (uuid "cb21b0ce-64c9-4bf7-bfc8-2b8dd5b1ec43")
            )
            (pad "2" smd roundrect
                (at -0.5 -2 180)
                (size 0.6 1.55)
                (layers "F.Cu" "F.Mask" "F.Paste")
                (roundrect_rratio 0.25)
                (uuid "bfc08a1a-61d1-4c00-a962-6921841cd489")
            )
            (pad "3" smd roundrect
                (at 0.5 -2 180)
                (size 0.6 1.55)
                (layers "F.Cu" "F.Mask" "F.Paste")
                (roundrect_rratio 0.25)
                (uuid "fed147be-15ec-42d3-9bfe-59019423127e")
            )
            (pad "4" smd roundrect
                (at 1.5 -2 180)
                (size 0.6 1.55)
                (layers "F.Cu" "F.Mask" "F.Paste")
                (roundrect_rratio 0.25)
                (uuid "879b59f4-ca39-4eb4-b94e-b05e3cd0452e")
            )
            (pad "MP" smd roundrect
                (at -2.8 1.875 180)
                (size 1.2 1.8)
                (layers "F.Cu" "F.Mask" "F.Paste")
                (roundrect_rratio 0.208333)
                (uuid "2d80317c-fe19-44cd-ab92-705b2b924270")
            )
            (pad "MP" smd roundrect
                (at 2.8 1.875 180)
                (size 1.2 1.8)
                (layers "F.Cu" "F.Mask" "F.Paste")
                (roundrect_rratio 0.208333)
                (uuid "c822f6c0-3e9b-476f-aa8b-ff17d20aeb0d")
            )
            (embedded_fonts no)
            (model "\${KICAD9_3DMODEL_DIR}/Connector_JST.3dshapes/JST_SH_SM04B-SRSS-TB_1x04-1MP_P1.00mm_Horizontal.stpZ"
                (offset
                    (xyz 0 0 0)
                )
                (scale
                    (xyz 1 1 1)
                )
                (rotate
                    (xyz 0 0 0)
                )
            )
        )`;
    }
}

