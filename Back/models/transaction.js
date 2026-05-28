const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cell: { type: mongoose.Schema.Types.ObjectId, ref: "Money", required: true },
  type: {
    type: String,
    enum: ["income", "outcome"],
    required: true,
  },
  amount: { type: Number, required: true },
  description: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
