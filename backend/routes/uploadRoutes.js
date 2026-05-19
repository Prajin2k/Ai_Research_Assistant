import express from "express";
import { protect,} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  saveNotes,
} from "../controllers/uploadController.js";
import {
  uploadPDF,
} from "../controllers/uploadController.js";

const router = express.Router();


// PDF UPLOAD
router.post(
    "/pdf",
    protect,
  upload.single("pdf"),
  uploadPDF
);
router.post(
  "/save-notes",
  saveNotes
);

export default router;