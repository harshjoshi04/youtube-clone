import { getUploadTime } from "@/utils/CountFunctions";
import React from "react";

export default function Details({ videoMedia, createdAt, videoDescription }) {
  return (
    <div className="bg-[#272727] w-full my-4 rounded-lg p-2">
      <p className="text-sm font-medium">
        {videoMedia?.views} views {getUploadTime(createdAt)}
      </p>
      <span className="text-xs text-opacity-65">{videoDescription}</span>
    </div>
  );
}
