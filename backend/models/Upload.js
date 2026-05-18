import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(

  {
    title: {

      type: String,

      required: true,

      trim: true,
    },

    fileUrl: {

      type: String,

      required: true,
    },

    extractedText: {

      type: String,

      default: "",
    },

    fileType: {

      type: String,

      enum: ["pdf", "image"],

      required: true,
    },

    summary: {

      type: String,

      default: "",
        },
    user: {

  type:
    mongoose.Schema.Types.ObjectId,

  ref: "User",

  required: true,
},
  },

  {
    timestamps: true,
  }
);

const Upload = mongoose.model(
  "Upload",
  uploadSchema
);

export default Upload;