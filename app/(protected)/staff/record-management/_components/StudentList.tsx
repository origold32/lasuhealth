"use client";
import useSWR from "swr";
import { fetcher } from "@/swr";
import AutoTableApi, { TableColProps } from "@/components/table/auto-table-api";
import TitleCatption from "@/components/title-caption";
import { Button } from "@/components/ui/button";
import TitleCatptionAvartar from "@/components/title-caption-avatar";
import { useUrlState } from "@/hooks/useUrlState";
import StudentDetails from "./student-id";

export default function StudentListPage() {
  // const {data, isLoading} = useSWR("/students", fetcher);
  // const students = data?.data?.items || [];
  const [selectedStudentId, setSelectedStudentId] = useUrlState<string | null>(
    "selectedStudentId",
    null
  );
  if (selectedStudentId) {
    return (
      <StudentDetails
        id={selectedStudentId}
        onBack={() => setSelectedStudentId(null)}
      />
    );
  }

  const tableCols: TableColProps[] = [
    {
      name: "Name",
      type: "custom",
      dataKey: ["id"],
      render: (data: any, u: any) => {
        const fullName = [u.lastname, u.firstname].filter(Boolean).join(" ");
        return (
          <TitleCatptionAvartar
            titleClassName="text-base"
            title={fullName}
            avartarUrl={u.passport}
          />
        );
      },
    },
    { name: "Matric Number", type: "text", dataKey: ["matric_no"] },
    { name: "Department", type: "text", dataKey: ["department"] },
    { name: "Date Created", type: "date", dataKey: ["created_at"] },
    {
      name: "Actions",
      type: "custom",
      dataKey: ["id"],
      render: (id) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedStudentId(id);
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="px-4 relative space-y-4">
      <TitleCatption title="Record Management" />

      <div className="bg-white rounded-md shadow-sm p-2 space-y-4">
        {/* <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 border border-[#D0D5DD] rounded-md flex items-center gap-2 cursor-pointer">
              <IoFilter />
              <span>Filter</span>
            </div>
            <div className="flex items-center justify-center bg-[#1363DF] text-white rounded-md py-2 px-4 gap-2 text-sm cursor-pointer">
              <span>Add New Record</span>
              <PiPlus />
            </div>
          </div>
        </div> */}

        <AutoTableApi
          cols={tableCols}
          apiUrl={"/students"}
          apiDataKey="items"
          showSearch
        />
      </div>
    </div>
  );
}
