import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";
import flashcardRoutes
  from "./routes/flashcardRoutes.js";
import quizResultRoutes
  from "./routes/quizResultRoutes.js";
  import translationRoutes
from "./routes/translationRoutes.js";
import quizAutomationRoutes
from "./routes/quizAutomationRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
dotenv.config();

connectDB();

const app = express();

app.use(
  helmet({

    contentSecurityPolicy: false,

    crossOriginEmbedderPolicy: false,

    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("combined"));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
   message: "Too many requests from this IP",
});
app.use(limiter);

// Middleware

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/quiz", quizRoutes);
app.use(

  "/api/quiz-results",

  quizResultRoutes
);
app.use(

  "/api/quiz-automation",

  quizAutomationRoutes
);
app.use(
  "/api/ai",
  translationRoutes
);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use(
  "/uploads",

  express.static("uploads", {

    setHeaders: (res, filePath) => {

      if (filePath.endsWith(".pdf")) {

        res.setHeader(
          "Content-Type",
          "application/pdf"
        );

        res.setHeader(
          "Content-Disposition",
          "inline"
        );
      }
    },
  })
);

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ai", aiRoutes);
// Server

const PORT = process.env.PORT || 5000;
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});