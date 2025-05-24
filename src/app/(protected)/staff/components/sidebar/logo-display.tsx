"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@lasuhealth/components/ui/sidebar";
import Image from "next/image";

export function LogoDisplay() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-col items-center">
        {!isCollapsed ? (
          <div className="h-20 p-2 w-full cursor-pointer flex justify-between">
            <div className="w-full flex items-center justify-center">
              <Image
                src="/uploads/favicon.png"
                alt="lasuhealth"
                width={108}
                height={75}
                className="-ml-3"
                priority
              />
            </div>
            <SidebarTrigger />
          </div>
        ) : (
          <SidebarTrigger />
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
