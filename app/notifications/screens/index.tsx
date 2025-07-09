"use client";

import React from "react";
import { Wallet } from "lucide-react";
import TitleCatption from "@/components/title-caption";
import { formatDateString } from "@/lib/format-date";
import useSWR from "swr";
import { fetcher } from "@/swr";
import PageLocationIndicator from "@/components/layouts/page-location-indicator";
import EmptyState from "@/components/empty-state";
import DashboardLayout from "@/app/(dashboard)/_components/protected-layout";
export const dynamic = "force-dynamic";
type Props = {};

const NotificationsPage = (props: Props) => {
  const { data } = useSWR(`/notification/all`, fetcher);
  const notifications: any = data?.data?.notifications ?? [];
  return (
    <DashboardLayout>
      <PageLocationIndicator
        titleCaptionProps={{ title: "All Notifications" }}
      />
      <div className="container">
        {notifications?.length ? (
          <div className="grid gap-6 ">
            {notifications?.map((not: any, i: number) => {
              return (
                <div
                  key={i}
                  className="flex gap-4 border rounded-xl p-6 bg-[#FEFEFE]"
                >
                  <div className="h-12 w-12 rounded-full grid place-content-center text-[#787A8D] bg-muted">
                    <Wallet size={20} />
                  </div>
                  <TitleCatption
                    titleClassName=" text-base"
                    title={"Campaign Publish"}
                    caption={"Your campaign Test was recently published"}
                  />
                  <div className="ml-auto text-sm font-semibold">
                    {formatDateString(new Date().toISOString())}
                  </div>
                  {/* <button className="ml-auto text-primary font-semibold">Update Bank Account</button> */}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState title="No Notifications Yet" />
        )}
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
