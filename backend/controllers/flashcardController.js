import Upload from "../models/Upload.js";

import client from "../config/groq.js";

export const generateFlashcards =
  async (req, res) => {

    try {

      const { id } = req.params;

      const upload =
        await Upload.findById(id);

      if (!upload) {

        return res.status(404).json({
          message:
            "File not found",
        });
      }

      // IF FLASHCARDS ALREADY EXIST

      if (
        upload.flashcards &&
        upload.flashcards.length > 0
      ) {

        return res.status(200).json({
          flashcards:
            upload.flashcards,
        });
      }

      const extractedText =
        upload.extractedText.substring(
          0,
          3000
        );

      const completion =
        await client.chat.completions.create({

          model:
            "llama-3.3-70b-versatile",

          messages: [

            {
              role: "system",

              content: `

Generate 10 flashcards from study material.

Return ONLY valid JSON array.

Format:

[
  {
    "question": "...",
    "answer": "..."
  }
]

Keep answers concise.

`,
            },

            {
              role: "user",

              content:
                extractedText,
            },
          ],
        });

      const responseText =
        completion.choices[0]
          .message.content;

      const flashcards =
        JSON.parse(responseText);

      upload.flashcards =
        flashcards;

      await upload.save();

      res.status(200).json({
        flashcards,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };