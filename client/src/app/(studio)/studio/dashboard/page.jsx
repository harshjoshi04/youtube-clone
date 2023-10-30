"use client";
import Main from "@/components/common/studio/Dashboard/Main";
import { ChangeFalse } from "@/utils/ExtraFun";
import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const Action = useSelector((state) => state.userData.Action);
  ChangeFalse();
  return <Main />;
}
