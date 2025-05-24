"use client";

import * as React from "react";
import { FooterElements } from "./nav-footer";
import { NavigationElements } from "./nav-elements";
import { SignOut } from "./sign-out";
import { LogoDisplay } from "./logo-display";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@lasuhealth/components/ui/sidebar";
import { Separator } from "@lasuhealth/components/ui/separator";
import { ScrollArea } from "@lasuhealth/components/ui/scroll-area";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoDisplay />
      </SidebarHeader>
      <SidebarContent className="flex flex-col overflow-hidden">
        <ScrollArea className="flex-grow overflow-hidden">
          <NavigationElements />
        </ScrollArea>
        <Separator className="mx-2 my-2" />
        <div className="flex-shrink-0">
          <FooterElements />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <SignOut />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
