"use client";
import {
  ActionLikeVideo,
  FindSubscriber,
  RemoveLikeVideo,
  SubscribeChannel,
  UnSubscribed,
} from "@/helper/Channel";
import { Avatar, Button, Tooltip } from "@nextui-org/react";

import React, { useEffect, useRef, useState } from "react";
import {
  BiDislike,
  BiLike,
  BiSolidBell,
  BiSolidDislike,
  BiSolidLike,
} from "react-icons/bi";
import { useSelector } from "react-redux";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import MainSkeleton from "./MainSkeleton";

export default function MainVideo({
  _id,
  channel,
  videoImage,
  videoSrc,
  videoTitle,
}) {
  const [sub, setsub] = useState(false);
  const videoRef = useRef(null);
  const [action, setaction] = useState("");
  const [disaction, setdisaction] = useState("");
  const user = useSelector((state) => state.userData.userInfo);
  const handleGetSubscriber = async () => {
    try {
      let obj = {
        channelid: channel?._id,
        videoid: _id,
      };
      let { sub, action: MediaAction } = await FindSubscriber(obj);
      setsub(sub);
      if (MediaAction == "like") {
        setaction("like");
      }
      if (MediaAction == "dislike") {
        setdisaction("dislike");
      }
    } catch (er) {
      if (er) console.log(er);
    }
  };
  useEffect(() => {
    if (user) {
      handleGetSubscriber();
    }
  }, [user, channel]);
  const handleSubscribe = async () => {
    if (user) {
      if (!sub) {
        setsub(true);
        await SubscribeChannel(channel?._id);
      } else {
        setsub(false);
        await UnSubscribed(channel?._id);
      }
    } else {
      alert("Login First");
    }
  };
  const handleLikeEvent = async (a) => {
    try {
      let obj = {
        videoId: _id,
        action: "like",
      };
      if ("like" != action) {
        if (disaction == "dislike") {
          let obj1 = {
            videoId: _id,
            action: "dislike",
          };
          setdisaction("");
          await RemoveLikeVideo(obj1);
        }
        setaction("like");
        await ActionLikeVideo(obj);
      } else {
        setaction("");
        await RemoveLikeVideo(obj);
      }
    } catch (er) {}
  };
  const handleDislikeEvent = async (a) => {
    try {
      let obj = {
        videoId: _id,
        action: "dislike",
      };
      if ("dislike" != disaction) {
        if (action == "like") {
          let obj1 = {
            videoId: _id,
            action: "like",
          };
          await RemoveLikeVideo(obj1);
          setaction("");
        }
        setdisaction("dislike");
        await ActionLikeVideo(obj);
      } else {
        setdisaction("");
        await RemoveLikeVideo(obj);
      }
    } catch (er) {
      if (er) console.log(er);
    }
  };
  const LikeIcon = action == "like" ? BiSolidLike : BiLike;
  const Dislike = disaction == "dislike" ? BiSolidDislike : BiDislike;
  return (
    <div className="flex flex-col gap-4 w-full h-auto">
      <div className="">
        <Player
          ref={videoRef}
          fluid={false}
          poster={videoImage}
          autoPlay
          width="100%"
          height={600}
          src={videoSrc}
        />
      </div>
      {channel ? (
        <div className="flex flex-col gap-3">
          <div className="text-lg font-medium">
            <p>
              {videoTitle}
              {/* <span className="text-blue-500">#rajpalyadavcomedy</span>{" "} */}
            </p>
          </div>
          {/* Like and Subscribe Section */}

          <div className="flex justify-between items-center ">
            <div className="flex gap-3 items-center">
              <Avatar size="md" src={channel?.image} />
              <div className="flex flex-col justify-start ">
                <p className="text-lg">{channel?.channelName}</p>
                <p className="text-xs text-gray-400">
                  {channel?.subscribes} subscribers
                </p>
              </div>
              {sub ? (
                <Button
                  className="rounded-full mx-4 bg-[#2B2E2E] text-white hover:bg-opacity-80 flex items-center "
                  onClick={handleSubscribe}
                >
                  <BiSolidBell size={20} id="bell" color="#fff" />
                  <span>Subscribed</span>
                </Button>
              ) : (
                <Button
                  className="rounded-full mx-4 bg-white hover:bg-opacity-80 "
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
              )}
            </div>
            <div className="bg-[#393939] px-4 py-1 text-white rounded-2xl flex gap-2 items-center justify-around">
              <Tooltip
                content="I Like This"
                delay={800}
                closeDelay={0}
                placement="bottom"
                className="bg-[#272727] "
              >
                <div
                  className=" flex items-center gap-1 cursor-pointer "
                  onClick={handleLikeEvent}
                >
                  <LikeIcon size={16} /> <span className="text-md">Like </span>
                </div>
              </Tooltip>
              |
              <div
                className="flex items-center cursor-pointer"
                onClick={handleDislikeEvent}
              >
                <Dislike size={18} id="demo" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MainSkeleton />
      )}
    </div>
  );
}
