"use client";
import VideoModel from "@/components/context/VideoModel";
import { Avatar, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import React from "react";

export default function Main() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <VideoModel isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="px-6 py-4 flex flex-col  gap-6">
        <div>
          <p className="font-semibold text-xl">Channel Dashboard</p>
        </div>
        <div className="bg-[#282828] h-[45vh] w-[18vw] border-1  border-[#757575] border-opacity-25 rounded">
          <div className="m-3 h-[94%] rounded border-2 border-opacity-25 border-dotted border-[#757575] flex justify-center items-center">
            <div className="flex-col justify-center space-y-2">
              <Avatar
                src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3_darkmode.svg"
                className="bg-transparent w-28 h-28"
              />

              <div className="pl-2">
                <label htmlFor="" onClick={onOpen}>
                  <p className="rounded-xl px-6 py-2 bg-blue-600 cursor-pointer">
                    Upload
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
