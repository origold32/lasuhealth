"use client";

import { Button } from "@lasuhealth/components/ui/button";
import { useSidebar } from "@lasuhealth/components/ui/sidebar";
import { FaBarsStaggered } from "react-icons/fa6";

export function MobileSidebarTrigger() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  const handleOpenMobile = () => {
    setOpenMobile(!openMobile);
  };

  if (!isMobile) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="md:hidden flex items-center justify-center p-2 bg-[#F0F2F5] rounded-full"
      onClick={handleOpenMobile}
    >
      <FaBarsStaggered size={18} />
      <span className="sr-only">Menu</span>
    </Button>
  );
}
