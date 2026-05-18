import Upload from "../models/Upload.js";

import client from "../config/groq.js";
import Chat from "../models/Chat.js";
import { chunkText }
from "../services/chunkService.js";

// CHAT WITH PDF

export const chatWithPDF = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const { question } = req.body;

    const upload =
      await Upload.findById(id);

    if (!upload) {

      return res.status(404).json({
        message: "PDF not found",
      });
    }

    // CREATE CHUNKS

    const chunks =
      chunkText(upload.extractedText);

    // LIMIT CHUNKS

    const limitedChunks =
      chunks.slice(0, 3);

    const extractedText =
      limitedChunks.join("\n");

    // AI RESPONSE

    const completion =
      await client.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [

          {
            role: "system",

            content: `
            You are an AI tutor.

            Answer ONLY from the PDF content.

            If answer is not found,
            say:
            "Answer not found in PDF."
            `,
          },

          {
            role: "user",

            content: `
            PDF Content:
            ${extractedText}

            Question:
            ${question}
            `,
          },
        ],
      });

    const answer =
      completion.choices[0].message.content;
      // FIND EXISTING CHAT

            let existingChat =
            await Chat.findOne({
                fileId: id,
            });

            // CREATE NEW CHAT

            if (!existingChat) {

            existingChat =
                await Chat.create({

                fileId: id,

                messages: [],
                });
            }

            // SAVE USER MESSAGE

            existingChat.messages.push({

            sender: "user",

            text: question,
            });

            // SAVE AI MESSAGE

            existingChat.messages.push({

            sender: "ai",

            text: answer,
            });

      await existingChat.save();
  
    res.status(200).json({
      answer,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
    // GET CHAT HISTORY
export const getChatHistory = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const chat =
      await Chat.findOne({
        fileId: id,
      });

    if (!chat) {

      return res.status(200).json([]);
    }

    res.status(200).json(
      chat.messages
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};