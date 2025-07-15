import express from "express";
import {
  postSession,
  getUserSession,
  getUserRangeSession,
  getUserGetLastThreeSession,
  getStreak,
} from "../controllers/session.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/session", verifyToken, postSession);
router.get("/session", verifyToken, getUserSession);
router.get("/range-session", verifyToken, getUserRangeSession);
router.get("/three-session", verifyToken, getUserGetLastThreeSession);
router.get("/streak", verifyToken, getStreak);

export default router;
