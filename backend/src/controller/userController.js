import createHttpError from "http-errors";
import UserDb from "../model/userModel.js";
import asyncErrorHandler from "../utils/AsyncErrorhandler.js";
import jwt from "jsonwebtoken";
import ChannelModel from "../model/ChannelModel.js";
import UploadImage from "../utils/UploadImage.js";
import { v4 as uuidv4 } from "uuid";

export const userSignIn = asyncErrorHandler(async (req, res, next) => {
  const { user } = req.body;
  if (user) {
    const findUser = await UserDb.findOne({ email: user?.email });
    if (!findUser) {
      const newUser = new UserDb({
        name: user?.name,
        email: user?.email,
        image: user?.image,
      });
      const result = await newUser.save();
      let token = jwt.sign({ id: result?._id }, process.env.SECRET_KEY);
      res.status(201).json({ result, token, channel: null });
    } else {
      let token = jwt.sign({ id: findUser?._id }, process.env.SECRET_KEY);
      const findChannel = await ChannelModel.findOne({ userId: findUser._id });
      res.status(201).json({ result: findUser, token, channel: findChannel });
    }
  } else next(createHttpError(404, "User not found !"));
});

export const createChannel = asyncErrorHandler(async (req, res, next) => {
  const { cname, cusername, image, change } = req.body;
  if (!(cname && cusername)) {
    next(createHttpError(404, "User Detail not Found"));
  } else {
    const imageId = uuidv4().split("-")[0];
    if (change != null) {
      const img = UploadImage(image, imageId);
    }
    const Channel = new ChannelModel({
      userId: req.userId,
      channelName: cname,
      channelUsername: cusername,
      image: change != null ? img : image,
    });

    const result = await Channel.save();
    res.status(201).send(result);
  }
});

export const FindChannel = asyncErrorHandler(async (req, res, next) => {
  const { username } = req.query;
  const result = await ChannelModel.findOne({ channelUsername: username });
  res.status(201).send(result);
});
