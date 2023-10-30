"use client";
import { RiMenuFill } from "react-icons/ri";
import { BsBell, BsPersonWorkspace, BsSearch } from "react-icons/bs";
import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSignInApi } from "@/redux/user/userSlice";
import { SiYoutubestudio } from "react-icons/si";
import { BiExit, BiLike } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { MdSubscriptions } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useDisclosure } from "@nextui-org/react";
import ChannleModel from "../context/ChannleModel";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function TitleBar() {
  const [start, setstart] = useState(false);
  const [open, setopen] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userInfo = useSelector((state) => state.userData.userInfo);
  const channel = useSelector((state) => state.userData.channel);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  useEffect(() => {
    if (session && !userInfo) {
      dispatch(UserSignInApi(session));
    }
  }, [session]);
  const MenuIcon = open ? IoMdClose : RiMenuFill;
  const Items = [
    {
      Icon: BsPersonWorkspace,
      title: "Your Channel",
      location: "",
      fun: () => {
        if (channel != null) router.push(`/${channel?.channelUsername}`);
        setstart(false);
        onOpen();
      },
    },
    {
      Icon: SiYoutubestudio,
      title: "Your Studio",
      location: "",
      fun: () => {
        if (channel != null) router.push("/studio/dashboard");
        onOpen();
        setstart(false);
      },
    },
    {
      Icon: BiExit,
      title: "Sign Out",
      location: "",
      fun: () => {
        signOut();
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-between px-4 py-4">
        <div className="flex gap-4 items-center transition-all">
          <MenuIcon
            className="cursor-pointer"
            size={20}
            onClick={() => {
              setopen(!open);
            }}
          />

          <svg
            className="external-icon text-white"
            viewBox="0 0 90 20"
            focusable="false"
            width={100}
            style={{
              pointerEvents: "none",
              display: " block",
            }}
          >
            <svg
              viewBox="0 0 90 20"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                  fill="#FF0000"
                ></path>
                <path
                  d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
                  fill="white"
                ></path>
              </g>
            </svg>
          </svg>
        </div>
        <div>
          <div className="border-2 border-[#222222] rounded-full flex focus:outline">
            <div className="py-1">
              <input
                type="text"
                className="bg-[#0f0f0f] pl-4 rounded-s-full outline-none placeholder-[#888888]"
                placeholder="Search"
                size={55}
              />
            </div>
            <div className="flex items-center bg-[#222222] px-4 rounded-e-full">
              <BsSearch />
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {userInfo ? (
            <>
              <BsBell size={20} />
              <Popover isOpen={start} onOpenChange={(open) => setstart(open)}>
                <PopoverTrigger>
                  <Avatar
                    src={userInfo?.image}
                    className="bg-[#0f0f0f] text-white border-2 border-[#222222] cursor-pointer"
                  />
                </PopoverTrigger>
                <PopoverContent className="bg-[#282828] rounded-lg px-0">
                  <div className="flex gap-3 items-start py-2 px-3">
                    <Avatar src={userInfo?.image} size="md" />
                    <div>
                      <p className="text-base font-normal">{userInfo?.name}</p>
                      <p className="text-base font-normal">{userInfo?.email}</p>
                    </div>
                  </div>
                  <hr className="border-1 border-white w-[100%] border-opacity-50" />
                  <div className="flex flex-col py-3 gap-2 w-full ">
                    {Items.map(({ Icon, title, location, fun }, index) => {
                      return (
                        <div
                          className="flex justify-start gap-5 items-center transition-all px-3 py-1 hover:bg-[#353535] cursor-pointer "
                          key={index}
                          onClick={fun}
                        >
                          <Icon size={20} className="text-opacity-75" />
                          <p className="text-base font-normal">{title}</p>
                        </div>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <button
              className="bg-[#222222] px-4 py-1 rounded-lg"
              onClick={() => {
                deleteCookie("token");
                signIn();
              }}
            >
              Sing Up
            </button>
          )}
        </div>
      </div>
      {!channel && <ChannleModel isOpen={isOpen} onOpenChange={onOpenChange} />}
      <div
        className={`transition-all bg-[#0F0F0F] fixed z-50 h-full w-[12vw]  ${
          !open && "-translate-x-[200%]"
        }`}
      >
        <div className="flex flex-col gap-4 px-4">
          <div className="flex items-center gap-3 bg-[#3F3F3F] bg-opacity-80 pl-4 py-1 rounded-lg w-[80%]">
            <GoHomeFill size={20} />
            <p className="text-md font-normal">Home</p>
          </div>
          <div className="flex items-center gap-3  bg-opacity-80 pl-4 py-1 rounded-lg w-[80%]">
            <MdSubscriptions size={20} />
            <p className="text-md font-normal">Subscriptions</p>
          </div>
          <div className="flex items-center gap-3  bg-opacity-80 pl-4 py-1 rounded-lg w-[80%]">
            <BiLike size={20} />
            <p className="text-md font-normal">Likes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
