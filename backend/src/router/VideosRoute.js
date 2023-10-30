import { Router } from "express";
import {
  ActionRemoveVideo,
  ActionVideo,
  AddComment,
  FindComments,
  FindSubscriber,
  FindVideo,
  GetAllComment,
  Subscribe,
  UnSubscribed,
  UploadVideo,
} from "../controller/VideoController.js";
import auth from "../middleware/authenicate.js";

const router = Router();

// GET

router.get("/find-video", FindVideo);
router.get("/find-subscriber", auth, FindSubscriber);
router.get("/find-comment", FindComments);
router.get("/all-comment", auth, GetAllComment);
// POST
router.post("/upload-video", auth, UploadVideo);
router.post("/action-video", auth, ActionVideo);
router.post("/add-comment", auth, AddComment);
// PUT
router.put("/subscribes", auth, Subscribe);

// DELETE
router.delete("/unsubscribe", auth, UnSubscribed);
router.delete("/remove-action", auth, ActionRemoveVideo);

export default router;
