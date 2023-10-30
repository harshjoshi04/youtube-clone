import { Schema, model } from "mongoose";

const ChannelSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "UserId Not Found "],
    },
    channelName: {
      type: String,
      required: [true, "ChannelName not found..."],
    },
    channelUsername: {
      type: String,
      required: [true, "ChannelUsername not found..."],
      unique: [true, "ChannnelUsername must be unique..."],
    },
    image: {
      type: String,
      required: [true, "Image Not Found"],
    },
    subscribes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ChannelModel = model("channels", ChannelSchema);

export default ChannelModel;
