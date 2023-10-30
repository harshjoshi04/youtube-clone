"use client";
import { Avatar, Button, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page({ params: { id } }) {
  const router = useRouter();
  if (id == (undefined || null)) {
    router.push("/");
  }

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="flex justify-between">
        <div className="flex gap-6">
          <Avatar className="w-32 h-32" />
          <div className="flex flex-col gap-2 justify-start pt-2">
            <p className="text-2xl font-medium">Harsh Joshi</p>
            <p className="text-sm flex gap-3 text-[#AAAAAA] ">
              <span className="font-bold ">@Demo </span>
              <span>Subscribers</span>
              <span>video</span>
            </p>
            <p className="text-[#AAAAAA]">Harsh Joshi</p>
          </div>
        </div>
        <div className="flex gap-3 pt-3">
          <Button
            size="sm"
            radius="lg"
            className="font-medium text-sm bg-[#272727] text-white"
          >
            Customize channel
          </Button>
          <Button
            size="sm"
            radius="lg"
            className="font-medium text-sm bg-[#272727] text-white"
          >
            Manage video
          </Button>
        </div>
      </div>
      <div className="text-white ">
        <Tabs
          size="lg"
          aria-label="Options"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider py-4",
            cursor: "w-full bg-[#fff]",
            tab: "max-w-full px-4 h-12 ",
            tabContent: "group-data-[selected=true]:text-[#fff]",
          }}
          variant="underlined"
        >
          <Tab key="home" title="Home">
            de
          </Tab>
          <Tab key="video" title="Video">
            Video
          </Tab>
          <Tab key="about" title="About">
            About
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
