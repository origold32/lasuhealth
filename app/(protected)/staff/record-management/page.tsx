import dynamic from "next/dynamic";

const StudentList = dynamic(() => import("./_components/StudentList"), {
  ssr: false,
});

export default function Page() {
  return <StudentList />;
}
