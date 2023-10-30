import { Router } from "express";

import {
  FindChannel,
  createChannel,
  userSignIn,
} from "../controller/userController.js";
import authenicate from "../middleware/authenicate.js";
import { FindAllVideo } from "../controller/VideoController.js";
const router = Router();

// GET

router.get("/find-channel", authenicate, FindChannel);
router.get("/all-video", FindAllVideo);

// POST
router.post("/signin", userSignIn);
router.post("/craete-channel", authenicate, createChannel);

export default router;
