import User from "../models/user.model.js";

const getUser = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const postUser = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      firstName,
      lastName,
      email,
      dailyTarget,
      weeklyTarget,
      workCategories,
      distractions,
    } = req.body;

    console.log(req.body);

    const user = await User.findOneAndUpdate(
      { uid },
      {
        uid,
        firstName,
        lastName,
        email,
        dailyTarget,
        weeklyTarget,
        workCategories,
        distractions,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const postBlockSite = async (req, res) => {
  try {
    const { uid } = req.user;
    const { site } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { $addToSet: { blockedSite: site } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Added block site successfully!", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getUser, postUser, postBlockSite };
