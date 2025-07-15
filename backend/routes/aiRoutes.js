import express from "express";
import { getSuggestion } from "../controllers/aisuggestion.controller.js";

const router = express.Router();

router.get("/suggestion", getSuggestion);

export default router;
