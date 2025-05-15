import { cn } from "@lasuhealth/lib/utils";
import { SunMedium } from "lucide-react";
import { PiCube, PiThermometerBold } from "react-icons/pi";
import { BiChart } from "react-icons/bi";

const healthMetrics = [
  {
    title: "Blood Pressure",
    value: "118/75 mm/hg",
    trend: "5%",
    remark: "Healthy",
    icon: <PiThermometerBold size={16} />,
  },
  {
    title: "Cholesterol",
    value: "164 mg/dl",
    trend: "5%",
    remark: "Healthy",
    icon: <PiCube size={16} />,
  },
  {
    title: "Glucose levels",
    value: "5.5 mmol/L",
    trend: "5%",
    remark: "Healthy",
    icon: <SunMedium size={16} />,
  },
];
export default function Profile() {
  return (
    <div className="grid md:grid-cols-[60%_40%] gap-4">
      <div className="space-y-12">
        <div className="grid md:grid-cols-3 gap-5">
          {healthMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-md p-4 flex items-center justify-between"
            >
              <div className="space-y-2">
                <p className="text-sm text-[#475367]">{metric.title}</p>
                <p className="font-semibold text-[#040404] text-sm">
                  {metric.value}
                </p>
                <div className="flex items-center gap-1">
                  <div
                    className={cn(
                      "rounded-full text-xs py-1 px-2 flex items-center gap-0.5",
                      metric.trend === "5%"
                        ? "bg-[#E7F6EC] text-[#04802E]"
                        : "bg-[#F04438]"
                    )}
                  >
                    <BiChart />
                    {metric.trend}
                  </div>
                  {metric.remark && (
                    <p className="text-xs text-[#04802E]">{metric.remark}</p>
                  )}
                </div>
              </div>
              <div className="rounded-full p-2 border border-[#E4E7EC]">
                {metric.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-sm rounded-md">
          <h6 className="text-sm font-semibold p-4">Your Profile</h6>
          <div className="grid border-t md:grid-cols-[35%_65%]">
            <div className="p-4 border-r">origolg</div>
          </div>
        </div>
      </div>
    </div>
  );
}
