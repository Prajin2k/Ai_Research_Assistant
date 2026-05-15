import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
  uploadPDF,
} from "../controllers/uploadController.js";

const router = express.Router();


// PDF UPLOAD
router.post(
  "/pdf",
  upload.single("pdf"),
  uploadPDF
);

export default router;