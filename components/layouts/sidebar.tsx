import AppLogo from "../app-logo";
// import SparklingSeparator from "@/public/images/sparkling-separator";
import { HiHome } from "react-icons/hi";
import { HiMiniUserGroup } from "react-icons/hi2";
import {
  IoStatsChart,
  IoCard,
  IoLogOut,
  IoFitnessOutline,
} from "react-icons/io5";
import { File, Wrench, ChevronLeft, ChevronRight } from "lucide-react";
import { AiOutlineMessage } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TbMedicalCross } from "react-icons/tb";
import DashboardIcon from "../../public/images/dashboard-icon";
import FolderIcon from "../../public/images/folder-icon";
import { GrUserWorker } from "react-icons/gr";
import { PiPackage } from "react-icons/pi";
import SparklingSeparator from "@/public/images/sparkling-separator";

type Props = {
  isCollapsed: boolean;
  onToggle: () => void;
};

const navItems = [
  // student specific items
  {
    name: "Dashboard",
    href: "/student",
    icon: DashboardIcon,
  },
  {
    name: "Consultation",
    href: "/student/consultation",
    icon: TbMedicalCross,
  },
  {
    name: "Medical Fitness",
    href: "/student/medical-fitness",
    icon: IoFitnessOutline,
  },

  // staff specific items
  // {
  //   name: "Dashboard",
  //   href: "/staff",
  //   icon: DashboardIcon,
  // },
  // {
  //   name: "Record Management",
  //   href: "/staff/record-management",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Reporting",
  //   href: "/staff/reporting",
  //   icon: PiPackage,
  // },
  // {
  //   name: "Staff List",
  //   href: "/staff/staff-list",
  //   icon: GrUserWorker,
  // },
];

export default function Sidebar({ isCollapsed, onToggle }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full flex flex-col bg-[#121528] p-4 space-y-4 transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between">
        {!isCollapsed && (
          <div className="w-full flex items-center justify-center">
            <AppLogo className="shrink-0" />
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-[#1a1c2b] text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {!isCollapsed && <SparklingSeparator />}

      <div className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-md font-semibold transition-colors group relative",
                isCollapsed
                  ? "justify-center p-2"
                  : active
                  ? "py-4 px-4 space-x-3"
                  : "py-3 px-4 space-x-3",
                active
                  ? "bg-[#242637] text-white"
                  : "text-[#A0AEC0] hover:bg-[#1a1c2b]"
              )}
              title={isCollapsed ? item.name : ""}
            >
              <Icon
                size={20}
                className={cn(active ? "text-[#328BE0]" : "text-white")}
              />
              {!isCollapsed && <span className="text-sm">{item.name}</span>}

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
