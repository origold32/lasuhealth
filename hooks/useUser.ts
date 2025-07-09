"use client";
import { fetcher } from "@/swr";
import useSWR from "swr";

export default function useUser() {
  const { data, isLoading, mutate } = useSWR("/auth/profile", fetcher, {
    keepPreviousData: true,
  });
  // console.log("data is in useUser", data);

  return { user: data?.data, isLoading, mutateUser: mutate };
}
