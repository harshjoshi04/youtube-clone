import { Schema, model } from "mongoose";

const SubscribeSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "Field Must Be Required..."],
    },
    channelId: {
      type: String,
      required: [true, "Channel Required...."],
    },
  },
  { timestamps: true }
);

const subscribesModel = model("subscribers", SubscribeSchema);

export default subscribesModel;
