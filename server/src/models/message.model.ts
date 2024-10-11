import mongoose from "mongoose";

// define message schema
export const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

// create message model
export const Message = mongoose.model("Message", messageSchema);
export default Message;
