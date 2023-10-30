"use client";
import React, { useEffect, useState } from "react";
import MainVideo from "./MainVideo";
import Details from "./Details";
import CommentSection from "./CommentSection";
import VideoSlider from "./VideoSlider";
import { FindVideo } from "@/helper/Channel";
import { useSearchParams } from "next/navigation";
export default function Watch() {
  const [video, setvideo] = useState(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    FindVideo(searchParams.get("w")).then((val) => {
      setvideo(val);
    });
  }, []);

  return (
    <div className="flex  space-x-3 pl-20 py-6 w-full overflow-auto ">
      <div className=" min-w-[73vw] px-4">
        <MainVideo {...video} />
        {video && (
          <>
            <Details {...video} />
            <CommentSection id={searchParams.get("w")} />
          </>
        )}
      </div>
      <div>
        <VideoSlider />
      </div>
    </div>
  );
}
