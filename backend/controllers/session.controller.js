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

const getUserRangeSession = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const range = url.searchParams.get("range");

    const now = new Date();
    let start, end;

    if (range === "weekly") {
      const dayOfWeek = now.getUTCDay();
      const daySinceMonday = (dayOfWeek + 6) % 7;

      start = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - daySinceMonday,
          0,
          0,
          0
        )
      );
      end = now;
    } else if (range === "today") {
      start = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          0,
          0,
          0
        )
      );
      end = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          23,
          59,
          59,
          999
        )
      );
    } else if (range === "yesterday") {
      start = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - 1,
          0,
          0,
          0
        )
      );
      end = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - 1,
          23,
          59,
          59,
          999
        )
      );
    }

    const sessions = await Session.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
      userUid: uid,
    });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserGetLastThreeSession = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const sessions = await Session.find({ userUid: uid })
      .sort({
        createdAt: -1,
      })
      .limit(3);

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getStreak = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const sessions = await Session.find({ userUid: uid })
      .sort({
        createdAt: -1,
      })
      .select("createdAt");

    if (sessions.length === 0) return res.status(200).json(0);

    const daysWithSessions = new Set();
    sessions.forEach((session) => {
      const localDateStr = new Date(session.createdAt).toLocaleDateString(
        "en-CA"
      );
      daysWithSessions.add(localDateStr);
    });

    const now = new Date();
    const todayStr = now.toLocaleDateString("en-CA");
    const latestSessionStr = new Date(sessions[0].createdAt).toLocaleDateString(
      "en-CA"
    );

    const oneDayAgo = new Date(now);
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const oneDayAgoStr = oneDayAgo.toLocaleDateString("en-CA");

    if (latestSessionStr !== todayStr && latestSessionStr !== oneDayAgoStr) {
      return res.status(200).json(0);
    }

    let streak = 0;
    let day = new Date(sessions[0].createdAt);
    day.setHours(0, 0, 0, 0);

    while (true) {
      const dateStr = day.toLocaleDateString("en-CA");
      if (daysWithSessions.has(dateStr)) {
        streak++;
        day.setDate(day.getDate() - 1);
      } else {
        break;
      }
    }

    res.status(200).json(streak);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  postSession,
  getUserSession,
  getUserRangeSession,
  getUserGetLastThreeSession,
  getStreak,
};
