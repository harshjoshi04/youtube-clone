import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { Dbconnection } from "./config/db.js";
import Errorhandler from "./utils/ErrorHandler.js";
import userRouter from "./router/userRout.js";
import { v2 as cloudinary } from "cloudinary";
import morgan from "morgan";

import routerVideo from "./router/VideosRoute.js";
const server = express();

// Middlwares
server.use(cors({ origin: "*", credentials: true }));
server.use(express.json({ limit: "1gb" }));
server.use(express.urlencoded({ extended: false, limit: "1gb" }));
server.use(morgan("dev"));

// File Upload

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// router
server.use("/api/user", userRouter);
server.use("/api/channel", routerVideo);

// Error handler
server.use(Errorhandler);

Dbconnection().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`server start at ${process.env.PORT}`);
  });
});
