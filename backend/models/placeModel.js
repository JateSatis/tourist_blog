import mongoose from "mongoose";

const placeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    dateOfVisit: {
      type: String,
      required: true,
    },
    review: {
      type: Number,
      required: true,
    },
    imageFilename: {
      type: String,
      required: true,
    },
    comments: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Places = mongoose.model("Places", placeSchema);
