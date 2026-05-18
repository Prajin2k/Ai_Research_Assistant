import express from "express";
import {  protect,} from "../middleware/authMiddleware.js";
import { getUploads, deleteUpload,} from "../controllers/historyController.js";

const router = express.Router();

// GET FILES

router.get("/", protect, getUploads);

// DELETE FILE

router.delete("/:id", protect, deleteUpload);

export default router;