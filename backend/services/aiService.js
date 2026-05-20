import client from "../config/groq.js";

export const generateAISummary = async (
  text
) => {

  const completion =
    await client.chat.completions.create({

      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "user",

          content: `
Summarize only the most important concepts, headings, and key ideas from this text in concise bullet points.
          ${text}
          `,
        },
      ],
      max_tokens: 300,

temperature: 0.3,
    });

  return completion
    .choices[0]
    .message
    .content;
};