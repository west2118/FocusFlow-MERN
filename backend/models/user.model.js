import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dailyTarget: { type: String },
    weeklyTarget: { type: String },
    workCategories: { type: [String] },
    distractions: { type: [String] },
    blockedSite: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
