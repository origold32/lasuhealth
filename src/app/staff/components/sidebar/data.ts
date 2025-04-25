import { PiPackage, PiHeadset } from "react-icons/pi";
import { RiSettings2Line } from "react-icons/ri";
import FolderIcon from "../../../../../public/uploads/folder-icons";
import DashboardIcon from "../../../../../public/uploads/dashboard-icon";
export interface NavElement {
  title: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavElement[];
}

export const navElements: NavElement[] = [
  {
    title: "Dashboard",
    href: "/staff",
    icon: DashboardIcon,
  },
  {
    title: "Record Management",
    href: "/staff/record-management",
    icon: FolderIcon,
  },
  {
    title: "Reporting",
    href: "/staff/reporting",
    icon: PiPackage,
  },
];

export interface FootElement {
  title: string;
  href: string;
  icon?: React.ComponentType;
  children?: FootElement[];
}

export const footElements: FootElement[] = [
  {
    title: "Settings",
    href: "/staff/settings",
    icon: RiSettings2Line,
  },
  {
    title: "Help Center",
    href: "/staff/help-center",
    icon: PiHeadset,
  },
];
