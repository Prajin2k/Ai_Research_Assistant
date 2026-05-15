import Upload from "../models/Upload.js";

import client from "../config/groq.js";


// GENERATE QUIZ
export const generateQuiz = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    // FIND PDF
    const upload = await Upload.findById(id);

    if (!upload) {

      return res.status(404).json({
        message: "PDF not found",
      });
    }

    // LIMIT TEXT
    const extractedText =
      upload.extractedText.substring(0, 3000);

    // AI QUIZ
    const completion =
  await client.chat.completions.create({

    model: "llama-3.3-70b-versatile",

    messages: [

      {
        role: "system",

        content: `
        You are an AI quiz generator.

        Generate clear MCQ questions
        from study material.

        Rules:
        - Generate exactly 5 questions
        - Each question must have 4 options
        - Mention correct answer clearly
        - Keep answers concise
        `,
      },

      {
        role: "user",

        content: `
        Study Material:

        ${extractedText}
        `,
      },
    ],
  });

    // GET QUIZ
    const quiz =
      completion.choices[0].message.content;

    res.status(200).json({
      quiz,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};