import { Schema, model } from "mongoose";

const LikeSchema = new Schema(
  {
    videoId: {
      type: String,
    },
    userId: {
      type: String,
    },
    action: {
      type: String,
    },
  },
  { timestamps: true }
);

const LikesModel = model("likes", LikeSchema);

export default LikesModel;
