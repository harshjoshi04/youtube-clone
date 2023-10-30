"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { ChangeFalse } from "@/utils/ExtraFun";
export default function Home() {
  ChangeFalse();
  return (
    <div className="pt-6 relative w-full">
      <p className="font-semibold text-2xl px-6 pb-6">Channel customization</p>
      <Tabs
        aria-label="Options"
        variant="underlined"
        size="lg"
        classNames={{
          tabList:
            "gap-6 w-[88vw]  relative rounded-none px-6 border-b border-divider border-[#757575] ",
          cursor: "w-full h-1 rounded-sm bg-blue-400 absolute -bottom-1",
          tab: "max-w-fit px-0 ",
          tabContent:
            "group-data-[selected=true]:text-blue-400 text-md font-medium px-1",
        }}
      >
        <Tab key="info" title="Bace Info">
          deljfj
        </Tab>
        <Tab key="branding" title="Branding">
          deljfj
        </Tab>
      </Tabs>
      <div className="absolute top-10 right-1">demo</div>
    </div>
  );
}
