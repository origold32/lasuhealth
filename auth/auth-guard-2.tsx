"use client";

import { CONST_Jwt_Storage_KeyName } from "@/const";
import { fetcher } from "@/swr";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import useSWR from "swr";
import useAuth, { logout } from "./use-auth";

interface AuthGuardProps {
  children: ReactNode;
  authPath: string; // /login etc
}

const AuthGuard2 = ({ children, authPath = "/login" }: AuthGuardProps) => {
  const { data, isLoading, error } = useSWR("/auth/profile", fetcher);

  useEffect(() => {
    console.log("in auth 2 guard effect🧨");
    const token = localStorage.getItem(CONST_Jwt_Storage_KeyName);
    if (!token) {
      logout("/login");
      return;
    }

    if (error?.statusCode == 401) {
      logout(authPath);
      return;
    }
  }, [error, authPath]);

  if (!data) {
    return;
  }

  return <>{children}</>;
};

export default AuthGuard2;
