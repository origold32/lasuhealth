import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BiChart } from "react-icons/bi";
import { TbUser } from "react-icons/tb";

export default function ActiveStudents() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-6">
          <div className="border border-[#E4E7EC] p-1 sm:p-2 rounded-md">
            <TbUser color="#2CB8FF" size={16} />
          </div>
          <span className="font-bold text-sm text-[#040404]">
            Active Students
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
  );
}
