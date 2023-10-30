"use client";
import { StudioComment } from "@/helper/Channel";
import { getUploadTime } from "@/utils/CountFunctions";
import { Avatar } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const Main = () => {
  const [comments, setcomments] = useState(null);
  useEffect(() => {
    handleGetComments();
  }, []);
  const handleGetComments = async () => {
    try {
      const result = await StudioComment();
      console.log(result);
      setcomments(result);
    } catch (er) {
      if (er) console.log(er);
    }
  };
  return (
    <div className="">
      <p className="px-4 text-2xl py-6 font-semibold">Channel Comment</p>
      <hr className="border-[#3E3E3E]" />
      {comments
        ? comments.map(
            ({
              channel,
              comment,
              createdAt,
              video: { videoImage, videoTitle },
            }) => {
              return (
                <div className="flex items-center space-x-3 border-y-1 border-[#3E3E3E] py-2 px-4 hover:bg-[#1F1F1F]">
                  <div>
                    <Avatar src={channel?.image || user?.image} />
                  </div>
                  <div className="flex flex-col space-y-1 flex-1">
                    <div className="text-xs opacity-70">
                      @{channel?.channelUsername || user?.name} ·{" "}
                      {getUploadTime(createdAt)}
                    </div>
                    <div>{comment}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <img src={videoImage} alt="" className=" h-16" />
                    <div>
                      <p className="opacity-90 font-medium text-md">
                        {videoTitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )
        : null}
    </div>
  );
};

export default Main;
