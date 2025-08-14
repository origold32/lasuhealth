"use client";

import useUser from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  link?: string;
  className?: string;
  children?: ReactNode;
  text?: string;
};

const AppLogo = ({ children, link, className, text }: Props) => {
  const { user } = useUser();
  return (
    <Link
      className={cn(
        "relative flex items-center gap-1 focus:outline-none",
        className
      )}
      href={user ? "/campaigns" : "/"}
    >
      <Image
        src="/images/logo-app.svg"
        alt="epay-logo"
        width="91"
        height="30"
        className="h-[30px] w-auto /sm:w-[120px]  object-cover dark:brightness-[0.2] dark:grayscale"
      />
      {text ? (
        <span className=" font-bold whitespace-nowrap dark:text-white">
          {text}
        </span>
      ) : null}
      {children}
      <span className="sr-only">App logo</span>
    </Link>
  );
};

export default AppLogo;
