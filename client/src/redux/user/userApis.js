import { FINDALLVIDEOS, USERSIGNIN } from "@/utils/Apis";
import axios from "axios";
import { setCookie } from "cookies-next";

export function userSignIn(obj) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(USERSIGNIN, obj);
      setCookie("token", data.token);
      resolve({ data });
    } catch (er) {
      console.log(er);
      if (er) {
        reject(er);
      }
    }
  });
}

export function Videos() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(FINDALLVIDEOS);
      resolve({ data });
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
}
