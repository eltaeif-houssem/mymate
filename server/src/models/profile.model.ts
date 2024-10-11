import mongoose from "mongoose";

// define profile schema
export const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    profilePicture: {
      type: String,
      trim: true,
    },

    backgroundPicture: {
      type: String,
      trim: true,
    },

    socialLinks: {
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
  },
  { timestamps: true }
);

// create profile model
export const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
