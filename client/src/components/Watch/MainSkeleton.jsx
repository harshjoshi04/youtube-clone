"use client";
import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function MainSkeleton() {
  return (
    <div className="dark flex flex-col space-y-4">
      <div>
        <Skeleton className="w-[15vw] rounded-lg">
          <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>

      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
      <div>
        <Skeleton className=" rounded-lg">
          <div className="h-20 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </div>
  );
}
