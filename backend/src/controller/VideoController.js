import createHttpError from "http-errors";
import asyncErrorHandler from "../utils/AsyncErrorhandler.js";
import jwt from "jsonwebtoken";
import UploadImage from "../utils/UploadImage.js";
import { v4 as uuidv4 } from "uuid";
import VideoModel from "../model/VideoModel.js";
import ChannelModel from "../model/ChannelModel.js";
import subscribesModel from "../model/subscribes.js";
import mongoose from "mongoose";
import LikesModel from "../model/Likes.js";
import CommentModel from "../model/CommentModel.js";

export const UploadVideo = asyncErrorHandler(async (req, res, next) => {
  const { videoSrc, image, videoTitle, videoDescription } = req.body;

  if (!(videoTitle || videoDescription)) {
    next(createHttpError(404, "Field Not Found"));
  } else {
    const findUser = await ChannelModel.findOne({ userId: req.userId });
    const imageId = uuidv4().split("-")[0];
    const imageUrl = await UploadImage(image, imageId);
    console.log(imageUrl);
    const result = new VideoModel({
      videoChannel: findUser?.userId,
      videoSrc,
      videoImage: imageUrl,
      videoTitle: videoTitle,
      videoDescription: videoDescription,
    });
    let data = await result.save();
    console.log(data);
    res.send(data);
  }
});

export const FindAllVideo = asyncErrorHandler(async (req, res, next) => {
  const result = await VideoModel.aggregate([
    {
      $lookup: {
        from: "channels",
        localField: "videoChannel",
        foreignField: "userId",
        as: "channel",
      },
    },
    {
      $unwind: "$channel",
    },
  ]);
  res.status(201).send(result);
});

export const FindVideo = asyncErrorHandler(async (req, res, next) => {
  let { w } = req.query;
  if (!w) {
    next(createHttpError(404, "Query Not Found..."));
  } else {
    let key = new mongoose.Types.ObjectId(w);
    const findVideo = await VideoModel.aggregate([
      { $match: { _id: key } },
      {
        $lookup: {
          from: "channels",
          localField: "videoChannel",
          foreignField: "userId",
          as: "channel",
        },
      },
      {
        $unwind: "$channel",
      },
    ]);
    const updateView = await VideoModel.findByIdAndUpdate(
      { _id: w },
      { $inc: { "videoMedia.views": 1 } }
    );
    res.send(findVideo[0]);
  }
});

export const Subscribe = asyncErrorHandler(async (req, res, next) => {
  const { channelId } = req.body;
  if (!channelId) {
    next(createHttpError(404, "Channel field not found..."));
  } else {
    const updateSubscribe = await ChannelModel.findByIdAndUpdate(
      { _id: channelId },
      { $inc: { subscribes: 1 } }
    );
    console.log(updateSubscribe);
    const result = new subscribesModel({
      userId: req.userId,
      channelId,
    });
    const data = await result.save();
    res.send(data);
  }
});

export const FindSubscriber = asyncErrorHandler(async (req, res, next) => {
  const { channelid: channelId, videoid: videoId } = req.query;
  if (!channelId) {
    next(createHttpError(404, "Channel field not found..."));
  } else {
    const result = await subscribesModel.findOne({
      userId: req.userId,
      channelId,
    });
    const { action } = await LikesModel.findOne({
      videoId,
      userId: req.userId,
    });
    res.json({ sub: !!result, action });
  }
});

export const UnSubscribed = asyncErrorHandler(async (req, res, next) => {
  const { channelid: channelId } = req.query;
  if (!channelId) {
    next(createHttpError(404, "Channle field not found..."));
  } else {
    const updateSub = await ChannelModel.findByIdAndUpdate(
      { _id: channelId },
      { $inc: { subscribes: -1 } }
    );
    const deleteSub = await subscribesModel.deleteOne({
      userId: req.userId,
      channelId,
    });
    res.send(deleteSub);
  }
});

export const ActionVideo = asyncErrorHandler(async (req, res, next) => {
  const { action, videoId } = req.body;
  if (!(action || videoId)) {
    next(createHttpError(404, "Field Not Found..."));
  } else {
    if (action == "like") {
      let UpdateVideo = await VideoModel.findOneAndUpdate(
        { _id: videoId },
        { $inc: { "videoMedia.like": 1 } }
      );
    } else {
      let UpdateVideo = await VideoModel.findOneAndUpdate(
        { _id: videoId },
        { $inc: { "videoMedia.dislike": 1 } }
      );
    }
    const result = new LikesModel({
      videoId,
      userId: req.userId,
      action,
    });
    const data = await result.save();
    res.send(data);
  }
});

export const ActionRemoveVideo = asyncErrorHandler(async (req, res, next) => {
  const { action, videoid: videoId } = req.query;
  if (!(action || videoId)) {
    next(createHttpError(404, "Field Not Found..."));
  } else {
    if (action == "like") {
      let UpdateVideo = await VideoModel.findOneAndUpdate(
        { _id: videoId },
        { $inc: { "videoMedia.like": -1 } }
      );
    } else {
      let UpdateVideo = await VideoModel.findOneAndUpdate(
        { _id: videoId },
        { $inc: { "videoMedia.dislike": -1 } }
      );
    }
    const result = await LikesModel.findOneAndDelete({
      videoId,
      userId: req.userId,
      action,
    });

    res.send("deon");
  }
});

export const AddComment = asyncErrorHandler(async (req, res, next) => {
  const { comment, videoId } = req.body;

  if (comment && videoId) {
    const result = new CommentModel({
      userId: req.userId,
      videoId,
      comment,
    });
    const data = await result.save();
    res.send(data);
  } else {
    next(createHttpError(404, "Field must be required..."));
  }
});

export const FindComments = asyncErrorHandler(async (req, res, next) => {
  const { videoid: videoId } = req.query;
  if (!videoId) {
    next(createHttpError(404, "Video Not Found..."));
  } else {
    const result = await CommentModel.aggregate([
      {
        $match: { videoId },
      },
      { $addFields: { userObjId: { $toObjectId: "$userId" } } },
      {
        $lookup: {
          from: "users",
          localField: "userObjId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "channels",
          localField: "userId",
          foreignField: "userId",
          as: "channel",
        },
      },
      { $unwind: "$channel" },
      { $unwind: "$user" },
    ]);
    res.send(result);
  }
});

export const GetAllComment = asyncErrorHandler(async (req, res, next) => {
  const result = await CommentModel.aggregate([
    {
      $addFields: { videoid: { $toObjectId: "$videoId" } },
    },
    {
      $addFields: { MainId: { $toObjectId: "$userId" } },
    },
    {
      $lookup: {
        from: "channels",
        localField: "userId",
        foreignField: "userId",
        as: "channel",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "MainId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videoid",
        foreignField: "_id",
        as: "video",
      },
    },
    {
      $unwind: "$channel",
    },
    {
      $unwind: "$video",
    },
    {
      $unwind: "$user",
    },
    {
      $project: { videoid: 0, MainId: 0 },
    },
    {
      $match: { "video.videoChannel": req.userId },
    },
  ]);
  res.send(result);
});
