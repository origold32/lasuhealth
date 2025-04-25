"use client";

import { PropsWithChildren } from "react";
import { FaRegBell, FaSearch } from "react-icons/fa";
import { Input } from "@lasuhealth/components/ui/input";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppSidebar } from "@lasuhealth/app/staff/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@lasuhealth/components/ui/sidebar";
import { ScrollArea } from "@lasuhealth/components/ui/scroll-area";

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14">
            <div className="flex items-center gap-2 px-4 w-full">
              <div className="w-full flex justify-between items-center py-2 px-4">
                <div className="relative w-1/2">
                  <Input
                    name="search"
                    type="text"
                    placeholder="Search here"
                    className="p-2 pl-10 border-none rounded-lg w-full bg-[#F0F2F5]"
                  />
                  <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="bg-[#F0F2F5] rounded-full w-10 aspect-square flex items-center justify-center cursor-pointer">
                    <FaRegBell size={18} />
                  </div>
                  <div className="bg-[#F0F2F5] rounded-full w-10 aspect-square flex items-center justify-center cursor-pointer">
                    <HiOutlineChatBubbleBottomCenterText size={18} />
                  </div>
                </div>
              </div>
            </div>
          </header>
          <section className="h-full bg-[#F7F9FC]">
            <QueryClientProvider client={queryClient}>
              <ScrollArea>{children}</ScrollArea>
            </QueryClientProvider>
          </section>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
