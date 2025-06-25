import DashboardIcon from "../../../../../../public/uploads/dashboard-icon";
import { TbMedicalCross } from "react-icons/tb";
import { IoFitnessOutline } from "react-icons/io5";

export interface NavElement {
  title: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavElement[];
}

export const navElements: NavElement[] = [
  {
    title: "Dashboard",
    href: "/student",
    icon: DashboardIcon,
  },
  {
    title: "Consultation",
    href: "/student/consultation",
    icon: TbMedicalCross,
  },
  {
    title: "Medical Fitness",
    href: "/student/medical-fitness",
    icon: IoFitnessOutline,
  },
];

export interface FootElement {
  title: string;
  href: string;
  icon?: React.ComponentType;
  children?: FootElement[];
}

export const footElements: FootElement[] = [];
