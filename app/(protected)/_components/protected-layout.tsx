"use client";

// import AuthHeader from "@/components/layouts/auth-header";
import AuthHeader from "@/components/layouts/auth-header";
import Sidebar from "@/components/layouts/sidebar";
import { cn } from "@/lib/utils";
import React, { ReactNode, useState } from "react";

type Props = { children: ReactNode };

const ProtectedLayout = ({ children }: Props) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden flex">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isSidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <AuthHeader isSidebarCollapsed={isSidebarCollapsed} />
        <div className="flex-1 scroll-container p-4 bg-[#F7F9FC]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;

export const ProtectedContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn(" container px-4 md:px-6 bg-red-200/ pb-10", className)}>
      {children}
    </div>
  );
};
