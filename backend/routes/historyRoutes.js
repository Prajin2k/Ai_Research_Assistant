import express from "express";

import {
  getUploads,
  deleteUpload,
} from "../controllers/historyController.js";

const router = express.Router();

// GET FILES

router.get("/", getUploads);

// DELETE FILE

router.delete("/:id", deleteUpload);

export default router;