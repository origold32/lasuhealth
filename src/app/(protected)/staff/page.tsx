import { ScrollArea } from "@lasuhealth/components/ui/scroll-area";
import { PiPlus } from "react-icons/pi";
import TotalRecords from "./dashboard/total-records";
import MonthlyVisit from "./dashboard/montly-visit";
import ActiveStudents from "./dashboard/active-students";
import MonthlyAttendanceChart from "./dashboard/monthly-attendance-chart";
import AgeSexVisit from "./dashboard/age-sex-visit";
import FacultyDepartmentVisit from "./dashboard/faculty-dept-visit";
import Top10Diagnosis from "./dashboard/top-10-diagnosis";

export default function page() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="px-4 relative">
      <div className="p-2 md:py-6 flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-[#040404]">
            Welcome {/* <UserName /> */}
            Muhibudeen Oriola
          </h1>
          <p className="text-sm mb-1 text-[#475367]">{today}</p>
        </div>

        <div className="grid md:grid-cols-2 items-center gap-4">
          <div className="flex items-center justify-center bg-[#1AB2FF] text-white rounded-md p-2 gap-2 text-sm">
            <span>Add Record</span>
            <PiPlus />
          </div>

          <div className="flex items-center justify-center bg-[#040404] text-white rounded-md px-4 py-2 gap-2 text-sm">
            <span>Generate reports</span>
            <PiPlus />
          </div>
        </div>
      </div>

      <ScrollArea className="h-[70vh]">
        <div className="flex flex-col space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <TotalRecords />
            <MonthlyVisit />
            <ActiveStudents />
          </div>

          <div className="grid md:grid-cols-[65%_35%] gap-4">
            <MonthlyAttendanceChart />
            <AgeSexVisit />
          </div>
          <div className="grid md:grid-cols-[60%_40%] gap-4">
            <FacultyDepartmentVisit />
            <Top10Diagnosis />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
