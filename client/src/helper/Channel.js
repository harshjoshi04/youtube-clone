import { getCookie } from "cookies-next";
import axios from "axios";
import {
  ACTION_LIKEVIDEO,
  ADD_COMMENT,
  CREATE_CHANNEL,
  FINDONEVIDEO,
  FIND_COMMETS,
  FIND_SUBSCRIBER,
  REMOVE_LIKEVIDEO,
  STD_COMMETS,
  SUBSCRIBE,
  UNSUBSCRIBER,
  UPLOAD_VIDEO,
} from "@/utils/Apis";
const token = getCookie("token");
const tokenHeader = {
  headers: {
    authorization: "Bearer " + token,
  },
};
export const CraeteChannel = (obj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(CREATE_CHANNEL, obj, tokenHeader);
      resolve(data);
    } catch (er) {
      if (er) reject(er);
    }
  });
};

export const VideoUpload = (obj) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(obj);
      const { data } = await axios.post(UPLOAD_VIDEO, obj, tokenHeader);

      resolve(data);
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
};

export const FindVideo = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${FINDONEVIDEO}?w=${id}`);
      resolve(data);
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
};

export const SubscribeChannel = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let obj = {
        channelId: id,
      };
      const { data } = await axios.put(SUBSCRIBE, obj, tokenHeader);
      resolve("Done");
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
};

export const FindSubscriber = ({ channelid, videoid }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `${FIND_SUBSCRIBER}?channelid=${channelid}&videoid=${videoid}`,
        tokenHeader
      );
      resolve(data);
    } catch (er) {
      if (er) reject(er);
    }
  });
};

export const UnSubscribed = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.delete(
        `${UNSUBSCRIBER}?channelid=${id}`,
        tokenHeader
      );
      resolve("Done");
    } catch (er) {
      if (er) reject(er);
    }
  });
};

export const ActionLikeVideo = (obj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(ACTION_LIKEVIDEO, obj, tokenHeader);

      resolve(data);
    } catch (er) {
      if (er) reject(er);
    }
  });
};

export const RemoveLikeVideo = ({ videoId, action }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.delete(
        `${REMOVE_LIKEVIDEO}?videoid=${videoId}&action=${action}`,
        tokenHeader
      );
      resolve("Done");
    } catch (er) {
      if (er) console.log(er);
    }
  });
};

export const AddComment = (obj) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(obj);
      const { data } = await axios.post(ADD_COMMENT, obj, tokenHeader);
      resolve("Done");
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
};

export const FindComments = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `${FIND_COMMETS}?videoid=${id}`,
        tokenHeader
      );
      resolve(data);
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
};

export const StudioComment = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(STD_COMMETS, tokenHeader);
      resolve(data);
    } catch (er) {
      if (er) {
        console.log(er);
        reject(er);
      }
    }
  });
};
