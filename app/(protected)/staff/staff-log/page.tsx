import dynamic from "next/dynamic";

const StaffList = dynamic(() => import("./_components/StaffList"), {
  ssr: false,
});

export default function Page() {
  return <StaffList />;
}
