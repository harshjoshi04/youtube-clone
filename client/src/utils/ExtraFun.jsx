"use client";
import { changeFalseAction } from "@/redux/user/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export const ChangeFalse = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeFalseAction());
  }, []);
};
