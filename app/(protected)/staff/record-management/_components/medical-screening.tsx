import GoBack from "@/components/go-back";
import InputFillGapV1 from "@/components/input-fill-gap-v1";
import InputV1 from "@/components/input-v1";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Props = {
  onBack: () => void;
};

export default function MedicalScreening({ onBack }: Props) {
  const haematologyItems = [
    { hid: 1, types: ["Hb", "PCV", "WBC", "ESR", "MCHC", "RBC", "MCV"] },
    {
      hid: 2,
      types: ["P", "L", "M", "E", "B", "Retics", "Malaria Parasites"],
      prefix: "Diff",
    },
  ];

  const bloodFilmItems = [
    { blid: 1, types: ["Hb Genotype", "Blood Group", "Rh Factor"] },
    {
      blid: 2,
      types: ["Platelet Count", "Bleeding Time", "Clotting Time"],
    },
  ];

  const microbiologyItems = [
    "Gram Stain",
    "Widal Rxn",
    "H.V.S",
    "Nasal",
    "Culture & Sensitivity",
    "Sputum",
    "Urethral",
    "Ear",
    "Wound",
  ];

  const urinalysisTable = [
    {
      rowid: 1,
      key: "Colour",
      test: [
        "SP. Gr",
        "Acetone",
        "Nitrite",
        "Crystals",
        "Wbc/Hff",
        "Epith/Cells",
      ],
    },
    {
      rowid: 2,
      key: "Appearance",
      test: [
        "Albumin",
        "Urobilinogen",
        "Blood",
        "Yeast cells",
        "Rbc/Hff",
        "Casts",
      ],
    },
    {
      rowid: 3,
      key: "PH",
      test: [
        "Glucose",
        "Bilirubin",
        "Leukocytes",
        "Schistosomas",
        "Bacteria",
        "T. Vaginalis",
      ],
    },
  ];

  const parasitology = [
    "Stool Examination",
    "Routine Appearance",
    "Occult Blood",
    "Culture & Sensitivity",
    "HBSAg",
    "HCV",
    "RVS",
  ];

  const bioChemistry = [
    {
      bioch: "FBS",
      suffix: "Normal Value (3.91-6.20 mmol/L)",
    },
    {
      bioch: "RBS",
      suffix: "(6.20-10.0 mmol/L)",
    },
    {
      bioch: "Cholesterol",
      suffix: "(2.62-5.71 mmol/L)",
    },
  ];

  const miscallenousTable = {
    leftCol: [
      "Time Produced",
      "Time Collected",
      "Time Examined",
      "Colour",
      "Volume",
    ],

    rightCol: [
      "Viscosity",
      "Motility",
      "Count",
      "Morphology",
      "Abnormal Forms",
    ],
  };

  const screeningAction = [
    {
      action: "Laboratory Test",
      test: (
        <div className="space-y-4">
          <div className="px-2">
            <InputV1 label="Tentative Diagnosis" />
          </div>

          <Separator className="h-[0.5px] bg-[#010f01]/40 my-4" />

          <div className="space-y-2">
            <h2 className="font-semibold">Haematology</h2>
            {haematologyItems.map((item) => (
              <div key={item.hid}>
                {item.prefix && (
                  <div className="flex items-center">
                    <p className="min-w-[4rem]">{item.prefix}</p>
                    <div className="grid grid-cols-7 gap-4 items-center pl-4 pr-2 flex-1">
                      {item.types.map((type) => (
                        <InputFillGapV1
                          key={`${item.hid}-${type}`}
                          title={type}
                          className="w-full"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {!item.prefix && (
                  <div className="grid grid-cols-7 gap-4 items-center pl-20 pr-2">
                    {item.types.map((type) => (
                      <InputFillGapV1
                        key={`${item.hid}-${type}`}
                        title={type}
                        className="w-full"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Separator className="h-[0.5px] bg-[#010f01]/40 my-4" />

          <div className="space-y-4">
            <h2 className="font-semibold">Blood Film</h2>
            <div className="grid grid-cols-3 gap-4 items-center pl-20 pr-2">
              {bloodFilmItems.flatMap((item) =>
                item.types.map((type) => (
                  <InputFillGapV1
                    key={`${item.blid}-${type}`}
                    title={type}
                    className="w-full"
                  />
                ))
              )}
            </div>
          </div>

          <Separator className="h-[0.5px] bg-[#010f01]/40 my-4" />

          <div className="space-y-4">
            <div className="grid grid-cols-3">
              <h2 className="font-semibold">Urinalysis</h2>
              <div className="flex items-center gap-2">
                <Checkbox className="border-[#010f01] hover:border-[#328BE0] data-[state=checked]:border-[#328BE0]" />
                <Label>Routine</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox className="border-[#010f01] hover:border-[#328BE0] data-[state=checked]:border-[#328BE0]" />
                <Label>Culture & Sensitivity</Label>
              </div>
            </div>

            <div className="min-w-[600px] grid gap-y-4 border-t border-[#010f01] pt-4">
              {urinalysisTable.map((row) => (
                <div
                  key={row.rowid}
                  className="grid grid-cols-[150px_repeat(6,minmax(100px,1fr))] gap-4 items-center"
                >
                  <p className="font-medium">{row.key}</p>

                  {row.test.map((testName, idx) => (
                    <InputFillGapV1
                      key={`${row.rowid}-${idx}`}
                      title={testName}
                      className="flex-col"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Separator className="h-[0.5px] bg-[#010f01]/40 my-4" />

          <div className="space-y-4">
            <h2 className="font-semibold">Microbiology</h2>
            <div className="grid grid-cols-5 gap-4 items-center pl-20 pr-2">
              {microbiologyItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Checkbox className="border-[#010f01] hover:border-[#328BE0] data-[state=checked]:border-[#328BE0]" />
                  <Label>{item}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="h-[0.5px] bg-[#010f01]/40 my-4" />

          <div>
            <div className="grid grid-cols-2 border-b border-[#010f01] pb-2">
              <h2 className="font-semibold">Parasitology</h2>
              <h2 className="font-semibold">Bio Chemistry</h2>
            </div>
            <div className="grid grid-cols-2">
              <div className="space-y-2 p-2 border-r border-[#010f01]">
                {parasitology.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Checkbox className="border-[#010f01] hover:border-[#328BE0] data-[state=checked]:border-[#328BE0]" />
                    <InputFillGapV1 title={item} />
                  </div>
                ))}
              </div>
              <div className="space-y-2 p-2">
                {bioChemistry.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-2 items-center">
                    <InputFillGapV1 title={item.bioch} />
                    <p className="text-xs">{item.suffix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="h-[0.5px] bg-[#010f01]/40 my-4" />

          <div className="space-y-4">
            <h2 className="font-semibold">Miscallenous</h2>
            <div className="w-1/2">
              <InputFillGapV1 title="Pregnancy Test" />
              <InputFillGapV1 title="Seminal Test" />
            </div>
            <div className="grid grid-cols-2 border-t border-[#010f01]">
              <div className="space-y-2 p-2 border-r border-[#010f01]">
                {miscallenousTable.leftCol.map((item) => (
                  <InputFillGapV1 key={item} title={item} />
                ))}
              </div>
              <div className="space-y-2 p-2">
                {miscallenousTable.rightCol.map((item) => (
                  <InputFillGapV1 key={item} title={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 px-20 gap-20">
            <InputFillGapV1
              title="Name of Medical Doctor"
              className="flex flex-col"
              labelPosition="bottom"
            />
            <InputFillGapV1
              title="Name of Laboratory Scientist"
              className="flex flex-col"
              labelPosition="bottom"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center justify-start">
        <GoBack label="Back" onClick={onBack} showIcon />
      </div>
      <ScrollArea className="h-[80vh]">
        <div className="space-y-6">
          {screeningAction.map((act) => (
            <div key={act.action} className="space-y-4">
              <h3 className="font-semibold">{act.action}</h3>
              {act.test}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
