"use client";

import { Avatar } from "@nextui-org/react";

import React, { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
export default function Nav() {
  const Action = useSelector((state) => state.userData.Action);

  const channel = useSelector((state) => state.userData.channel);

  return (
    <>
      <div className="absolute">
        <div className={`loader-line ${Action == true ? "" : "hidden"}`}></div>
      </div>
      <div className="flex justify-between p-4 ">
        <div className="flex gap-6 items-center">
          <FiMenu size={22} />
          <img
            src="https://www.gstatic.com/youtube/img/creator/yt_studio_logo_white.svg"
            alt=""
            srcset=""
            className="w-24 h-full"
          />
        </div>
        <div className="relative">
          <BiSearch
            className="absolute bottom-3.5 left-3 cursor-pointer"
            size={16}
            color="#757575"
          />
          <input
            type="text"
            className="px-4 pl-10 py-1 bg-transparent border-1 border-[#606060] placeholder:text-[#606060] placeholder:font-normal "
            placeholder="Search across your channel"
            size={50}
          />
        </div>
        <div>
          <Avatar size={16} src={channel?.image} />
        </div>
      </div>
    </>
  );
}
