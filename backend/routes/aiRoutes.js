import express from "express";

import {
  generateSummary,
} from "../controllers/aiController.js";

const router = express.Router();


// AI SUMMARY
router.post(
  "/summary/:id",
  generateSummary
);

export default router;