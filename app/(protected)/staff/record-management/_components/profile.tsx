// StudentProfile.tsx - Separated profile component
import DateFormatterToText from "@/components/date-formatter-to-text";
import LoadingSkeleton from "@/components/loaders/loading-skeleton";
import { sentenceCase } from "@/lib/text";

type Props = {
  student: any;
  isLoading: boolean;
};

export default function StudentProfile({ student, isLoading }: Props) {
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

  const parentDetails = [
    // { Label: "Parent's Name", value: student?.parentName },
    // { Label: "Father's Phone", value: student?.fatherPhone },
    // { Label: "Mother's Phone", value: student?.motherPhone },
    // { Label: "Parent's Home Address", value: student?.parentHomeAddress },
    // { Label: "Guardian's Name", value: student?.guardianName },
    // { Label: "Guardian's Relationship", value: student?.guardianRelationship },
    // { Label: "Guardian's Phone", value: student?.guardianPhone },
    // { Label: "Guardian's Home Address", value: student?.guardianHomeAddress },
    { Label: "Parent's Name", value: "Mr & Mrs Muhibudeen" },
    { Label: "Father's Phone", value: "+2348102557217" },
    { Label: "Mother's Phone", value: "+2348081793545" },
    { Label: "Parent's Home Address", value: "5 Adigun Ishola close Ijesha" },
    { Label: "Guardian's Name", value: "Mr & Mrs Muhibudeen" },
    { Label: "Guardian's Relationship", value: "Uncle" },
    { Label: "Guardian's Phone", value: "+2348034567890" },
    { Label: "Guardian's Home Address", value: "10 Adebayo Street, Lagos" },
  ];

  return (
    <>
      <div className="bg-white shadow-sm rounded-md h-fit">
        <h6 className="text-sm font-semibold p-4">Student Information</h6>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 p-4 gap-4 w-full border-t">
            {mainDetails.map((detail) => (
              <div key={detail.Label} className="grid space-y-1 font-semibold">
                <span className="text-sm text-[#475367]">{detail.Label}</span>
                <span className="text-[#040404]">{detail.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-md h-fit">
        <h6 className="text-sm font-semibold p-4">Parent Information</h6>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 p-4 gap-4 w-full border-t">
            {parentDetails.map((detail) => (
              <div key={detail.Label} className="grid space-y-1 font-semibold">
                <span className="text-sm text-[#475367]">{detail.Label}</span>
                <span className="text-[#040404]">{detail.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
