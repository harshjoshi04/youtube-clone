import { Schema, model } from "mongoose";

const VideoSchema = new Schema(
  {
    videoChannel: {
      type: String,
    },
    videoSrc: {
      type: String,
    },
    videoImage: {
      type: String,
    },
    videoTitle: {
      type: String,
      required: [true, "Must be required"],
    },
    videoDescription: {
      type: String,
      required: [true, "Must be required"],
    },
    videoMedia: {
      like: {
        type: Number,
        default: 0,
      },
      dislike: {
        type: Number,
        default: 0,
      },
      views: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const VideoModel = model("videos", VideoSchema);

export default VideoModel;
