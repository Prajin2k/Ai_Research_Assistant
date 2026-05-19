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

Generate exactly 5 MCQ questions.

Return ONLY valid JSON.

Format:

[
  {
    "question": "Question here",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Correct Option"
  }
]

Rules:
- No markdown
- No explanation
- No extra text
- Only JSON
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
    const quizText =
  completion.choices[0]
  .message.content;

const quiz =
  JSON.parse(quizText);

    res.status(200).json({
      quiz,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};