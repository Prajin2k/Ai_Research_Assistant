import mongoose from "mongoose";

const messageSchema =
  new mongoose.Schema({

    sender: {
      type: String,

      enum: ["user", "ai"],

      required: true,
    },

    text: {
      type: String,

      required: true,
    },
  });

const chatSchema =
  new mongoose.Schema(

    {
      fileId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Upload",

        required: true,
      },

      messages: [messageSchema],
    },

    {
      timestamps: true,
    }
  );

const Chat = mongoose.model(
  "Chat",
  chatSchema
);

export default Chat;