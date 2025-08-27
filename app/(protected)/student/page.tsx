"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, ChevronRight } from "lucide-react";
import useUser from "@/hooks/useUser";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { IoFitnessOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import DateFormatterToText from "@/components/date-formatter-to-text";
import TitleCatption from "@/components/title-caption";
import AutoTableApi, { TableColProps } from "@/components/table/auto-table-api";
import { Status, statusConfig } from "@/types/status-color";
import Link from "next/link";
import mockAppointment from "@/store/mockAppointment.json";

export default function Page() {
  const { user } = useUser();
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const actions = [
    {
      action: "Schedule Appointment",
      description: "Find a doctor and specialization",
      link: "/student/appointments",
      icon: FaRegCalendarPlus,
    },
    {
      action: "View Medical Records",
      link: "/student/medical-records",
      icon: IoFitnessOutline,
    },
    {
      action: "Update Profile",
      link: "/student/profile",
      icon: FaUserEdit,
    },
  ];

  const sortedAppointments = [...mockAppointment].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const tableCols: TableColProps[] = [
    {
      name: "Date",
      type: "date",
      dataKey: ["createdAt"],
      // dateMode: "datetime",
    },
    {
      name: "Doctor",
      type: "custom",
      dataKey: ["doctor"],
      render: (doctor) => {
        const displayName = `${doctor?.lastname} ${doctor?.firstname}`;
        return displayName;
      },
    },
    {
      name: "Status",
      type: "custom",
      dataKey: ["id"],
      render: (_: any, doctor) => {
        const { status } = doctor;
        const config = statusConfig[status as Status];
        return (
          <div className="w-full flex justify-start items-center gap-2">
            <div className="flex items-center justify-center gap-2 rounded-md border border-[#1215281A] px-3 py-1 text-sm">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <span>{config.label}</span>
            </div>
          </div>
        );
      },
    },
    // {
    //   name: "Action",
    //   type: "custom",
    //   dataKey: ["id"],
    //   render: (data) => <button className="text-blue-500">View</button>,
    // },
  ];

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="flex items-center gap-2 md:text-2xl font-semibold text-[#040404]">
              Welcome{" "}
              {user?.lastname && user?.firstname && user?.middlename
                ? `${user.lastname} ${user.firstname} ${user.middlename}`
                : "Student"}
              !
            </h1>
            <p className="text-sm text-[#475367]">
              Today’s a great day, we hope you’re taking good care of your
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
      </div>

      <ScrollArea className="h-[70vh] mt-6 pb-20 md:pb-0">
        <div className="flex flex-col space-y-4">
          <div className="grid md:grid-cols-[35%_60%] md:justify-between space-y-4 md:space-y-0">
            <div className="bg-white shadow-sm rounded-md h-fit">
              <h6 className="text-sm font-semibold p-4">Quick Actions</h6>
              <div className="border-t space-y-10 p-4">
                {actions.map((action, idx) => (
                  <div className="flex items-center gap-4" key={idx}>
                    <div className="rounded-full p-2 bg-[#F0F2F5]">
                      <action.icon size={20} color="#344054" />
                    </div>
                    <div className="w-full flex items-center justify-between border-b border-[#F0F2F5]">
                      <TitleCatption
                        title={action.action}
                        titleClassName="text-base text-[#101928]"
                        caption={action.description}
                      />
                      <ChevronRight size={20} color="#667185" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-md h-fit max-w-full overflow-x-auto">
              <div className="flex items-center justify-between p-4">
                <h6 className="text-sm font-semibold">Recent Appointments</h6>

                <Link
                  href="/student/appointments"
                  className="bg-gradient-to-r from-[#1B75BC] to-[#29ABE2]  text-white p-2 rounded-md text-sm"
                >
                  All Appointments
                </Link>
              </div>

              <AutoTableApi
                cols={tableCols}
                useExternalData
                data={sortedAppointments.slice(0, 5)}
                tableHeadClassName="bg-white"
                tableWrapClassName="border-t rounded-none"
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
