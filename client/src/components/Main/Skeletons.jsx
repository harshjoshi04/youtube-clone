"use client ";
import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function Skeletons() {
  return (
    <div className="dark flex gap-4 ">
      <div className="flex flex-col py-4 cursor-pointer">
        <div className="relative">
          <Skeleton className="rounded-lg">
            <div className="w-[15vw] h-[17vh] rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
        <div className="py-2  px-1 ">
          <div className="flex gap-3 items-start">
            <div className="pt-2">
              <Skeleton className="flex rounded-full w-10 h-10" />
            </div>
            <div className="dark flex flex-col  gap-2 pt-3.5">
              <Skeleton className="h-3 w-[8vw] rounded-lg bg-default-300" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-10 rounded-lg bg-default-300" />
                <Skeleton className="h-3 w-20 rounded-lg bg-default-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
