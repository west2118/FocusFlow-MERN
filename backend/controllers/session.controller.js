import Session from "../models/session.model.js";
import User from "../models/user.model.js";

const postSession = async (req, res) => {
  try {
    const { uid } = req.user;
    const { goal, sessionCategory, duration, status, distractions } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const newSession = new Session({
      userUid: uid,
      goal,
      sessionCategory,
      duration,
      status,
      distractions,
    });
    await newSession.save();

    res
      .status(200)
      .json({ message: "Session created successfully!", newSession });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserSession = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const sessions = await Session.find({ userUid: uid });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { postSession, getUserSession };
