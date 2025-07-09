"use client";

import { CONST_Jwt_Storage_KeyName } from "@/const";
import { useRouter } from "next/navigation";
import { mutate, useSWRConfig } from "swr";

// This hook manages jwt auth functionality (login, logout)
// It depends on useSwr for data storage
// (no other statemanagement like context or redux)
const useAuth = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const login = (
    token: string,
    path?: string,
    userData?: Record<string, any>
  ) => {
    localStorage.setItem(CONST_Jwt_Storage_KeyName, token);

    if (path && userData) {
      // Update SWR cache first
      mutate("/auth/profile", { data: userData }, false);

      // Use a small delay to ensure SWR cache is updated before navigation
      setTimeout(() => {
        router.push(path);
      }, 100);
    }

    console.log("logging in", token);
  };

  const logout = (authPath: string) => {
    localStorage.removeItem(CONST_Jwt_Storage_KeyName);
    // clear all swr data chache
    mutate(
      (key) => true, // which cache keys are updated -> filter function to clear all swr data
      undefined, // update cache data to `undefined`
      { revalidate: false } // do not revalidate
    );

    router.push(authPath);
  };

  return { login, logout };
};

export default useAuth;

export const login = (
  token: string,
  path?: string,
  userData?: Record<string, any>
) => {
  localStorage.setItem(CONST_Jwt_Storage_KeyName, token);
  if (path) {
    // see swr docs
    // This just tells swr to trigger a revalidation
    // isLoading becomes true
    // This is used in the AuthGuard component
    // mutate("/auth/profile", { data: userData });
    window.location.assign(path);
  }

  console.log("logging in", token);
};

export const logout = (authPath: string) => {
  localStorage.removeItem(CONST_Jwt_Storage_KeyName);
  // clear all swr data chache
  // mutate(
  //   (key) => true, // which cache keys are updated -> filter function to clear all swr data
  //   undefined, // update cache data to `undefined`
  //   { revalidate: false } // do not revalidate
  // );

  // history.pushState(null, "", authPath);
  window.location.assign(authPath);
};
