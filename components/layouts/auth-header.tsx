"use client";

import useUser from "@/hooks/useUser";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/auth/use-auth";
import { Skeleton } from "../ui/skeleton";
import { SmartAvatar } from "../smart-avatar";
import { LuBell } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

type Props = {
  isSidebarCollapsed?: boolean;
};

const AuthHeader = ({ isSidebarCollapsed }: Props) => {
  const { user } = useUser();
  const { logout } = useAuth();

  return (
    <header
      className={cn(
        "h-[10vh] sticky top-0 z-30 w-full bg-white border-b shadow-sm backdrop-blur transition-all duration-300",
        "supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="h-full px-6 py-2 flex justify-end items-center gap-4">
        {!user ? (
          <Skeleton className="h-9 w-40 ml-8" />
        ) : (
          <>
            <div className="flex items-center gap-5">
              <div className="ml-auto">
                <Link
                  href="/notifications"
                  className="h-9 w-9 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <LuBell size={16} />
                </Link>
              </div>
              <div className="ml-auto">
                <Link
                  href="/notifications"
                  className="h-9 w-9 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <IoMailOutline size={16} />
                </Link>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-8 rounded-l-full rounded-r-md focus:outline-none">
                <div className="flex items-center justify-between rounded-l-full pr-4 bg-[#FAFBFC] text-[#4E5D78] text-sm rounded-md hover:bg-[#F0F1F2] transition-colors">
                  <SmartAvatar
                    data={user}
                    src={user?.passport}
                    getKey={(u) =>
                      u.email || u.id || `${u.firstname}${u.lastname}`
                    }
                    getName={(u) => u.firstname}
                    getInitialsName={(u) => `${u.firstname} ${u.lastname}`}
                    showName
                  />
                  <ChevronDown className="shrink-0 ml-2" size={14} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => logout("/login")}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
};

export default AuthHeader;
