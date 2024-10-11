import mongoose from "mongoose";

// define post schema
export const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    content: {
      type: String,
      trim: true,
    },

    postPicture: {
      type: String,
      trim: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
    ],

    comments: [
      {
        content: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Profile",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// create profile model
export const Post = mongoose.model("Post", postSchema);
export default Post;
