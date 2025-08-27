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
  const { data } = useSWR("/students", fetcher);
  const students = data?.data?.items || [];

  const [selectedStudentName, setSelectedStudentName] = useUrlState<
    string | null
  >("selectedStudentId", null);

  const selectedStudent = selectedStudentName
    ? students.find((student: any) => {
        const fullName = [
          student.lastname,
          student.firstname,
          student.middlename,
        ]
          .filter(Boolean)
          .join("_")
          .replaceAll(" ", "_");
        return fullName === selectedStudentName;
      })
    : null;

  if (selectedStudent) {
    return (
      <StudentDetails
        id={selectedStudent.id}
        onBack={() => setSelectedStudentName(null)}
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
      render: (id, student) => {
        const fullNameForUrl = [
          student.lastname,
          student.firstname,
          student.middlename,
        ]
          .filter(Boolean)
          .join("_")
          .replaceAll(" ", "_");

        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedStudentName(fullNameForUrl);
            }}
          >
            View Details
          </Button>
        );
      },
    },
  ];

  return (
    <div className="px-4 relative space-y-4">
      <TitleCatption title="Record Management" />

      <div className="bg-white rounded-md shadow-sm p-2 space-y-4">
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
