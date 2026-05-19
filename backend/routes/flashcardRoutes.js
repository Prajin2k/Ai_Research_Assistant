import express from "express";

import { protect }
from "../middleware/authMiddleware.js";

import {
  generateFlashcards,
}
from "../controllers/flashcardController.js";

const router =
  express.Router();

router.get(

  "/:id",

  protect,

  generateFlashcards
);

export default router;