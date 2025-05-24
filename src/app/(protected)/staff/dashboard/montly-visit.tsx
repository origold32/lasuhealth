import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@lasuhealth/components/ui/card";
import { cn } from "@lasuhealth/lib/utils";
import { BiChart } from "react-icons/bi";
import IconTrendUp from "../../../../../public/uploads/trend-up";
import { ChevronRight } from "lucide-react";

export default function MonthlyVisit() {
  return (
    <div className="bg-[#F9FAFB] border border-[#F7F9FC] rounded-lg shadow-sm">
      <Card className="bg-white rounded-b-none shadow-none border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-6">
            <div className="border border-[#E4E7EC] text-[#2CB8FF] p-1 sm:p-2 rounded-md">
              <IconTrendUp />
            </div>
            <span className="font-bold text-sm text-[#040404]">
              Visits This Month
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <h2 className="font-semibold text-[#040404] text-3xl">9,240</h2>
            <div className="flex items-center gap-1 text-xs">
              <div
                className={cn(
                  "rounded-full py-1 px-2 flex items-center gap-0.5 bg-[#FFECE5] text-[#AD3307]"
                )}
              >
                <BiChart />
                <span>10%</span>
              </div>
              <p className="text-[#98A2B3]">Compared to last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <button className="w-full px-6 py-3 flex justify-between items-center text-[#1AB2FF] text-xs">
        <span>View Snap Report</span>
        <ChevronRight />
      </button>
    </div>
  );
}
