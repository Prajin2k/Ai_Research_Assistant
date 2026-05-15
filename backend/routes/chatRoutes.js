import express from "express";

import {
    chatWithPDF,
    getChatHistory,
} from "../controllers/chatController.js";

const router = express.Router();


// GET CHAT HISTORY
router.get(
  "/:id",
  getChatHistory
);
// CHAT WITH PDF
router.post(
  "/:id",
  chatWithPDF
);


export default router;