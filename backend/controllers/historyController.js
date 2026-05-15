import Upload from "../models/Upload.js";
import fs from "fs";
// GET ALL FILES

export const getUploads = async (
  req,
  res
) => {

  try {

    const uploads =
      await Upload.find().sort({
        createdAt: -1,
      });

    res.status(200).json(
      uploads
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
// DELETE FILE

export const deleteUpload = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const upload =
      await Upload.findById(id);

    if (!upload) {

      return res.status(404).json({
        message: "File not found",
      });
    }

    // DELETE PHYSICAL FILE

    if (
      fs.existsSync(upload.fileUrl)
    ) {

      fs.unlinkSync(upload.fileUrl);
    }

    // DELETE DATABASE RECORD

    await Upload.findByIdAndDelete(id);

    res.status(200).json({
      message:
        "File deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};