import Upload from "../models/Upload.js";
import axios from "axios";
import {
  extractPDFText,
} from "../services/pdfService.js";

import {
  extractImageText,
} from "../services/ocrService.js";

export const uploadPDF = async (
  req,
  res
) => {

  try {

    const file = req.file;

    let extractedText = "";

    let fileType = "";

    // PDF
    if (
      file.mimetype === "application/pdf"
    ) {

      fileType = "pdf";

      extractedText =
        await extractPDFText(file.path);
    }

    // IMAGE
    else if (
      file.mimetype.startsWith("image/")
    ) {

      fileType = "image";

      extractedText =
        await extractImageText(file.path);
    }

    else {

      return res.status(400).json({
        message:
          "Only PDF or Images allowed",
      });
    }

    const upload = await Upload.create({

      title: file.originalname,

      fileUrl: file.path,

      extractedText,

      fileType,
      user: req.user._id,
    });
    
try {

  await axios.post(

    "https://hook.eu1.make.com/se5xh56bllkdoi2n6chljycvwky4cwhp",

    {

      fileId: upload._id,

      title: upload.title,

      extractedText:
        upload.extractedText,
      email: req.user.email,
    }
  );

} catch (webhookError) {

  console.log(
    "Webhook Error:",
    webhookError.message
  );
}
    res.status(201).json({

      message:
        "File Uploaded Successfully",

      upload,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
export const saveNotes =
  async (req, res) => {

  try {

    const {
      fileId,
      aiNotes,
    } = req.body;

    await Upload.findByIdAndUpdate(

      fileId,

      {
        aiNotes,
      }
    );

    res.status(200).json({
      message:
        "Notes Saved",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};