"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { FINDCHANNEL } from "./Apis";

const token = getCookie("token");

const useDebouncing = (val) => {
  const [loading, setLoading] = useState(false);
  const [debounce, setdebounce] = useState("");
  useEffect(() => {
    if (val) setLoading(true);
    const handleTimeSet = setTimeout(async () => {
      const { data } = await axios.get(`${FINDCHANNEL}?username=${val}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      if (data) setdebounce(true);
      else setdebounce(false);
      setLoading(false);
    }, 800);
    return () => {
      clearTimeout(handleTimeSet);
    };
  }, [val]);
  return [debounce, loading];
};

export default useDebouncing;
