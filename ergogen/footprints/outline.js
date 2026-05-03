module.exports = {
    params: {
        designator: 'O',
    },

    body: p => {
        return `(module Outline (layer F.Cu) (tedit 5DD50112)
            ${p.at}
            (fp_line
                (start -131.00305 -46.662488)
                (end -131.00305 18.974174)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "221b2eda-b704-4627-86dd-c4bfe2b6084b")
            )
            (fp_line
                (start -1.20305 43.364467)
                (end -17.371339 55.490683)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "04809f85-5244-440d-94cc-be4f6691e772")
            )
            (fp_line
                (start 1.196952 43.364468)
                (end 17.365239 55.490683)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "50d76346-ad8a-4407-ba5f-b304d82cc17d")
            )
            (fp_line
                (start 130.99695 -46.662488)
                (end 130.99695 18.974174)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "1180b575-eedf-4170-a2c2-8ecc6c503024")
            )
            ${'' /* (fp_arc */ }
                ${'' /* (start -0.00305 40.964467) */ }
                ${'' /* (mid -0.319768 42.306108) */ }
                ${'' /* (end -1.20305 43.364467) */ }
                ${'' /* (stroke */ }
                    ${'' /* (width 0.2) */ }
                    ${'' /* (type default) */ }
                ${'' /* ) */ }
                ${'' /* (layer "Edge.Cuts") */ }
                ${'' /* (uuid "8d41ffbf-940a-4ab4-b921-96ff4ea90f04") */ }
            ${'' /* ) */ }
            ${'' /* (fp_arc */ }
                ${'' /* (start -0.00305 40.964467) */ }
                ${'' /* (mid -0.319768 42.306108) */ }
                ${'' /* (end -1.20305 43.364467) */ }
                ${'' /* (stroke */ }
                    ${'' /* (width 0.2) */ }
                    ${'' /* (type default) */ }
                ${'' /* ) */ }
                ${'' /* (layer "Edge.Cuts") */ }
                ${'' /* (uuid "a7d8001c-6314-444e-843a-d4ffc3855fc4") */ }
            ${'' /* ) */ }
            ${'' /* (fp_arc */ }
                ${'' /* (start -0.00305 40.964467) */ }
                ${'' /* (mid -0.319768 42.306108) */ }
                ${'' /* (end -1.203049 43.364466) */ }
                ${'' /* (stroke */ }
                    ${'' /* (width 0.2) */ }
                    ${'' /* (type default) */ }
                ${'' /* ) */ }
                ${'' /* (layer "Edge.Cuts") */ }
                ${'' /* (uuid "9f905aa5-fe93-4ef6-9c41-b23ddfd99f9e") */ }
            ${'' /* ) */ }
            ${'' /* (fp_arc */ }
                ${'' /* (start -0.00305 40.964467) */ }
                ${'' /* (mid -0.319768 42.306108) */ }
                ${'' /* (end -1.203049 43.364466) */ }
                ${'' /* (stroke */ }
                    ${'' /* (width 0.2) */ }
                    ${'' /* (type default) */ }
                ${'' /* ) */ }
                ${'' /* (layer "Edge.Cuts") */ }
                ${'' /* (uuid "e4c2096b-c639-49ba-8e0a-02d66d3dcae9") */ }
            ${'' /* ) */ }
            ${'' /* (fp_arc */ }
                ${'' /* (start 1.196952 43.364468) */ }
                ${'' /* (mid 0.313668 42.306108) */ }
                ${'' /* (end -0.00305 40.964467) */ }
                ${'' /* (stroke */ }
                    ${'' /* (width 0.2) */ }
                    ${'' /* (type default) */ }
                ${'' /* ) */ }
                ${'' /* (layer "Edge.Cuts") */ }
                ${'' /* (uuid "08daa35a-069b-425a-9eed-963e730699c0") */ }
            ${'' /* ) */ }
            ${'' /* (fp_arc */ }
                ${'' /* (start 1.196952 43.364468) */ }
                ${'' /* (mid 0.313668 42.306108) */ }
                ${'' /* (end -0.00305 40.964467) */ }
                ${'' /* (stroke */ }
                    ${'' /* (width 0.2) */ }
                    ${'' /* (type default) */ }
                ${'' /* ) */ }
                ${'' /* (layer "Edge.Cuts") */ }
                ${'' /* (uuid "55b98080-46fa-4b09-9de7-5c1257d900fc") */ }
            ${'' /* ) */ }
            ${'' /* (fp_arc */ }
                ${'' /* (start 1.196952 43.364468) */ }
                ${'' /* (mid 0.313668 42.306108) */ }
                ${'' /* (end -0.00305 40.964467) */ }
                ${'' /* (stroke */ }
                    ${'' /* (width 0.2) */ }
                    ${'' /* (type default) */ }
                ${'' /* ) */ }
                ${'' /* (layer "Edge.Cuts") */ }
                ${'' /* (uuid "65d8df8b-f44d-4053-9d78-9745e132565f") */ }
            ${'' /* ) */ }
            ${'' /* (fp_arc */ }
                ${'' /* (start 1.196952 43.364468) */ }
                ${'' /* (mid 0.313668 42.306108) */ }
                ${'' /* (end -0.00305 40.964467) */ }
                ${'' /* (stroke */ }
                    ${'' /* (width 0.2) */ }
                    ${'' /* (type default) */ }
                ${'' /* ) */ }
                ${'' /* (layer "Edge.Cuts") */ }
                ${'' /* (uuid "e0631abd-570d-4fe6-9d94-406cd688a7ac") */ }
            ${'' /* ) */ }
            (fp_circle
                (center -103.00305 -47.035533)
                (end -102.00305 -47.035533)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "10addbc8-d8f8-4b20-a9f6-384a4ab1fa7f")
            )
            (fp_circle
                (center -103.00305 15.964467)
                (end -102.00305 15.964467)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "48813140-c6d8-4a21-916b-1490b841e995")
            )
            (fp_circle
                (center -15.00305 -37.535533)
                (end -14.00305 -37.535533)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "4aff819b-ff33-4801-93b2-6f122989d468")
            )
            (fp_circle
                (center -8.00305 36.464467)
                (end -7.00305 36.464467)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "2afb764f-b35b-4c30-82b5-3d55275e1580")
            )
            (fp_circle
                (center 7.99695 36.464467)
                (end 8.99695 36.464467)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "02fcb74f-2718-4af6-8586-5be28b3ae208")
            )
            (fp_circle
                (center 14.99695 -37.535533)
                (end 15.99695 -37.535533)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "47badbfe-0fcd-47bc-80ce-51176bed4f5d")
            )
            (fp_circle
                (center 102.99695 -47.035533)
                (end 103.99695 -47.035533)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "0126d07f-0d59-4c1d-9c5b-4d6aeef79bf8")
            )
            (fp_circle
                (center 102.99695 15.964467)
                (end 103.99695 15.964467)
                (stroke
                    (width 0.2)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "3d8ccc54-1836-4308-b9d9-ab7ac8014d2c")
            )
            (fp_curve
                (pts
                    (xy -131.00305 18.974174) (xy -131.00346 19.350957) (xy -130.93055 19.742159) (xy -130.779822 20.109751)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "3734d642-231a-408c-9346-165ffa27324d")
            )
            (fp_curve
                (pts
                    (xy -130.779822 20.109751) (xy -130.632633 20.470699) (xy -130.410707 20.807846) (xy -130.131268 21.088575)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "1c9857eb-0268-41e8-8923-944514b4fb1c")
            )
            (fp_curve
                (pts
                    (xy -130.352443 -48.528059) (xy -130.781411 -47.99312) (xy -131.006744 -47.307817) (xy -131.00305 -46.662488)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "1210ef76-4af1-4437-9038-d5b2c03d62e1")
            )
            (fp_curve
                (pts
                    (xy -130.131268 21.088575) (xy -129.852365 21.369836) (xy -129.516671 21.593954) (xy -129.15669 21.743491)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "5a77b518-fa16-4ea8-96d5-b3910b6af93e")
            )
            (fp_curve
                (pts
                    (xy -129.15669 21.743491) (xy -128.790087 21.89661) (xy -128.399368 21.972066) (xy -128.02259 21.974111)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "460f4eea-e943-4fa7-9e3f-be0ca30e0f6c")
            )
            (fp_curve
                (pts
                    (xy -128.682814 -49.584461) (xy -129.31216 -49.441848) (xy -129.92862 -49.067085) (xy -130.352443 -48.528059)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "27846c35-e8c3-4ef2-9c4e-99e3198413e6")
            )
            (fp_curve
                (pts
                    (xy -128.682814 -49.584461) (xy -77.833566 -61.41396) (xy -35.458959 -58.020493) (xy -1.558994 -39.404058)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "32fcccd3-6cf3-4264-aa84-589527b7802b")
            )
            (fp_curve
                (pts
                    (xy -128.02259 21.974111) (xy -71.453293 22.342581) (xy -36.001404 33.269755) (xy -21.666923 54.755633)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "6f5b067d-da13-4144-bacd-b56cdade610f")
            )
            (fp_curve
                (pts
                    (xy -21.666923 54.755633) (xy -21.450091 55.081499) (xy -21.158539 55.376445) (xy -20.811989 55.60231)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "64e9ba71-a2ea-47cc-b69c-e8b252b5c622")
            )
            (fp_curve
                (pts
                    (xy -20.811989 55.60231) (xy -20.473367 55.824037) (xy -20.082986 55.978725) (xy -19.677337 56.047703)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "953ac540-d3c1-447e-aa2d-8853737cf0dd")
            )
            (fp_curve
                (pts
                    (xy -19.677337 56.047703) (xy -19.271833 56.117528) (xy -18.852226 56.101442) (xy -18.45915 56.004922)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "09778ac8-90e4-43e1-80c4-e4ad2a675867")
            )
            (fp_curve
                (pts
                    (xy -18.45915 56.004922) (xy -18.057218 55.907135) (xy -17.684184 55.725913) (xy -17.371339 55.490683)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "0871ab15-458b-4aaf-8b0b-c307c58499f9")
            )
            (fp_curve
                (pts
                    (xy -1.558994 -39.404058) (xy -1.103691 -39.155884) (xy -0.696333 -38.770162) (xy -0.421174 -38.302192)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "0c40745b-0f1d-4333-9414-6d26a364cda8")
            )
            (fp_curve
                (pts
                    (xy -0.421174 -38.302192) (xy -0.143435 -37.83575) (xy -0.001421 -37.293032) (xy -0.00305 -36.774476)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "5a5396e4-2d16-49b2-80d9-190f25d30f1e")
            )
            (fp_curve
                (pts
                    (xy 0.415074 -38.302192) (xy 0.137335 -37.83575) (xy -0.004679 -37.293032) (xy -0.00305 -36.774476)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "00a57f9f-7933-4ca8-ac59-229cb972bf3f")
            )
            (fp_curve
                (pts
                    (xy 1.552894 -39.404058) (xy 1.097591 -39.155884) (xy 0.690233 -38.770162) (xy 0.415074 -38.302192)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "4e283a65-27af-4e7e-a848-82cd622e1887")
            )
            (fp_curve
                (pts
                    (xy 18.45305 56.004922) (xy 18.051118 55.907135) (xy 17.678084 55.725913) (xy 17.365239 55.490683)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "14abc0e0-3f12-474d-83a5-bf751e8ba87e")
            )
            (fp_curve
                (pts
                    (xy 19.671237 56.047703) (xy 19.265733 56.117528) (xy 18.846126 56.101442) (xy 18.45305 56.004922)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "0c4eac5b-d3e4-4020-890a-d4bc817c7fe5")
            )
            (fp_curve
                (pts
                    (xy 20.805889 55.60231) (xy 20.467267 55.824037) (xy 20.076886 55.978725) (xy 19.671237 56.047703)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "3e331637-3a81-44fa-9bef-029208bf034e")
            )
            (fp_curve
                (pts
                    (xy 21.660823 54.755633) (xy 21.443991 55.081499) (xy 21.152439 55.376445) (xy 20.805889 55.60231)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "03eca025-372d-4900-9111-a69b506e30e7")
            )
            (fp_curve
                (pts
                    (xy 128.01649 21.974111) (xy 71.447193 22.342581) (xy 35.995304 33.269755) (xy 21.660823 54.755633)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "1a826e10-3b81-4f52-aa99-87c96230a828")
            )
            (fp_curve
                (pts
                    (xy 128.676714 -49.584461) (xy 77.827466 -61.41396) (xy 35.452859 -58.020493) (xy 1.552894 -39.404058)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "263ae92f-8f6b-46aa-83c6-a1df90202e5f")
            )
            (fp_curve
                (pts
                    (xy 128.676714 -49.584461) (xy 129.30606 -49.441848) (xy 129.92252 -49.067085) (xy 130.346343 -48.528059)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "244f63dd-114a-4393-ba38-55f76b38d3fe")
            )
            (fp_curve
                (pts
                    (xy 129.15059 21.743491) (xy 128.783987 21.89661) (xy 128.393268 21.972066) (xy 128.01649 21.974111)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "296ef0b0-f813-4ddb-8c06-0079a5a60657")
            )
            (fp_curve
                (pts
                    (xy 130.125168 21.088575) (xy 129.846265 21.369836) (xy 129.510571 21.593954) (xy 129.15059 21.743491)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "18fa1efb-cea8-476b-96ad-7a0c0404abf8")
            )
            (fp_curve
                (pts
                    (xy 130.346343 -48.528059) (xy 130.775311 -47.99312) (xy 131.000644 -47.307817) (xy 130.99695 -46.662488)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "2ea0dc5a-aa18-4c8b-8b7c-d7c32df4d7c6")
            )
            (fp_curve
                (pts
                    (xy 130.773722 20.109751) (xy 130.626533 20.470699) (xy 130.404607 20.807846) (xy 130.125168 21.088575)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "1838d3c3-d903-4f65-8a90-32ccdcb2b4dc")
            )
            (fp_curve
                (pts
                    (xy 130.99695 18.974174) (xy 130.99736 19.350957) (xy 130.92445 19.742159) (xy 130.773722 20.109751)
                )
                (stroke
                    (width 0.2)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "2c46efd3-7700-4d77-afb2-d973ec936382")
            )
            (group ""
                (uuid "e998cfce-6098-4709-b8ae-584cef735692")
                (members "00a57f9f-7933-4ca8-ac59-229cb972bf3f" "0126d07f-0d59-4c1d-9c5b-4d6aeef79bf8"
                    "02f99032-2c8f-46ce-979c-d141ade61c05" "02fcb74f-2718-4af6-8586-5be28b3ae208"
                    "03eca025-372d-4900-9111-a69b506e30e7" "047d0516-8171-4c9e-99d5-ad526d5b3b09"
                    "04809f85-5244-440d-94cc-be4f6691e772" "0871ab15-458b-4aaf-8b0b-c307c58499f9"
                    "08daa35a-069b-425a-9eed-963e730699c0" "09778ac8-90e4-43e1-80c4-e4ad2a675867"
                    "0c40745b-0f1d-4333-9414-6d26a364cda8" "0c4eac5b-d3e4-4020-890a-d4bc817c7fe5"
                    "0e31337e-57cc-4105-ba53-e7075259bee2" "10addbc8-d8f8-4b20-a9f6-384a4ab1fa7f"
                    "1178b6ea-a872-4d38-8d5d-896d259df118" "1180b575-eedf-4170-a2c2-8ecc6c503024"
                    "1210ef76-4af1-4437-9038-d5b2c03d62e1" "14abc0e0-3f12-474d-83a5-bf751e8ba87e"
                    "1838d3c3-d903-4f65-8a90-32ccdcb2b4dc" "18fa1efb-cea8-476b-96ad-7a0c0404abf8"
                    "1a826e10-3b81-4f52-aa99-87c96230a828" "1c9857eb-0268-41e8-8923-944514b4fb1c"
                    "1e37556d-107e-40f1-9f1e-d668950fdcb5" "221b2eda-b704-4627-86dd-c4bfe2b6084b"
                    "2425db38-5444-458b-94a3-1112462fbcae" "244f63dd-114a-4393-ba38-55f76b38d3fe"
                    "263ae92f-8f6b-46aa-83c6-a1df90202e5f" "27846c35-e8c3-4ef2-9c4e-99e3198413e6"
                    "296ef0b0-f813-4ddb-8c06-0079a5a60657" "2afb764f-b35b-4c30-82b5-3d55275e1580"
                    "2ba6bbcc-1101-4146-8d47-17078a94b048" "2c3c46cf-898a-4165-8726-bbc124480410"
                    "2c46efd3-7700-4d77-afb2-d973ec936382" "2ea0dc5a-aa18-4c8b-8b7c-d7c32df4d7c6"
                    "31b162f3-e1e1-4687-8875-cb701ffc3a92" "329a43bb-8068-427f-a50d-8676c7059a50"
                    "32fcccd3-6cf3-4264-aa84-589527b7802b" "34aeb12a-0ffd-4c89-a069-5a4a92362595"
                    "3734d642-231a-408c-9346-165ffa27324d" "37a8bbb4-f45e-4ee2-b431-6b9b78bfe3d2"
                    "3867f6f7-d42a-4858-b070-53fbd5454ad2" "3a63e8ee-a958-4edc-a5b1-a117bb6c1b64"
                    "3d8ccc54-1836-4308-b9d9-ab7ac8014d2c" "3e331637-3a81-44fa-9bef-029208bf034e"
                    "3e935945-cb71-4238-973b-369b2554ace0" "3e9df429-b120-4e93-a35b-0ea566ee38f5"
                    "3ea40542-f901-4876-885a-2612f7134508" "401af299-8aa1-4d9e-8e93-17658839ae4c"
                    "423f8603-b5d2-43be-93a8-55003577ba8a" "42cbb37c-5fff-4b8f-b4e3-c9f34ab832b8"
                    "441bff78-a1b2-47bc-8fe6-b96d369210e1" "460f4eea-e943-4fa7-9e3f-be0ca30e0f6c"
                    "464a0936-35e2-4dd2-b4ed-fcfb6e090bb4" "475fb9a6-459c-430a-9723-56fc002281a4"
                    "478d3f2f-2f8a-4e3f-9fbb-06d2067adc6c" "47badbfe-0fcd-47bc-80ce-51176bed4f5d"
                    "48813140-c6d8-4a21-916b-1490b841e995" "4aa67485-7f90-4a62-ba39-4a63b603cc25"
                    "4af7224a-965d-4fbd-908b-6b784ea7c422" "4aff819b-ff33-4801-93b2-6f122989d468"
                    "4b518b02-723f-4ba0-a333-95249d49ecc1" "4dfd051d-bb2b-4449-883d-31aa874e8810"
                    "4e283a65-27af-4e7e-a848-82cd622e1887" "4ec24739-8011-4461-b9a2-ed03b75a5213"
                    "50d76346-ad8a-4407-ba5f-b304d82cc17d" "50f4d2c8-438b-4809-849d-7b16fa4d6b6a"
                    "514dd75d-782b-47ef-89d2-56c0eb698864" "54daad1c-885e-4677-b132-f5dcf7a18570"
                    "55793a19-aedc-4617-bcd6-48f85b83ab19" "55ace153-73af-4d49-869e-f4753044237c"
                    "55b98080-46fa-4b09-9de7-5c1257d900fc" "57e16530-80ca-4057-acba-87799c8ede9d"
                    "59d623b2-503c-434b-bdb2-86de0af5fa02" "5a5396e4-2d16-49b2-80d9-190f25d30f1e"
                    "5a77b518-fa16-4ea8-96d5-b3910b6af93e" "5fafdd6a-9ba6-4d4e-ae47-1046f8553118"
                    "6032918b-25d9-4df2-a102-2bc7f3f405a0" "64e9ba71-a2ea-47cc-b69c-e8b252b5c622"
                    "65d8df8b-f44d-4053-9d78-9745e132565f" "67372de3-4c3f-4c5b-b1b2-faf289b24fc3"
                    "6a4360d0-cee6-46e0-a860-607f33e576a8" "6a592d76-8afd-48d0-ad41-6bbab86bd90d"
                    "6b0733b5-ca5c-4b63-9d9e-ebe86b45d71a" "6b371f59-337d-4dd8-8671-57a4211715f8"
                    "6d030587-6dfe-4db2-b2b2-666fd7f10c28" "6e326e99-8e59-457f-ace3-c435d5fa34b4"
                    "6f5b067d-da13-4144-bacd-b56cdade610f" "705625dd-8fd7-4685-8c73-cd2ea52bd144"
                    "775f6fb6-caf3-4944-8f5e-54b796647470" "79e1f892-6563-4ef2-b489-53dfd580635d"
                    "7af1ef97-7c3d-416d-8df0-de47164287f1" "7bae9f71-15dc-4edf-931e-da78600f16bc"
                    "7c360997-6398-4b72-a3c7-89a5b7483eda" "7e605dd9-bc4f-4663-ae6a-f8d905cb2fbb"
                    "81542c6d-dba1-4faf-b7da-1f2eb183c871" "825e7d64-92e6-4b77-be73-7b144bf8cc80"
                    "82fab647-a810-4a63-aa97-8e311e103f8a" "844e6092-2a60-4fe6-8041-18540f66a7ae"
                    "849fa3e9-b5ab-4e08-8dfe-541c85daab64" "88a31f4a-b876-410e-ae81-d0f5361a78ac"
                    "88f7b8e7-79e4-4cfa-a1fe-e080872bfaae" "8d41ffbf-940a-4ab4-b921-96ff4ea90f04"
                    "904e7e4c-d74d-4bbf-bd5c-898dcb911e3c" "942ce2b2-c8a3-49ec-9353-f4b23d2d23be"
                    "953ac540-d3c1-447e-aa2d-8853737cf0dd" "96cbe251-b545-4a02-a53a-6dcaaa2c9eef"
                    "99e871fb-1fc6-4a51-80c2-0d3885ac10e8" "9c4cada1-fff1-41d0-8d77-3e47a9db6c0c"
                    "9e707147-c448-463c-b685-943d3af492d1" "9f905aa5-fe93-4ef6-9c41-b23ddfd99f9e"
                    "a0ca0dbc-98dc-4002-8db9-cdbdf666d68b" "a36fd623-7f93-4295-b991-de051e430dd0"
                    "a48d115f-192c-4a94-8a22-82f27c980c39" "a5795568-7c90-41a2-a3f1-f9a5bd6808dc"
                    "a5def23b-09ef-4f40-a2dd-d22a4f7a0bd1" "a6362ec0-8b56-4cef-a0da-6a093d95d981"
                    "a7d8001c-6314-444e-843a-d4ffc3855fc4" "aa56958d-7e4f-4311-b153-2aa9894e9493"
                    "ad5433f5-644e-4b7c-8297-7f1a6d3e2613" "adb32eee-311e-40b1-86a4-c805e43c4cbf"
                    "af804e03-6fda-40aa-8810-d6bb5537d364" "afc39457-048f-4ebb-8875-4cee3b11134e"
                    "b13ea95d-9190-48a8-86f3-06801a87e8f0" "b18e9357-3609-4175-95de-f88d97668ad2"
                    "b1cd4442-837b-48c6-a73e-f77792e51190" "b316b761-5cfb-437d-a820-66d8627959d5"
                    "b3a38ee1-62f3-470e-88b2-00e7b3094a38" "b41b36e4-d71e-4df4-a068-d48116e9d792"
                    "b82b109c-8a4d-4887-886c-f431b78fb3b2" "bd1f183f-94e9-42d2-acbf-da789f313a80"
                    "bdb38dce-3d3d-4113-8b3b-f23986f09713" "bea05b79-aab6-4174-bc18-638d5748b248"
                    "c0b7c05c-a0ee-4cf8-8081-f2b4a80c5f44" "c1a97021-66de-4668-b314-16ade81778c9"
                    "c25306ca-409a-4d79-90d8-bd2cbdc394ab" "c39f2c2c-d0e7-46e5-b32e-25ea727cc07f"
                    "c3b2f6c8-ca8c-49c4-966d-1cc8ae8c187b" "c560c3de-a1b9-4a4d-91d4-b11e681020d9"
                    "c7268141-8225-44e2-843d-99bb0d3487d9" "c76004db-0279-4581-b50d-c38c5be482a7"
                    "c8d8bfef-9c6e-41f6-9a11-83c4f939a47e" "cb3d414b-96d5-42e9-8dfc-0238cf791d88"
                    "ccc4a57d-f820-41bd-9ace-57386d4b4e9f" "ccf4ee8e-0431-4993-8bde-1c558ecfcd68"
                    "d070c5de-5c40-4695-8f8c-69240632265d" "d3260873-bf3c-4743-a8e7-19e79fd127f6"
                    "d515049c-8fc3-4ed2-b678-f45797967bf5" "d5334593-d391-48d0-9928-9887455118c0"
                    "d90a6f97-d6be-42d8-870e-2dafe6fff1f4" "da29a3e4-2720-4bea-a30c-6341fb1cfe38"
                    "da368192-8f25-4d63-8552-09bad63a0f58" "daf6b354-f131-4ee9-ac63-e5582b227187"
                    "db34cc6d-9e02-4f2d-a7f7-17cf1f7ae5d5" "dba05a8e-5a72-450d-96d5-1d2cd4a40bab"
                    "dc64191a-458a-43ce-9ad7-351bbdd3b907" "dd7d5a4e-70f2-4370-8708-0b5507a506f7"
                    "dd828630-28d0-4879-a74f-6bdefb9b33b2" "de180966-c7c8-4304-b364-8e10e43e4178"
                    "de4afaaa-a0b5-4adf-98a9-fb216cc5632b" "df878ce4-d3a6-4413-b4e0-c28213989a4d"
                    "e02c31e4-0b7d-441b-8e36-6e93489aa033" "e0631abd-570d-4fe6-9d94-406cd688a7ac"
                    "e06b1b01-1c58-420f-8c1e-dadd9bfe163a" "e0ab7c45-1708-4153-a746-29572e43eeaf"
                    "e0bc2f92-1325-4141-96be-49d224d42baf" "e39e26eb-0230-4182-9215-60a9015b7b28"
                    "e3ee1ab0-5245-4523-9e1e-bae02f0df46f" "e4c2096b-c639-49ba-8e0a-02d66d3dcae9"
                    "e633ecc7-a1b8-4bc2-a006-fcfca390e47f" "e99ac745-aec5-4879-b1d8-d2d5ae22e2de"
                    "ea264041-e44e-414b-8c3a-9000178a352d" "ea46b3e1-ccaf-42ab-ad09-c524ee006620"
                    "ea99e3c1-6c49-4793-87ec-cd22826abae1" "eb59e0db-971c-4385-943b-35473e6b5b10"
                    "ec1742f8-d4a5-45df-97f0-5c2e6c91fa07" "ed77a845-8e9d-4e3e-a2de-cc18b531281f"
                    "efccf21c-5470-4682-b213-e90c02975ee2" "f02f9fc3-f62d-4f9e-8831-259bf1109f1c"
                    "f03e5ac7-56ef-4d27-ba2e-d03cab6c58e3" "f11b5baa-6f43-4b19-b979-f37ccc78cf08"
                    "f3707103-4c20-4bd2-bbda-ccd22439bd20" "f5050195-957d-4257-9659-378267df440c"
                    "f59ff9c8-1751-403a-9bee-88ade7fb6ac3" "f5bf4cd0-3ef3-48bc-b1d4-3e06536286ef"
                    "f6790bd4-bf18-471f-904b-96d83a2839b7" "f7fca6ff-b54a-478c-af3f-58ddc904512c"
                    "f8d4a208-3e64-4e26-8d75-469624eecba1" "f94dbd44-f148-4399-b3df-408ee6d254f2"
                    "faeb5890-eaf1-40d7-a7b6-0ad3748633f6" "fb912484-4bc3-4ff9-8d66-a21ba450e254"
                    "fe319b66-7b58-4143-bd39-3e5df9302b6d" "ff36fa88-d5ec-4184-922a-9528bf389d6f"
                    "ff3efd2f-eb4d-44ff-b8c3-052a11136912"
                )
            )
            (embedded_fonts no)
        )`;
    }
}
