import mongoose from "mongoose";

const SessionSchema = mongoose.Schema(
  {
    userUid: { type: String, required: true },
    goal: { type: String, required: true },
    sessionCategory: { type: String, required: true },
    duration: { type: Number, required: true },
    status: { type: String, required: true },
    distractions: [
      {
        distraction: { type: String },
        minutes: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", SessionSchema);

export default Session;
