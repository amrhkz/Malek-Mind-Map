const mongoose = require("mongoose");

const atlasConn = mongoose.createConnection(process.env.MONGO_ATLAS);

const Message = atlasConn.model(
  "Message",
  new mongoose.Schema({
    sender: String,
    email: String,
    text: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
  })
);

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت پیام‌ها", error });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) return res.status(401).json({ message: "Unauthorized" });
    const { text, avatar } = req.body;
    if (!text) {
      return res.status(400).json({ message: "پیام خالی است" });
    }
    let sender = "user";
    if (email === "amrhkz@outlook.com") sender = "me";
    if (email === "sadeghian.marjan13@gmail.com") sender = "user";
    const newMessage = await Message.create({
      sender,
      email,
      text,
      avatar:
        avatar || (sender === "me" ? "/img/amrhkz.png" : "/img/marjan.png"),
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "خطا در ارسال پیام", error });
  }
};
