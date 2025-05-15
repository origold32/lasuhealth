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
    href: "/student",
    icon: DashboardIcon,
  },
];

export interface FootElement {
  title: string;
  href: string;
  icon?: React.ComponentType;
  children?: FootElement[];
}

export const footElements: FootElement[] = [];
