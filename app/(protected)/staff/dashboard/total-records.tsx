import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { BiChart } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function TotalRecords() {
  return (
    <div className="bg-[#F9FAFB] border border-[#F7F9FC] rounded-lg shadow-sm">
      <Card className="bg-white rounded-b-none shadow-none border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-6">
            <div className="border border-[#E4E7EC] p-1 sm:p-2 rounded-md">
              <IoDocumentTextOutline color="#2CB8FF" size={16} />
            </div>
            <span className="font-bold text-sm text-[#040404]">
              Total Records
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
      <Link
        href="/staff/record-management"
        className="w-full px-6 py-3 flex justify-between items-center text-[#1AB2FF] text-xs"
      >
        <span>View all Records</span>
        <ChevronRight />
      </Link>
    </div>
  );
}
