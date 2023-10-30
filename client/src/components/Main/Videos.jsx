"use client";
import React, { useEffect } from "react";
import VidoeList from "./VidoeList";
import { useDispatch, useSelector } from "react-redux";
import { FindAllVidesApi } from "@/redux/user/userSlice";
import Skeletons from "./Skeletons";

export default function Videos() {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.userData.video);
  useEffect(() => {
    dispatch(FindAllVidesApi());
  }, []);
  return (
    <div className="grid  lg:grid-cols-6  md:grid-cols-3  grid-cols-1  px-4 justify-center  ">
      {videos ? (
        videos.map((val, index) => {
          console.log(val);
          return <VidoeList {...val} />;
        })
      ) : (
        <Skeletons />
      )}
    </div>
  );
}
