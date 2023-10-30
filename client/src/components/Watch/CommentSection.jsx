"use client";
import { Avatar, Button } from "@nextui-org/react";
import { VscSend } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddComment, FindComments } from "@/helper/Channel";
import { getUploadTime } from "@/utils/CountFunctions";

export default function CommentSection({ id }) {
  const [commentList, setCommentList] = useState([]);
  const [actionChange, setactionChange] = useState(false);
  const [comment, setcomment] = useState("");
  const user = useSelector((state) => state.userData.userInfo);
  const handleClickComment = async () => {
    await AddComment({ videoId: id, comment });
    setcomment("");
    setactionChange(!actionChange);
  };
  const handleGetComments = async () => {
    try {
      const result = await FindComments(id);
      setCommentList(result);
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    handleGetComments();
  }, [actionChange]);
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="text-md font-normal">13,222 Comments</div>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <Avatar src={user?.image} size="md" />

            <input
              type="text"
              className=" bg-transparent border-b border-b-[#272727] transition-all  focus:border-b-white w-full"
              onChange={(e) => setcomment(e.target.value)}
              value={comment}
              size={"100%"}
            />

            <Button
              className={` text-white rounded-full ${
                !comment ? "bg-[#272727] text-opacity-60" : "bg-blue-600 "
              }  `}
              disabled={!comment}
              onClick={handleClickComment}
            >
              <VscSend size={26} />
              Comment
            </Button>
          </>
        )}
      </div>
      <div className="flex flex-col justify-items-start space-y-3 ">
        {commentList &&
          commentList.map(({ _id, comment, user, channel, createdAt }) => {
            return (
              <div className="flex my-4 space-x-4 items-center" key={_id}>
                {channel?.image ? (
                  <Avatar src={channel?.image} />
                ) : (
                  <Avatar src={user?.image} />
                )}
                <div className="flex flex-col ">
                  <div className="flex items-center space-x-2">
                    {channel?.channelUsername ? (
                      <p>@{channel?.channelUsername}</p>
                    ) : (
                      <p>{user?.name}</p>
                    )}
                    <p className="text-xs opacity-75">
                      {getUploadTime(createdAt)}
                    </p>
                  </div>
                  <p className="opacity-80">{comment}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
