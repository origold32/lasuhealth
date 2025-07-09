"use client";

import { CONST_Jwt_Storage_KeyName } from "@/const";
import { fetcher } from "@/swr";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import useSWR, { SWRConfig } from "swr";
import useAuth from "./use-auth";

interface AuthGuardProps {
  children: ReactNode;
  authPath: string; // /login etc
}

const AuthGuard = ({ children, authPath = "/login" }: AuthGuardProps) => {
  const { logout } = useAuth();
  const {
    data: user,
    isLoading,
    isValidating,
    error,
  } = useSWR("/auth/profile", fetcher);
  console.log("user and is loading", user, isLoading, isValidating, error);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(CONST_Jwt_Storage_KeyName);
      if (!token) {
        logout(authPath);
        return;
      }
    };
    console.log("router change, checking admin auth");
    checkAuth();
  }, [router, logout, authPath]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  if ((!user && !isLoading) || (error && error.code !== "ECONNABORTED")) {
    // console.log("no user in no user is loading....", error, error?.code, user, isLoading);
    logout(authPath);
    return;
  }
  if (user) {
    return (
      <SWRConfig
        value={{
          onError: (error, key) => {
            if (error.statusCode !== 401) {
              // logout if any api call returns 401 unauthorized
              // logout(authPath);
            }
          },
        }}
      >
        {children}
      </SWRConfig>
    );
  }
};

export default AuthGuard;
