import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const LoadingDetails = (props: Props) => {
  return (
    <div className="sm:max-w-[500px]">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-6 w-12" />
      </div>

      <div className=" mb-4 max-w-[391px] mt-2">
        <Skeleton className=" h-6" />
      </div>

      <Skeleton className=" w-full h-8 mt-10" />
      <div className="flex items-center gap-4 mt-10">
        <Skeleton className=" h-12 flex-1 rounded-full" />
        <Skeleton className="h-12 flex-1 rounded-full" />
      </div>
    </div>
  );
};

export default LoadingDetails;
