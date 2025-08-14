"use client";

import AuthHeader from "@/components/layouts/auth-header";
import Sidebar from "@/components/layouts/sidebar";
import { cn } from "@/lib/utils";
import React, { ReactNode, useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import { FaBarsStaggered } from "react-icons/fa6";

type Props = { children: ReactNode };

const ProtectedLayout = ({ children }: Props) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleMobileToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative h-screen overflow-hidden flex">
      <Sidebar
        isCollapsed={isMobile ? false : isSidebarCollapsed}
        onToggle={() =>
          isMobile
            ? handleMobileToggle()
            : setIsSidebarCollapsed((prev) => !prev)
        }
        mobileOpen={isSidebarOpen}
        onMobileClose={() => setIsSidebarOpen(false)}
      />

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          !isMobile && (isSidebarCollapsed ? "ml-16" : "ml-64")
        )}
      >
        <AuthHeader isSidebarCollapsed={isSidebarCollapsed} />
        <div className="flex-1 scroll-container p-4 bg-[#F7F9FC]">
          {children}
        </div>
      </div>

      {isMobile && (
        <button
          title={isSidebarOpen ? "Close menu" : "Open menu"}
          onClick={handleMobileToggle}
          className={cn(
            "fixed bottom-6 right-6 z-50 bg-[#121528] text-white p-4 rounded-full shadow-lg hover:bg-[#1a1c2b] transition-all duration-300",
            isSidebarOpen && "rotate-180"
          )}
        >
          <FaBarsStaggered size={20} />
        </button>
      )}
    </div>
  );
};

export default ProtectedLayout;
