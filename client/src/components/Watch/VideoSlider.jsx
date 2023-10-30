import React from "react";

export default function VideoSlider() {
  return (
    <div className="flex gap-2 my-2 ">
      <div className="relative">
        <img
          className="rounded-lg"
          src={`https://i.ytimg.com/vi/KUpwupYj_tY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDvxu_hJVIMwl4mONNzjioFB70OJA`}
          alt=""
          height={180}
          width={180}
        />
        <span className="absolute bg-black px-1 rounded-md text-xs text-white bottom-2 right-2 ">
          4:01
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="w-40 line-clamp-2 ">
          Tere Hawaale (Full Video) Laal Singh Chaddha | Aamir,Kareena |
          Arijit,Shilpa | Pritam,Amitabh,Advait
        </p>
        <p className="text-[#AAAAAA] text-sm font-medium">T-shirt</p>
        <p className="text-[#AAAAAA] text-sm font-medium">
          8.7M views · 7 year{" "}
        </p>
      </div>
    </div>
  );
}
