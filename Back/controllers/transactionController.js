const Transaction = require("../models/transaction");

exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ user: userId })
      .populate("cell", "title slug")
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error("🔥 Error in getTransactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};
