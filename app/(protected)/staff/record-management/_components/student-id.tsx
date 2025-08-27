// StudentDetails.tsx - Main component with navigation
import DateFormatterToText from "@/components/date-formatter-to-text";
import GoBack from "@/components/go-back";
import LoadingSkeleton from "@/components/loaders/loading-skeleton";
import { SmartAvatar } from "@/components/smart-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sentenceCase } from "@/lib/text";
import { fetcher } from "@/swr";
import { ChevronRight } from "lucide-react";
import useSWR from "swr";
import MedicalScreening from "./medical-screening";
import { useUrlState } from "@/hooks/useUrlState";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { IoFitnessOutline } from "react-icons/io5";
import TitleCatption from "@/components/title-caption";
import { CgProfile } from "react-icons/cg";
import StudentProfile from "./profile";
import StudentAppointments from "./appointments";
import StudentMedicalRecords from "./medical-records";

type Props = {
  id: string;
  onBack: () => void;
};

type ActiveView = "profile" | "appointments" | "medical-records";

export default function StudentDetails({ id, onBack }: Props) {
  const { data, isLoading } = useSWR(`/students/${id}`, fetcher);
  const student = data?.data || {};
  const legalName = `${student?.lastname || ""} ${
    student?.firstname || ""
  }`.trim();
  const fullName = `${student?.lastname || ""} ${student?.firstname || ""} ${
    student?.middlename || ""
  }`.trim();
  const fullNameForUrl = fullName.replaceAll(" ", "_");

  const [openScreening, setOpenScreening] = useUrlState<string | null>(
    `screening_for`,
    null
  );
  const [activeView, setActiveView] = useUrlState<ActiveView>(
    "view",
    "profile"
  );

  if (openScreening) {
    return <MedicalScreening onBack={() => setOpenScreening(null)} />;
  }

  const actions = [
    {
      action: "View Profile",
      icon: CgProfile,
      view: "profile" as ActiveView,
    },
    {
      action: "View Appointments",
      description: "",
      icon: FaRegCalendarPlus,
      view: "appointments" as ActiveView,
    },
    {
      action: "View Medical Records",
      description: "",
      icon: IoFitnessOutline,
      view: "medical-records" as ActiveView,
    },
  ];

  const renderContent = () => {
    switch (activeView) {
      case "appointments":
        return <StudentAppointments student={student} isLoading={isLoading} />;
      case "medical-records":
        return (
          <StudentMedicalRecords student={student} isLoading={isLoading} />
        );
      case "profile":
      default:
        return <StudentProfile student={student} isLoading={isLoading} />;
    }
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center justify-start">
        <GoBack label="Back" onClick={onBack} showIcon />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-[#1363DF]">Record Management</p>
          <ChevronRight color="#1363DF" />
          <p>{fullName}</p>
        </div>

        <Button
          onClick={() => setOpenScreening(fullNameForUrl)}
          variant="default-no-hover"
          className="bg-black flex items-center justify-center gap-2 rounded-md"
        >
          <span>Start Medical screening exercise</span>
          <ChevronRight />
        </Button>
      </div>

      <div className="grid md:grid-cols-[30%_68%] gap-4">
        <div className="space-y-3.5">
          <Card className="h-fit bg-black text-white p-4 flex flex-col items-center space-y-4 relative">
            <SmartAvatar
              data={student}
              src={student.passport}
              getKey={(s) => s.email || s.id || legalName}
              getInitialsName={() => legalName}
              avatarSizeClassName="w-16 h-16"
              downContent={
                isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <span className="text-xl font-semibold">{fullName}</span>
                    <span>Matric No: {student.matric_no}</span>
                  </div>
                )
              }
              className="flex-col items-center"
            />
          </Card>

          <div className="bg-white shadow-sm rounded-md h-fit">
            <h6 className="text-sm font-semibold p-4">Quick Actions</h6>
            <div className="border-t space-y-2 p-4">
              {actions.map((action, idx) => (
                <div
                  className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  key={idx}
                  onClick={() => setActiveView(action.view)}
                >
                  <div
                    className={`rounded-full p-2 ${
                      activeView === action.view
                        ? "bg-[#1363DF]"
                        : "bg-[#F0F2F5]"
                    }`}
                  >
                    <action.icon
                      size={20}
                      color={activeView === action.view ? "#ffffff" : "#344054"}
                    />
                  </div>
                  <div className="w-full flex items-center justify-between border-b border-[#F0F2F5]">
                    <TitleCatption
                      title={action.action}
                      titleClassName={`text-base ${
                        activeView === action.view
                          ? "text-[#1363DF] font-semibold"
                          : "text-[#101928]"
                      }`}
                      caption={action.description}
                    />
                    <ChevronRight
                      size={20}
                      color="#667185"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ScrollArea className="h-[75vh] pb-5">
          <div className="space-y-4">{renderContent()}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
