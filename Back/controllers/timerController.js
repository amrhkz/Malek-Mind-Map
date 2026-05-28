const Timer = require("../models/timer");

exports.getTimer = async (req, res) => {
  try {
    const userId = req.user.id;
    const timers = await Timer.find({ user: userId }).sort({ createdAt: -1 });
    return res.json(timers);
  } catch (err) {
    console.error("❌ getTimer Error:", err);
    res.status(500).json({ error: "server error" });
  }
};

exports.setTimer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, desc, startTime, status } = req.body;
    const timer = await Timer.create({
      user: userId,
      title,
      desc,
      startTime,
      status,
    });
    return res.json(timer);
  } catch (err) {
    console.error("❌ setTimer Error:", err);
    res.status(500).json({ error: "server error" });
  }
};

exports.resetTimer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const timer = await Timer.findOneAndUpdate(
      { _id: id, user: userId },
      { startTime: Date.now(), updatedAt: Date.now() },
      { new: true }
    );

    return res.json({ success: true, timer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
};


exports.updateTimer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, startTime, status } = req.body;
    const updated = await Timer.findByIdAndUpdate(
      id,
      { title, desc, startTime, status, updatedAt: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Timer not found" });
    res.json(updated);
  } catch (err) {
    console.error("❌ updateTimer Error:", err);
    res.status(500).json({ error: "server error" });
  }
};

exports.deleteTimer = async (req, res) => {
  try {
    await Timer.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};
