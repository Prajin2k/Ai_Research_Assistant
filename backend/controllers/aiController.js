import Upload from "../models/Upload.js";
import { chunkText }
from "../services/chunkService.js";
import {
  generateAISummary,
} from "../services/aiService.js";

export const generateSummary = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const upload =
      await Upload.findById(id);

    if (!upload) {

      return res.status(404).json({
        message: "PDF not found",
      });
    }

   const chunks =
  chunkText(upload.extractedText);

let finalSummary = "";

for (const chunk of chunks) {

  const summary =
    await generateAISummary(chunk);

  finalSummary += summary + "\n";
      }
      upload.summary = finalSummary;

await upload.save();
    res.status(200).json({
      summary: finalSummary,
    });
      

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};