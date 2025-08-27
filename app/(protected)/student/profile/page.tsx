"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Profile from "./profile";

export default function Page() {
  return (
    <>
      <ScrollArea className="h-[90vh] mt-6 pb-10">
        <div className="flex flex-col space-y-4">
          <Profile />
        </div>
      </ScrollArea>
    </>
  );
}
