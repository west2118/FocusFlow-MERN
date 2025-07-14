import express from "express";
import {
  postSession,
  getUserSession,
} from "../controllers/session.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/session", verifyToken, postSession);
router.get("/session", verifyToken, getUserSession);

export default router;
