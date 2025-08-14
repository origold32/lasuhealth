import DateFormatterToText from "@/components/date-formatter-to-text";
import GoBack from "@/components/go-back";
import LoadingSkeleton from "@/components/loaders/loading-skeleton";
import { SmartAvatar } from "@/components/smart-avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { sentenceCase } from "@/lib/text";
import { fetcher } from "@/swr";
import { useParams } from "next/navigation";
import { PiStudent } from "react-icons/pi";
import { Label } from "recharts";
import useSWR from "swr";

type Props = {
  id: string;
  onBack: () => void;
};

export default function StudentDetails({ id, onBack }: Props) {
  const { data, isLoading } = useSWR(`/students/${id}`, fetcher);
  const student = data?.data || {};
  const legalName = `${student?.lastname || ""} ${
    student?.firstname || ""
  }`.trim();
  const fullName = `${student?.lastname || ""} ${student?.firstname || ""} ${
    student?.middlename || ""
  }`.trim();

  const mainDetails = [
    { Label: "Medical Number", value: 21059 },
    { Label: "Gender", value: sentenceCase(student?.gender) },
    {
      Label: "Date of Birth",
      value: <DateFormatterToText date={student?.dob} />,
    },
    { Label: "Phone Number", value: student?.phone },
    { Label: "Faculty", value: student?.faculty },
    { Label: "Department", value: student?.department },
    { Label: "Address", value: student?.address },
    { Label: "Nationality", value: student?.nationality },
  ];

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center justify-start">
        <GoBack label="Back" onClick={onBack} showIcon />
      </div>

      <div className="grid md:grid-cols-[30%_68%] gap-4">
        <Card className="h-fit bg-black text-white p-4 flex flex-col items-center space-y-4 relative">
          <SmartAvatar
            data={student}
            src={student.passport}
            getKey={(s) => s.email || s.id || legalName}
            getInitialsName={() => legalName}
            avatarSizeClassName="w-16 h-16"
            downContent={
              isLoading ? (
                <LoadingSkeleton />
              ) : (
                <div className="flex flex-col items-center space-y-2 text-center">
                  <span className="text-xl font-semibold">{fullName}</span>
                  <span>Matric No: {student.matric_no}</span>
                </div>
              )
            }
            className="flex-col items-center"
          />
        </Card>

        <Card className="h-full bg-white flex items-center">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 p-4 gap-4 w-full">
              {mainDetails.map((detail) => (
                <div
                  key={detail.Label}
                  className="grid space-y-1 font-semibold"
                >
                  <span className="text-sm text-[#475367]">{detail.Label}</span>
                  <span className="text-[#040404]">{detail.value}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
