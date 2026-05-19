import express
from "express";

const router =
  express.Router();

router.post(

  "/result",

  async (req, res) => {

    try {

      console.log(
        req.body
      );

      res.status(200).json({

        message:
          "Quiz automation triggered",
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  }
);

export default router;