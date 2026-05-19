import QuizResult
from "../models/QuizResult.js";

export const saveQuizResult =
  async (req, res) => {

    try {

      const {
        fileId,
        score,
        total,
      } = req.body;

      const percentage =

        (
          score / total
        ) * 100;

      const result =
        await QuizResult.create({

          user:
            req.user._id,

          file:
            fileId,

          score,

          total,

          percentage,
        });

      res.status(201).json(
        result
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };