const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_PORT,
  })
);

const mongoUri = process.env.MONGO_LOCAL; 

mongoose
  .connect(mongoUri)
  .then(() => {
    const dbType = mongoUri === process.env.MONGO_LOCAL ? "LOCAL" : "ATLAS";
    console.log(`MongoDB Connected (${dbType})`);
  })
  .catch((err) => console.error("MongoDB Error:", err));

app.use("/auth", require("./routes/auth"));
app.use("/goals", require("./routes/goals"));
app.use("/tasks", require("./routes/tasks"));
app.use("/shines", require("./routes/shines"));
app.use("/banks", require("./routes/banks"));
app.use("/habits", require("./routes/habits"));
app.use("/moneys", require("./routes/moneys"));
app.use("/events", require("./routes/events"));
// app.use("/messages", require("./routes/messages"));
app.use("/products", require("./routes/product"));
app.use("/timer", require("./routes/timer"));
app.use("/transactions", require("./routes/transactions"));


const uploadRoute = require("./routes/upload");
app.use("/api/upload", uploadRoute);
app.use("/uploads", express.static("uploads"));
app.use("/api/user", require("./routes/user"));

app.listen(process.env.BACK_PORT, () =>
  console.log(`Server running on http://localhost:${process.env.BACK_PORT}`)
);
