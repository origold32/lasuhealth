"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export type GoBackProps = {
  link?: string;
  className?: string;
  onClick?: () => void;
};

const GoBack = ({ className, link, onClick }: GoBackProps) => {
  const router = useRouter();
  if (link) {
    return (
      <Link className={cn("flex gap-2 items-center font-semibold text-muted-foreground w-max", className)} href={link}>
        <ArrowLeft className=" text-black/90" /> Go back
      </Link>
    );
  }

  return (
    <button
      onClick={() => {
        onClick ? onClick() : () => router.back();
      }}
      className={cn("flex gap-2 items-center font-semibold text-muted-foreground cursor-pointer w-max", className)}
    >
      <ArrowLeft className=" text-black/90" /> Go back
    </button>
  );
};

export default GoBack;
