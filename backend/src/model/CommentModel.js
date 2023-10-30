import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "UserId must be required..."],
    },
    videoId: {
      type: String,
      required: [true, "VideoId must be required..."],
    },
    comment: {
      type: String,
      required: [true, "Comment must be required..."],
    },
  },
  { timestamps: true }
);

const CommentModel = model("Comments", CommentSchema);

export default CommentModel;
