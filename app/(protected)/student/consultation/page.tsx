"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PiChatTeardropTextBold, PiClock, PiPlusCircle } from "react-icons/pi";
import { cn } from "@/lib/utils";
import ConsultationDetailsModal from "./details-modal";
import { Consultation } from "@/types/consultations";
import consultationsData from "@/store/consultations.json";

const tabs = [
  {
    title: "Ongoing Consultations",
    value: "ongoing",
    icon: PiChatTeardropTextBold,
  },
  {
    title: "Closed Consultations",
    value: "closed",
    icon: PiClock,
  },
];

const consultations = consultationsData as Consultation[];

export default function Page() {
  function getCountByStatus(status: string) {
    return consultations.filter((c) => c.status === status).length;
  }

  function getInitials(name: string) {
    const titlesToIgnore = ["Dr", "Mr", "Mrs", "Ms", "Prof"];
    const parts = name
      .split(" ")
      .filter((word) => !titlesToIgnore.includes(word));
    const first = parts[0]?.[0] || "";
    const last = parts[1]?.[0] || "";
    return (first + last).toUpperCase();
  }

  return (
    <>
      <div className="p-2 md:py-6 flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#040404]">
            Consult a Doctor
          </h1>
          <p className="text-sm mb-1 text-[#475367]">
            Check and filter all your consultation here
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-md bg-[#1363DF] text-white px-4 py-2">
          <PiPlusCircle size={20} />
          <span>Export Details</span>
        </button>
      </div>

      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="gap-2 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "group flex items-center justify-between w-full md:w-auto gap-2 px-4 py-2 border rounded-md text-sm font-semibold transition-all",
                "bg-[#F0F2F5] border-[#D0D5DD] text-[#475367]",
                "data-[state=active]:bg-[#EFFAFF] data-[state=active]:border-[#1363DF] data-[state=active]:text-[#101928]"
              )}
            >
              <tab.icon
                size={18}
                className="text-[#98A2B3] group-data-[state=active]:text-[#1363DF]"
              />
              <span className="flex-1 text-center">{tab.title}</span>
              <span
                className={cn(
                  "rounded-md w-6 h-4 py-2.5 px-4 flex items-center justify-center text-xs font-medium",
                  "bg-[#E4E7EC] text-[#344054]",
                  "group-data-[state=active]:bg-[#1363DF] group-data-[state=active]:text-white"
                )}
              >
                {getCountByStatus(tab.value)}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="mt-6 border rounded-lg overflow-hidden bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    {["Name", "Conversation", "Date & Time", ""].map(
                      (header) => (
                        <TableHead key={header}>{header}</TableHead>
                      )
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultations
                    .filter((c) => c.status === tab.value)
                    .map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={c.image} alt={c.name} />
                              <AvatarFallback>
                                {getInitials(c.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-[#040404]">
                                {c.name}
                              </p>
                              <p className="text-sm text-[#475367]">
                                {c.specialty}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-[#344054]">
                            {c.conversation[0].title}
                          </p>
                          <p className="text-sm text-[#667185] truncate max-w-[250px]">
                            {c.conversation[0].discussion}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-[#344054]">
                              {c.date}
                            </p>
                            <p className="text-sm text-[#667185]">{c.time}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <ConsultationDetailsModal consultation={c} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
