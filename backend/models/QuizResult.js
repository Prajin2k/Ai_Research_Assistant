import mongoose
from "mongoose";

const quizResultSchema =
  new mongoose.Schema(

    {

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },

      file: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Upload",
      },

      score: Number,

      total: Number,

      percentage: Number,
    },

    {
      timestamps: true,
    }
  );

const QuizResult =
  mongoose.model(
    "QuizResult",
    quizResultSchema
  );

export default QuizResult;