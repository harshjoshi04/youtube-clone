"use client";
import { UserSignInApi, changeTrueAction } from "@/redux/user/userSlice";
import { Avatar, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { MdDashboard, MdEditRoad } from "react-icons/md";
import { PiVideoDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const Content = [
  {
    Icon: MdDashboard,
    title: "Dashboard",
  },
  {
    Icon: BiCommentDetail,
    title: "Comment",
  },
  {
    Icon: PiVideoDuotone,
    title: "Content",
  },
  {
    Icon: MdEditRoad,
    title: "Customization",
  },
];

export default function Sidemenu({ children }) {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const userInfo = useSelector((state) => state.userData.userInfo);
  const channel = useSelector((state) => state.userData.channel);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session && !userInfo) dispatch(UserSignInApi(session));
  }, [session]);
  useEffect(() => {
    if (userInfo && !channel) router.push("/");
  }, [channel, userInfo]);

  return (
    <div className="flex h-full border-t-2 border-[#3E3E3E]">
      <div className=" h-full flex flex-col gap-3  justify-start py-2  min-w-[12%]">
        <div className="flex flex-col items-center gap-2 mb-2">
          <Avatar className="w-28 h-28" src={channel?.image} />

          <div className="text-center">
            <p className="text-sm font-medium">Your Channel</p>
            <p className="text-xs text-[#A0A0A0]">{channel?.channelName}</p>
          </div>
        </div>
        {Content.map(({ Icon, title }, index) => {
          let check = pathname?.includes(title.toLocaleLowerCase());
          return (
            <Link
              href={`/studio/${title.toLocaleLowerCase()}`}
              className={`flex  items-center space-x-3 py-2 transition-all  px-4  cursor-pointer ${
                check
                  ? "border-l-3 border-red-500 text-red-500 bg-[#1F1F1F] "
                  : "text-[#979797]"
              }`}
              onClick={() => {
                dispatch(changeTrueAction());
              }}
              key={index}
            >
              <Icon size={20} />
              <p className="font-medium text-sm ">{title}</p>
            </Link>
          );
        })}
      </div>
      <div className="w-full border-l border-[#757575] bg-[#1F1F1F] border-opacity-40 h-[100%] ">
        {channel ? (
          <div className="h-[96%] bg-[#282828]">{children}</div>
        ) : (
          <div className="flex justify-center items-center h-[96%] ">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
