"use client";
import { ScrollArea } from "@lasuhealth/components/ui/scroll-area";
import { Calendar } from "lucide-react";
import Profile from "./profile";

export default function Page() {
  const today = new Date().toLocaleDateString("en-US", {
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
          <p className="text-sm mb-1 text-[#475367]">
            It’s a sunny day today, we hope you’re taking good care of your
            health 😊
          </p>
        </div>

        <div className="flex items-center gap-4 border border-[#E4E7EC] rounded-md px-4 py-2">
          <div className="rounded-full p-2 bg-[#F0F2F5] text-[#344054]">
            <Calendar size={16} />
          </div>

          <div className="flex md:flex-col md:space-y-1 items-center space-x-4 md:space-x-0">
            <p className="text-xs text-[#475467]">Today&apos;s Date</p>
            <p className="font-semibold text-[#040404] text-sm">{today}</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[75vh]">
        <div className="flex flex-col space-y-4">
          <Profile />
        </div>
      </ScrollArea>
    </div>
  );
}
