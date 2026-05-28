const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const VerificationCode = require("../models/verificationCode");
const transporter = require("../utils/email");

const jwtSecret = process.env.JWT_SECRET || "default_secret";

const isBcryptHash = (password) => /^\$2[aby]\$\d{2}\$/.test(password);

const createToken = (user, res) => {
  jwt.sign(
    { email: user.email, id: user._id, name: user.name },
    jwtSecret,
    {},
    (err, token) => {
      if (err) throw err;
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
        })
        .json(user);
    }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      if (existingUser.password) {
        return res.status(409).json({ message: "User already exists" });
      }

      existingUser.name = name;
      existingUser.password = hashedPassword;
      await existingUser.save();
      return createToken(existingUser, res);
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    createToken(user, res);
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    const isMatch = isBcryptHash(user.password)
      ? await bcrypt.compare(password, user.password)
      : password === user.password;

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    if (!isBcryptHash(user.password)) {
      user.password = await bcrypt.hash(password, 10);
      await user.save();
    }

    createToken(user, res);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.sendCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json("Email required");

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await VerificationCode.deleteMany({ email });
  await VerificationCode.create({
    email,
    code,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  try {
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "email",
      "verification.html"
    );
    let emailTemplate = fs.readFileSync(templatePath, "utf-8");

    emailTemplate = emailTemplate
      .replace("{{CODE}}", code)
      .replace("{{YEAR}}", new Date().getFullYear());

    await transporter.sendMail({
      from: `"MindMap" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your MindMap Verification Code",
      html: emailTemplate,
      attachments: [
        {
          filename: "verification-email-logo.png",
          path: path.join(
            __dirname,
            "..",
            "img",
            "verification-email-logo.png"
          ),
          cid: "logo@mindmap",
        },
      ],
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json("Failed to send code");
  }
};

exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;
  const record = await VerificationCode.findOne({ email, code });
  if (!record) return res.status(400).json("Invalid code");
  if (record.expiresAt < new Date())
    return res.status(400).json("Code expired");

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      email,
      name: email.split("@")[0],
      password: "",
    });
  }

  createToken(user, res);

  await VerificationCode.deleteOne({ _id: record._id });
};

exports.getProfile = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json("No token provided");

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) return res.status(403).json("Token not valid");
    res.json(userData);
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token").json("ok");
};
