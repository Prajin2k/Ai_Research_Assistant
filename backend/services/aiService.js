import client from "../config/groq.js";

export const generateAISummary = async (
  text
) => {

  const completion =
    await client.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",

          content: `
          Summarize this study material
          in simple bullet points:

          ${text}
          `,
        },
      ],
    });

  return completion
    .choices[0]
    .message
    .content;
};