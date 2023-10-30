"use client";
import Main from "@/components/common/studio/Comment/Main";
import { ChangeFalse } from "@/utils/ExtraFun";
import React from "react";

export default function Home() {
  ChangeFalse();
  return <Main />;
}
