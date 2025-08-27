import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SunMedium } from "lucide-react";
import { PiCube, PiPrinter, PiThermometerBold } from "react-icons/pi";
import { BiChart } from "react-icons/bi";
import useUser from "@/hooks/useUser";
import { SmartAvatar } from "@/components/smart-avatar";
import DateFormatterToText from "@/components/date-formatter-to-text";

type ProfileValue = string | ReactNode;

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
  const { user } = useUser();

  const profile: Record<string, ProfileValue> | undefined = user && {
    Age: `${user.age} y/o`,
    "Date of Birth": <DateFormatterToText date={user.dob} display="short" />,
    Gender: user.gender,
    Height: "5'8 In",
    Weight: "88kg",
    "Medical Number": 12290197,
    Department: user.department,
    Faculty: user.faculty,
  };

  const otherInfo: Record<string, ProfileValue> | undefined = user && {
    Nationality: user.nationality,
    Religion: user.religion,
    "Ethnic Group": user.ethnic_group,
    Phone: user.phone,
    Email: user.email,
    "Marital Status": user.marital_status,
    Address: user.address,
  };

  const medicalInfo: Record<string, ProfileValue> | undefined = user && {
    "Blood Type": user?.blood_type || "",
    Allergies: user?.allergies || "None",
    "Chronic Conditions": user?.chronic_conditions || "None",
    Medications: user?.medications || "None",
  };

  return (
    <>
      <div className="grid md:grid-cols-[70%_30%] gap-4">
        <div className="space-y-4">
          <div className="bg-white shadow-sm rounded-md h-fit">
            <h6 className="text-sm font-semibold p-4">Your Profile</h6>
            <div className="grid border-t md:grid-cols-[35%_65%]">
              <div className="p-4 border-r space-y-1">
                <SmartAvatar
                  data={user}
                  src={user?.passport}
                  getKey={(u) =>
                    u.email || u.id || `${u.lastname}${u.firstname}`
                  }
                  getInitialsName={(u) => `${u.lastname} ${u.firstname}`}
                  getName={(u) =>
                    `${u.lastname} ${u.firstname} ${u.middlename}`
                  }
                  nameClassName="text-[#101928] font-bold"
                  showName
                  avatarSizeClassName="w-16 h-16"
                  className="grid"
                />
                <p className="text-[#475367] text-sm">
                  Matric No: {user?.matric_no}
                </p>
              </div>

              <div className="grid grid-cols-4 p-4 gap-2">
                {profile &&
                  Object.entries(profile).map(([key, value], index) => (
                    <div
                      key={index}
                      className={cn(
                        "grid space-y-1"
                        // key === "Unique Hospital Number" && "col-span-2"
                      )}
                    >
                      <span className="text-[#475367] text-xs">{key}</span>
                      <span className="text-[#101928] font-semibold text-sm">
                        {typeof value === "string" ? value : value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {healthMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white shadow-sm rounded-md h-fit p-4 flex items-center justify-between"
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
                          : "bg-[#FFECE5] text-[#AD3307]"
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
        </div>

        <div className="bg-white shadow-sm rounded-md">
          <h6 className="text-sm font-semibold p-4">
            Medical screening exercise
          </h6>
          <div className="border-t p-4 space-y-4">
            <div className="flex flex-col items-center justify-center border-16 border-[#229602] text-[#040404] rounded-full w-40 h-40 mx-auto">
              <span className="text-3xl font-bold">100%</span>
              <p>Completion</p>
            </div>

            <div className="w-full bg-black text-white p-2 flex items-center justify-center gap-2 rounded-md">
              <span>Download Fitness Certificate</span>
              <PiPrinter />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white shadow-sm rounded-md h-fit">
          <h6 className="text-sm font-semibold p-4">Medical Information</h6>
          <div className="grid grid-cols-4 p-4 gap-2">
            {medicalInfo &&
              Object.entries(medicalInfo).map(([key, value], index) => (
                <div key={index} className={cn("grid space-y-1")}>
                  <span className="text-[#475367] text-xs">{key}</span>
                  <span className="text-[#101928] font-semibold text-sm">
                    {typeof value === "string" ? value : value}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-md h-fit">
          <h6 className="text-sm font-semibold p-4">Other Information</h6>
          <div className="grid grid-cols-4 p-4 gap-2">
            {otherInfo &&
              Object.entries(otherInfo).map(([key, value], index) => (
                <div
                  key={index}
                  className={cn(
                    "grid space-y-1",
                    key === "Email" && "col-span-3 md:col-span-2",
                    key === "Address" && "col-span-3"
                  )}
                >
                  <span className="text-[#475367] text-xs">{key}</span>
                  <span className="text-[#101928] font-semibold text-sm">
                    {typeof value === "string" ? value : value}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
