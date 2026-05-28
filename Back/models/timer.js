const mongoose = require("mongoose");

const TimerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  desc: String,
  startTime: Number,
  status: { type: String, default: "ongoing" }
}, { timestamps: true });


module.exports = mongoose.model("Timer", TimerSchema);
