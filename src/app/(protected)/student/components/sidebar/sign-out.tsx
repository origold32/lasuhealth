// src/component/sidebar/signout.tsx
"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@lasuhealth/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@lasuhealth/components/ui/sidebar";
// import { useAuth } from "@lasuhealth/contexts/authContext";
import { PiSignOut } from "react-icons/pi";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@lasuhealth/components/ui/tooltip";

export function SignOut() {
  const { state } = useSidebar();
  // const { user, logout } = useAuth();
  const isCollapsed = state === "collapsed";

  // const getInitials = () => {
  //   if (!user) return "AD";

  //   const firstInitial = user.firstName ? user.firstName[0] : "";
  //   const lastInitial = user.lastName ? user.lastName[0] : "";

  //   return (firstInitial + lastInitial).toUpperCase();
  // };

  // const getFullName = () => {
  //   if (!user) return "Admin";
  //   return `${user.firstName} ${user.lastName}`.trim();
  // };

  // const handleSignOut = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   await logout();
  // };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {!isCollapsed ? (
          <div className="w-[95%] bg-[#F0F2F5] rounded-lg flex items-center p-2 gap-2 mx-2 mb-1 cursor-pointer">
            <div className="rounded-full bg-primary-foreground w-10 h-9 flex items-center justify-center">
              <Avatar className="h-full w-full rounded-full">
                <AvatarImage
                // src={user?.avatarUrl || ""}
                />
                <AvatarFallback>{/* {getInitials()} */}</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-[135px] font-semibold">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h1 className="text-sm max-w-[13ch] overflow-hidden truncate">
                      {/* {getFullName()} */}
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent>
                    {/* <p>{getFullName()}</p> */}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-xs max-w-[17ch] overflow-hidden truncate">
                      {/* {user?.email || "admin@example.com"} */}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{/* {user?.email || "admin@example.com"} */}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Link
              href="#"
              // onClick={handleSignOut}
              className="hover:p-2 hover:bg-white hover:rounded-full hover:right-1 hover:ring-[#E4E7EC]"
            >
              <PiSignOut size={20} />
            </Link>
          </div>
        ) : (
          <div className="w-full hover:bg-white hover:rounded-full hover:ring-1 hover:ring-[#E4E7EC] p-2 flex items-center justify-center">
            <Link
              href="#"
              // onClick={handleSignOut}
            >
              <PiSignOut />
            </Link>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
