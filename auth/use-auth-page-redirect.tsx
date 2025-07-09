"use client";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthPageRedirect = (link: string = "/student") => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("redirecting...", link);
      router.push(link);
    }
  }, [user, router, link]);
};

export default useAuthPageRedirect;
