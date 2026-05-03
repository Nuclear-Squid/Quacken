module.exports = {
    params: {
        designator: 'O',
    },

    body: p => {
        return `(footprint "Outline"
            (layer "F.Cu")
            (uuid "ab6ca216-852d-4199-8647-3d10f6324e19")
            (at 219.689154 95.796631)
            (property "Reference" ""
                (at 0 0 0)
                (layer "F.SilkS")
                (uuid "157a2848-4b69-4230-b3ca-ffa236127c0e")
                (effects
                    (font
                        (size 1.27 1.27)
                        (thickness 0.15)
                    )
                )
            )
            (property "Value" ""
                (at 0 0 0)
                (layer "F.Fab")
                (uuid "83106271-92b1-4299-be94-74fa8082a361")
                (effects
                    (font
                        (size 1.27 1.27)
                        (thickness 0.15)
                    )
                )
            )
            (property "Datasheet" ""
                (at 0 0 0)
                (layer "F.Fab")
                (hide yes)
                (uuid "c55aeb22-cba7-44fe-9de6-59f2c661e08d")
                (effects
                    (font
                        (size 1.27 1.27)
                        (thickness 0.15)
                    )
                )
            )
            (property "Description" ""
                (at 0 0 0)
                (layer "F.Fab")
                (hide yes)
                (uuid "ecd546a6-2051-446d-a987-715c0585a5ad")
                (effects
                    (font
                        (size 1.27 1.27)
                        (thickness 0.15)
                    )
                )
            )
            (attr through_hole)
            (fp_line
                (start -131.00305 -43.662488)
                (end -131.00305 18.974174)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "cca21835-a991-4f89-8cc6-56c3763344d1")
            )
            (fp_line
                (start -1.203049 43.364466)
                (end -17.371339 55.490683)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "fc8276aa-4df1-4302-9a19-188334931630")
            )
            (fp_line
                (start 1.196952 43.364468)
                (end 17.365239 55.490683)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "8dadd554-ab85-41a8-b028-d3bf72696348")
            )
            (fp_line
                (start 130.99695 -43.662488)
                (end 130.99695 18.974174)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "bbbce1ff-db2e-4373-aa81-e007266d4cba")
            )
            ${'' /* (fp_arc */ }
                ${'' /* (start -0.00305 40.964467) */ }
                ${'' /* (mid -0.319768 42.306108) */ }
                ${'' /* (end -1.203049 43.364466) */ }
                ${'' /* (stroke */ }
                    ${'' /* (width 0.02) */ }
                    ${'' /* (type default) */ }
                ${'' /* ) */ }
                ${'' /* (layer "Edge.Cuts") */ }
                ${'' /* (uuid "6d83005a-a98b-4313-837f-833ba5fd11d6") */ }
            ${'' /* ) */ }
            ${'' /* (fp_arc */ }
                ${'' /* (start 1.196952 43.364468) */ }
                ${'' /* (mid 0.313668 42.306108) */ }
                ${'' /* (end -0.00305 40.964467) */ }
                ${'' /* (stroke */ }
                    ${'' /* (width 0.02) */ }
                    ${'' /* (type default) */ }
                ${'' /* ) */ }
                ${'' /* (layer "Edge.Cuts") */ }
                ${'' /* (uuid "7d9dc7eb-43ed-4710-a7df-ed7205cc2931") */ }
            ${'' /* ) */ }
            (fp_circle
                (center -103.00305 -44.035533)
                (end -102.00305 -44.035533)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "fbc7f235-960c-4cdf-be32-d8e002c673a0")
            )
            (fp_circle
                (center -103.00305 15.964467)
                (end -102.00305 15.964467)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "f63e232f-2883-4515-b459-32c523fa9b41")
            )
            (fp_circle
                (center -8.00305 -32.535533)
                (end -7.00305 -32.535533)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "da6180cf-e61a-465a-9cad-d6fb810deced")
            )
            (fp_circle
                (center -8.00305 36.464467)
                (end -7.00305 36.464467)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "c590aa32-eba1-4e84-bd69-27eb5153618c")
            )
            (fp_circle
                (center 7.99695 -32.535533)
                (end 8.99695 -32.535533)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "efade64d-d856-49d9-9f73-bb769cc9f088")
            )
            (fp_circle
                (center 7.99695 36.464467)
                (end 8.99695 36.464467)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "d17a3813-240b-4911-bed7-90b7b020f87f")
            )
            (fp_circle
                (center 102.99695 -44.035533)
                (end 103.99695 -44.035533)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "edb02219-1af6-4a7a-99dc-8714e5e9aea8")
            )
            (fp_circle
                (center 102.99695 15.964467)
                (end 103.99695 15.964467)
                (stroke
                    (width 0.02)
                    (type default)
                )
                (fill no)
                (layer "Edge.Cuts")
                (uuid "c94b0e96-6543-4ad0-a74a-325809e90a42")
            )
            (fp_curve
                (pts
                    (xy -131.00305 18.974174) (xy -131.00346 19.350957) (xy -130.93055 19.742159) (xy -130.779822 20.109751)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "a721020a-c878-4145-b1d4-ccb3aef69a57")
            )
            (fp_curve
                (pts
                    (xy -130.779822 20.109751) (xy -130.632633 20.470699) (xy -130.410707 20.807846) (xy -130.131268 21.088575)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "e960f68a-510b-47a5-bde5-c4cb2e1722a2")
            )
            (fp_curve
                (pts
                    (xy -130.352443 -45.528059) (xy -130.781411 -44.99312) (xy -131.006744 -44.307817) (xy -131.00305 -43.662488)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "c88bc4bd-aa74-4f57-a34d-05ab1d341212")
            )
            (fp_curve
                (pts
                    (xy -130.131268 21.088575) (xy -129.852365 21.369836) (xy -129.516671 21.593954) (xy -129.15669 21.743491)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "d0a32706-dbdc-4307-9047-87d98012abea")
            )
            (fp_curve
                (pts
                    (xy -129.15669 21.743491) (xy -128.790087 21.89661) (xy -128.399368 21.972066) (xy -128.02259 21.974111)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "f0f9de40-817a-4c31-8182-e8f70fe17c29")
            )
            (fp_curve
                (pts
                    (xy -128.682814 -46.584461) (xy -129.31216 -46.441848) (xy -129.92862 -46.067085) (xy -130.352443 -45.528059)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "fb1fe283-c84d-482b-8320-9ab3cb300469")
            )
            (fp_curve
                (pts
                    (xy -128.682814 -46.584461) (xy -77.833566 -58.41396) (xy -35.458959 -55.020493) (xy -1.558994 -36.404058)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "d95a76cc-1cfc-4792-8bb7-8be2daf24ba1")
            )
            (fp_curve
                (pts
                    (xy -128.02259 21.974111) (xy -71.453293 22.342581) (xy -36.001404 33.269755) (xy -21.666923 54.755633)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "d1b37656-213b-43a8-bba2-bfc9ad2ca578")
            )
            (fp_curve
                (pts
                    (xy -21.666923 54.755633) (xy -21.450091 55.081499) (xy -21.158539 55.376445) (xy -20.811989 55.60231)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "a936765d-22c4-44ea-8073-79347453722b")
            )
            (fp_curve
                (pts
                    (xy -20.811989 55.60231) (xy -20.473367 55.824037) (xy -20.082986 55.978725) (xy -19.677337 56.047703)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "fd72982c-3323-4192-923f-86dd5135af61")
            )
            (fp_curve
                (pts
                    (xy -19.677337 56.047703) (xy -19.271833 56.117528) (xy -18.852226 56.101442) (xy -18.45915 56.004922)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "9e1502d0-5429-4bf5-a824-df4814fc9a2a")
            )
            (fp_curve
                (pts
                    (xy -18.45915 56.004922) (xy -18.057218 55.907135) (xy -17.684184 55.725913) (xy -17.371339 55.490683)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "bbf13276-aa81-4339-a929-f023aea7ca48")
            )
            (fp_curve
                (pts
                    (xy -1.558994 -36.404058) (xy -1.103681 -36.155878) (xy -0.696333 -35.77016) (xy -0.421174 -35.302192)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "d56abec5-1377-4067-88ff-c656c5a19825")
            )
            (fp_curve
                (pts
                    (xy -0.421174 -35.302192) (xy -0.143433 -34.835749) (xy -0.00142 -34.29302) (xy -0.00305 -33.774476)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "d9653316-7644-4676-83ac-17c140508dd8")
            )
            (fp_curve
                (pts
                    (xy 0.415074 -35.302192) (xy 0.137333 -34.835749) (xy -0.00468 -34.29302) (xy -0.00305 -33.774476)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "ffddd56a-bda3-4d97-be1f-fe0755933eac")
            )
            (fp_curve
                (pts
                    (xy 1.552894 -36.404058) (xy 1.097581 -36.155878) (xy 0.690233 -35.77016) (xy 0.415074 -35.302192)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "d8fd70f8-a43f-4577-afd2-323613922fbb")
            )
            (fp_curve
                (pts
                    (xy 18.45305 56.004922) (xy 18.051118 55.907135) (xy 17.678084 55.725913) (xy 17.365239 55.490683)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "b14211ac-16a5-4d5b-a998-690dad6f45bd")
            )
            (fp_curve
                (pts
                    (xy 19.671237 56.047703) (xy 19.265733 56.117528) (xy 18.846126 56.101442) (xy 18.45305 56.004922)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "dc678889-b221-451c-b1a4-5e01cf6f4b99")
            )
            (fp_curve
                (pts
                    (xy 20.805889 55.60231) (xy 20.467267 55.824037) (xy 20.076886 55.978725) (xy 19.671237 56.047703)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "da27c963-04d8-46ab-b530-8f6908d33764")
            )
            (fp_curve
                (pts
                    (xy 21.660823 54.755633) (xy 21.443991 55.081499) (xy 21.152439 55.376445) (xy 20.805889 55.60231)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "c0928a1e-c43b-4ea9-a66b-c4a1c5d1806a")
            )
            (fp_curve
                (pts
                    (xy 128.01649 21.974111) (xy 71.447193 22.342581) (xy 35.995304 33.269755) (xy 21.660823 54.755633)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "92b10f1b-3447-4e15-aec3-b206f46104b6")
            )
            (fp_curve
                (pts
                    (xy 128.676714 -46.584461) (xy 77.827466 -58.41396) (xy 35.452859 -55.020493) (xy 1.552894 -36.404058)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "c2f862ce-bc86-4e8d-a7de-f0603707ed79")
            )
            (fp_curve
                (pts
                    (xy 128.676714 -46.584461) (xy 129.30606 -46.441848) (xy 129.92252 -46.067085) (xy 130.346343 -45.528059)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "89c12b39-ffac-445c-a550-7bb9290f8f4e")
            )
            (fp_curve
                (pts
                    (xy 129.15059 21.743491) (xy 128.783987 21.89661) (xy 128.393268 21.972066) (xy 128.01649 21.974111)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "ff2ca09f-ea41-4d79-9fcc-c751fa222590")
            )
            (fp_curve
                (pts
                    (xy 130.125168 21.088575) (xy 129.846265 21.369836) (xy 129.510571 21.593954) (xy 129.15059 21.743491)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "abc5f754-b43f-47ad-a935-ffa0a5a592ff")
            )
            (fp_curve
                (pts
                    (xy 130.346343 -45.528059) (xy 130.775311 -44.99312) (xy 131.000644 -44.307817) (xy 130.99695 -43.662488)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "5a3fbe30-a805-48b7-9724-83d6d078cc22")
            )
            (fp_curve
                (pts
                    (xy 130.773722 20.109751) (xy 130.626533 20.470699) (xy 130.404607 20.807846) (xy 130.125168 21.088575)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "aa46edcb-58f0-440a-9385-ef360bba7638")
            )
            (fp_curve
                (pts
                    (xy 130.99695 18.974174) (xy 130.99736 19.350957) (xy 130.92445 19.742159) (xy 130.773722 20.109751)
                )
                (stroke
                    (width 0.02)
                    (type default)
                )
                (layer "Edge.Cuts")
                (uuid "f5437e05-a629-46e2-9453-a204baaf9578")
            )
            (group ""
                (uuid "914fdb7a-6791-427a-bee0-cefe45386eaf")
                (members "01339297-ffb0-4f6c-a53c-496e8e9d6558" "0338c7da-e062-4683-a494-a4edf63c96ea"
                    "03692c13-59ea-483f-874e-36382ffd31d7" "03b45c0c-90d9-45cb-9cdc-a600bec21285"
                    "063635bd-4868-4f7c-9630-7b3182f96347" "0950f74d-8180-4939-83a0-3962ad6a6690"
                    "0b019f15-d60f-475b-b523-5a9d733c5e89" "0be90c4c-a7bc-4f2c-afe2-377a8f97edc5"
                    "0ebf3f04-ad34-41fc-b092-62cce3476206" "116ae4c7-76b5-41ed-834f-d9c293ab98b8"
                    "11d947c7-020d-43a3-8051-c5cfc8f45c26" "11df8166-2d84-4513-9c60-ce2ba9e40858"
                    "177cfeef-138b-4e93-a044-75f6b0e21732" "1b0af6c2-d459-4ba4-946c-9cecc8472847"
                    "1beed853-f602-4c44-b4b0-26951f3fff7d" "1f6a347d-3c4c-41ed-b62c-06b2aef335b3"
                    "24c98daa-a135-4c57-bfc4-9f3232363563" "264d262a-2a12-48f9-9a6e-e5fd1ec6def4"
                    "27b3be80-8779-4712-958e-967064fcbf79" "2901e2ae-d6cc-42ea-be4e-cd30aca70896"
                    "29dce800-2a69-46bd-a4d2-64c75f2d8259" "29f9e737-aae9-40b4-9b90-0a6c524636be"
                    "2c73584d-830f-43bd-9334-bc7215b4e0e9" "2d45aad9-b0ca-4261-9c3a-4112a18fd27d"
                    "2d9a3661-b697-4151-9d19-03b6b5a9e6c0" "309bb572-e1da-49dd-8dc6-87dfbc343070"
                    "340eed3e-d9de-4f3d-b19b-ff09f86df04f" "36756fdc-abb7-4b79-81f8-fce5ae24a82f"
                    "36c963a1-2f24-4e74-bc83-53b8126bce0b" "38b05cd1-0e88-42e2-ae75-014587b88084"
                    "399a2103-496b-4375-b38a-78d64c3d0093" "39afff2e-893f-4ba9-9720-030f1fe7e35a"
                    "4060a4bc-13c4-42a0-840b-635141a5e82a" "421d5e78-9dbc-403d-b2f9-6c97ad113611"
                    "425f205a-9d3e-403f-a40c-9b3c0581c766" "42da4414-6109-4797-a139-7ade664e82da"
                    "43c1aed4-f5a1-42ee-9308-ff43cd823707" "442ffda0-0f01-4388-8fe9-cae7f7121560"
                    "4660f057-0f5d-44de-be32-4d0ede3e3720" "46c731e4-0ea3-4cda-93e9-b2d38b6190f9"
                    "48dfb0f5-0913-4292-8d33-5505e577f316" "48f6d41a-8c4f-49e1-8b3d-433176454763"
                    "4965e229-024f-42b0-b753-1ed54d611680" "4b2090fe-2f64-4650-8759-80139d48ce19"
                    "4c2b89a9-4f9c-4b49-9a79-f098d14ffbfe" "4d5c8c02-f1b5-43af-9c5a-fb5549cfd9f0"
                    "4d8b5d8c-cc6b-41a0-bb28-bebee64e5fa5" "4edb3a71-4347-4bc6-a21b-dbd71a0e7c89"
                    "4fea4e72-2576-46ce-a964-ffd65a03a216" "5073510e-9dcf-47a8-b768-cad314c15d1e"
                    "512bb220-75b1-41cc-bb2c-48f581d20af2" "51904e7c-2157-4ef9-83be-847c2314326e"
                    "51c5a84b-8bfc-4ebf-88e2-295b836fbefb" "5741e53f-f630-464a-8591-85bf824887c3"
                    "57879521-c278-47a4-b0be-e782f9505afb" "58959f66-f5ab-45a1-81fb-b7caeeca17a8"
                    "5a275d5c-bab0-4b27-a768-61b46d23cf44" "5a3fbe30-a805-48b7-9724-83d6d078cc22"
                    "60433375-5139-45b1-80bb-4510de2914c8" "6178fb7f-dc13-4150-82db-806e7eec3ad3"
                    "617aa481-9b0d-4fcb-aaf2-b30e5461806f" "629f3e15-1b31-4374-8866-92f89ef73766"
                    "631b4dd6-4087-41e0-8276-05ed64ef8bd8" "659f13d9-b6a9-408a-89a6-b0ea17947e0f"
                    "6d83005a-a98b-4313-837f-833ba5fd11d6" "75229eec-c980-4481-9f2f-b0d7380d2d03"
                    "75cf39b4-085f-45cd-ae3e-cd262832ee00" "7a54e8ce-7740-40a7-8a58-87c480357b8c"
                    "7bad0ccf-b792-435f-b021-9c9f70b3da7a" "7c5872e7-2ec9-42f7-9984-ff82f4b345bb"
                    "7d9dc7eb-43ed-4710-a7df-ed7205cc2931" "7f7106cd-64d2-476f-bf96-8d9cc69a5c27"
                    "80eed277-2bf7-4490-a903-610be5b96d30" "81d81438-b027-4a70-9cb1-011718e848d9"
                    "833bb129-b094-41d5-b4c7-a8cc5a249641" "83b6ce06-7a8b-495d-8078-a9cd4e9fdf76"
                    "84d02f2c-996c-4714-a673-e427837c543f" "84e2e420-d235-4186-8b20-10a78541e01c"
                    "856f3d26-3849-45f3-9659-91f626c77e8a" "85d54829-d13e-425c-8245-16af11de62af"
                    "87a976a9-58e8-4de7-a1e4-273b3d9cd1fb" "87cb926e-0951-4951-ae56-88698520185b"
                    "8980d98a-fe1e-4b43-af42-8e7c392b8d41" "89c12b39-ffac-445c-a550-7bb9290f8f4e"
                    "8ad12da7-4dc6-4b06-ba45-acf22d56ae13" "8c9d4527-0413-4184-a381-e18689dd85f1"
                    "8cc0e2b2-15ac-456f-8cf1-6d4d85a0ddee" "8d6e30e4-0d61-48dc-8c12-5b15167ae27c"
                    "8dadd554-ab85-41a8-b028-d3bf72696348" "8f7b55aa-615f-4e13-9adf-244e5d1c02eb"
                    "8fc64acf-b969-43bd-86b9-1d5e95103f89" "903c92a4-c6e3-44d6-ae4e-1d2841efca8f"
                    "9089fe67-a409-4cae-97d3-a91842a95704" "9091b19c-877e-4154-a37d-b8c5972721d3"
                    "92b10f1b-3447-4e15-aec3-b206f46104b6" "933b825c-9552-4eb8-98ef-c6daa33277f2"
                    "9376b4c7-e370-4503-a7a5-fb72a5ee38e3" "9504a315-c6b2-41ff-b87d-6ffd7d2fad8a"
                    "9635be4d-9e4d-4caf-9407-5b607db4fc5d" "98962262-4164-4c5c-9725-8d8aaef2a37f"
                    "9a037334-05c5-41ff-87ba-10bfb05ff927" "9cc514ab-7b1c-4bff-93f4-89f6cad47b37"
                    "9d0de785-a286-4f97-ba61-8861000d5276" "9e1502d0-5429-4bf5-a824-df4814fc9a2a"
                    "9e7cfd26-d364-42a5-ab9c-b0f11e5e9089" "a1dcce6c-47a5-4247-b680-6e15a8055b07"
                    "a23aeae5-9cb7-4f5c-a816-5f79ce973da7" "a438ba24-49fa-4d92-98aa-1f36c2c0f0a9"
                    "a721020a-c878-4145-b1d4-ccb3aef69a57" "a7cfbf1a-5b9d-493d-8fd1-7eaafc52d2c5"
                    "a7f5234e-39b5-4a3d-9656-75bccf7d1062" "a936765d-22c4-44ea-8073-79347453722b"
                    "aa1637eb-98ee-470a-9bcd-cd00d5d9757b" "aa46edcb-58f0-440a-9385-ef360bba7638"
                    "abc5f754-b43f-47ad-a935-ffa0a5a592ff" "abc8b6e9-5417-4efd-a703-3a288b164cce"
                    "acd8c9ee-97e2-4800-91ca-b461843a26c3" "ad456fac-e03a-4fc2-9f4e-eae2d51709bd"
                    "ae2cba5f-9f49-4416-b5a2-44498fe14ae8" "ae409162-352d-4258-9040-191653c2d2be"
                    "b04cab1d-66d0-48a3-a9fc-12cc706d9111" "b14211ac-16a5-4d5b-a998-690dad6f45bd"
                    "b2a593f6-6a95-4db5-a337-87da12f55265" "b7ae9e2d-953f-4bb0-8f51-2100fca07084"
                    "bbbce1ff-db2e-4373-aa81-e007266d4cba" "bbf13276-aa81-4339-a929-f023aea7ca48"
                    "bddb46ed-f8e5-4190-9563-5cba9e493eb4" "be008671-6973-43e9-b19b-49f0bcd701df"
                    "c0928a1e-c43b-4ea9-a66b-c4a1c5d1806a" "c2f862ce-bc86-4e8d-a7de-f0603707ed79"
                    "c371bb56-0e09-4336-ae92-3c17f1475d77" "c590aa32-eba1-4e84-bd69-27eb5153618c"
                    "c88bc4bd-aa74-4f57-a34d-05ab1d341212" "c8d483af-3cee-4291-a2c8-015367049a31"
                    "c94b0e96-6543-4ad0-a74a-325809e90a42" "cca21835-a991-4f89-8cc6-56c3763344d1"
                    "d0a32706-dbdc-4307-9047-87d98012abea" "d0e451e2-51f8-472c-9930-a475821f5375"
                    "d150a7a6-3f21-4630-b0cd-786ad3cda7f3" "d17a3813-240b-4911-bed7-90b7b020f87f"
                    "d1b37656-213b-43a8-bba2-bfc9ad2ca578" "d56abec5-1377-4067-88ff-c656c5a19825"
                    "d67dfbaf-60da-4322-8a36-092b00203fdc" "d8fd70f8-a43f-4577-afd2-323613922fbb"
                    "d95a76cc-1cfc-4792-8bb7-8be2daf24ba1" "d9653316-7644-4676-83ac-17c140508dd8"
                    "da1f0b44-e475-428e-b376-cedf10c6d418" "da27c963-04d8-46ab-b530-8f6908d33764"
                    "da6180cf-e61a-465a-9cad-d6fb810deced" "db8e9e6e-d588-456c-bc7f-1ea901b75ef7"
                    "dc678889-b221-451c-b1a4-5e01cf6f4b99" "e06f646a-b531-4740-8df9-e384a5958a72"
                    "e960f68a-510b-47a5-bde5-c4cb2e1722a2" "e9da0408-8be2-477f-b63f-1566caebebb2"
                    "ebcfd675-6cff-43af-9839-25d857809f84" "edb02219-1af6-4a7a-99dc-8714e5e9aea8"
                    "efade64d-d856-49d9-9f73-bb769cc9f088" "f0f9de40-817a-4c31-8182-e8f70fe17c29"
                    "f5176c0b-cc59-457c-8021-005257142471" "f5437e05-a629-46e2-9453-a204baaf9578"
                    "f63e232f-2883-4515-b459-32c523fa9b41" "fae3d759-9fde-4e83-97ad-cd874d3b8af9"
                    "fb1fe283-c84d-482b-8320-9ab3cb300469" "fbc7f235-960c-4cdf-be32-d8e002c673a0"
                    "fc8276aa-4df1-4302-9a19-188334931630" "fd72982c-3323-4192-923f-86dd5135af61"
                    "ff2ca09f-ea41-4d79-9fcc-c751fa222590" "ffddd56a-bda3-4d97-be1f-fe0755933eac"
                )
            )
            (embedded_fonts no)
        )`;
    }
}
