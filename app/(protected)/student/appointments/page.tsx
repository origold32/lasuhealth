"use client";
import { TabItem } from "@/components/tab-pill";
import { TabsUnderlineURL } from "@/components/tab-underline";
import AutoTableApi, { TableColProps } from "@/components/table/auto-table-api";
import { ScrollArea } from "@/components/ui/scroll-area";
import mockAppointment from "@/store/mockAppointment.json";
import { fetcher } from "@/swr";
import { statusConfig, Status } from "@/types/status-color";
import useSWR from "swr";
import { useState } from "react";

interface Appointment {
  id: string;
  createdAt: string;
  status: string;
  doctor: {
    firstname: string;
    lastname: string;
  };
}

// Configuration flag - set to true when API is ready
const USE_API = false;
const API_ENDPOINT = "/api/appointments"; // Replace with your actual endpoint

export default function Page() {
  // Mock state for when using JSON data
  const [isLoadingMock] = useState(false);
  const mutateMock = () => {
    console.log("Mutate called - would refresh data from API");
  };

  // SWR hook - only used when USE_API is true
  const {
    data: appointmentsData,
    isLoading: isLoadingAPI,
    mutate: mutateAPI,
  } = useSWR(USE_API ? API_ENDPOINT : null, fetcher);

  // Choose which data source to use
  const appointments: Appointment[] = USE_API
    ? appointmentsData?.data?.appointments ||
      appointmentsData?.data ||
      appointmentsData ||
      []
    : (mockAppointment as Appointment[]);

  // Choose which loading state and mutate function to use
  const isLoading = USE_API ? isLoadingAPI : isLoadingMock;
  const mutate = USE_API ? mutateAPI : mutateMock;

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filterAppointments = (filterType: string): Appointment[] => {
    if (filterType === "all") {
      return sortedAppointments;
    }

    return sortedAppointments.filter((appointment: Appointment) => {
      const appointmentStatus = appointment.status?.toLowerCase();
      const filteredStatus = filterType.toLowerCase();

      return appointmentStatus === filteredStatus;
    });
  };

  const getUniqueStatus = (): string[] => {
    const appointmentList = USE_API
      ? appointments
      : (mockAppointment as Appointment[]);
    const statuses = appointmentList
      .map((appointment: Appointment) => appointment.status)
      .filter((status: string) => status !== null && status !== undefined)
      .filter(
        (status: string, index: number, arr: string[]) =>
          arr.indexOf(status) === index
      );

    return statuses;
  };

  const dynamicStatus: string[] = getUniqueStatus();

  const pillTabs: TabItem[] = [
    {
      value: "all",
      valueDisplay: "All Appointments",
      content: (
        <AppointmentList
          appointments={filterAppointments("all")}
          isLoading={isLoading}
          mutate={mutate}
        />
      ),
    },
    ...dynamicStatus.map((status) => ({
      value: status.toLowerCase(),
      valueDisplay: status,
      content: (
        <AppointmentList
          appointments={filterAppointments(status)}
          isLoading={isLoading}
          mutate={mutate}
        />
      ),
    })),
  ];

  return (
    <>
      <ScrollArea className="h-[90vh] mt-6 pb-10">
        <div className="flex flex-col space-y-4">
          <h1>My Appointments</h1>
          {/* Development info - remove in production */}
          {!USE_API && (
            <small className="text-gray-500">
              Using mock data - switch USE_API to true when API is ready
            </small>
          )}
        </div>
        <TabsUnderlineURL tabs={pillTabs} />
      </ScrollArea>
    </>
  );
}

interface AppointmentListProps {
  appointments: Appointment[];
  isLoading: boolean;
  mutate: () => void;
}

function AppointmentList({
  appointments,
  isLoading,
  mutate,
}: AppointmentListProps) {
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
      render: (doctor: Appointment["doctor"]) => {
        if (!doctor) return "N/A";
        const displayName = `${doctor.lastname || ""} ${
          doctor.firstname || ""
        }`.trim();
        return displayName || "N/A";
      },
    },
    {
      name: "Status",
      type: "custom",
      dataKey: ["status"],
      render: (status: string) => {
        const config = statusConfig[status as Status];

        if (!config) {
          return (
            <div className="w-full flex justify-start items-center gap-2">
              <div className="flex items-center justify-center gap-2 rounded-md border border-[#1215281A] px-3 py-1 text-sm">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                <span>{status || "Unknown"}</span>
              </div>
            </div>
          );
        }

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
  ];

  return (
    <AutoTableApi
      cols={tableCols}
      data={appointments}
      isLoading={isLoading}
      tableHeadClassName="bg-white"
      tableWrapClassName="border-t rounded-none"
    />
  );
}
