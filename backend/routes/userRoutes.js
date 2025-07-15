import express from "express";
import {
  getUser,
  postUser,
  postBlockSite,
  deleteBlockSite,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/user", verifyToken, getUser);
router.post("/user", verifyToken, postUser);
router.put("/block-sites", verifyToken, postBlockSite);
router.put("/unblock-sites", verifyToken, deleteBlockSite);

export default router;
