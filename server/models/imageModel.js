import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [1, "Job name must have at least 1 character"],
    maxLength: [70, "Job name must have at most 70 characters"],
    trim: true,
    required: true,
  },
  album: {
    type: String,
    enum: ["family", "partying", "vacations", "work", "other"],
    default: "other",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User must be provided"],
  },
  photo: {
    type: String,
    required: [true, "Photo must be provided"],
  },
});

export default mongoose.model("Image", imageSchema);
