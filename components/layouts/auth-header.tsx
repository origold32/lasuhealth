"use client";

import useUser from "@/hooks/useUser";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { SmartAvatar } from "../smart-avatar";
import { LuBell } from "react-icons/lu";
import { cn } from "@/lib/utils";

type Props = {
  isSidebarCollapsed?: boolean;
};

const AuthHeader = ({ isSidebarCollapsed }: Props) => {
  const { user } = useUser();

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
          <div className="flex items-center space-x-4">
            <Link
              href="/notifications"
              className="h-9 w-9 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <LuBell size={16} />
            </Link>
            <SmartAvatar
              data={user}
              src={user.passport}
              getKey={(u) => u.email || u.id || `${u.lastname}${u.firstname}`}
              getName={(u) => u.firstname}
              getInitialsName={(u) => `${u.lastname} ${u.firstname}`}
              responsiveName
              className="bg-[#FAFBFC] pr-5 text-[#4E5D78] text-sm  rounded-full hover:bg-[#F0F1F2] transition-colors"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default AuthHeader;
