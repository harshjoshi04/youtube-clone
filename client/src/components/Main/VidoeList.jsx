"use client";
import { CountVideoTime, getUploadTime } from "@/utils/CountFunctions";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Player } from "video-react";

export default function VidoeList({
  _id,
  videoImage,
  videoTitle,
  videoSrc,
  channel: { channelName, image },
  videoMedia: { views },
  createdAt,
}) {
  const videoRef = useRef();
  const [videoTime, setvideoTime] = useState(0);
  useEffect(() => {
    let pl = videoRef.current.video;
    setvideoTime(pl.props.player.duration);
  }, [videoRef.current]);
  return (
    <div className="flex gap-5 ">
      <div className="hidden">
        <Player ref={videoRef} src={videoSrc} />
      </div>
      <Link
        href={`/watch?w=${_id}`}
        className="flex flex-col py-4 cursor-pointer"
      >
        <div className="relative">
          <img
            className="rounded-lg"
            src={videoImage}
            alt=""
            height={300}
            width={300}
          />
          <span className="absolute bg-black px-1 rounded-md text-xs text-white bottom-2 right-2 ">
            {CountVideoTime(videoTime)}
          </span>
        </div>
        <div className="py-4 px-1 ">
          <div className="flex gap-3 items-start">
            <div className="pt-2">
              <Avatar size="sm" src={image} />
            </div>
            <div className=" flex flex-col  gap-0.5">
              <p className="w-64 line-clamp-2">{videoTitle}</p>
              <span className="text-sm text-white text-opacity-70 font-normal">
                {channelName}
              </span>
              <span className="text-sm text-white text-opacity-70">
                {views} views · {getUploadTime(createdAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
