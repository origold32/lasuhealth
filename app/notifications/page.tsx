import dynamic from "next/dynamic";

const NotificationsScreen = dynamic(() => import("./screens"), { ssr: false });

export default function Page() {
  return <NotificationsScreen />;
}
