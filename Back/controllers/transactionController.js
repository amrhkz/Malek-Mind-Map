const Transaction = require("../models/transaction");

exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // بخش populate حذف شد تا ارور StrictPopulateError برطرف شود
    const transactions = await Transaction.find({ user: userId })
      .sort({ createdAt: -1 });
      
    res.json(transactions);
  } catch (err) {
    console.error("🔥 Error in getTransactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      type,
      amount,
      category,
      title,
      description,
      cell,
      transactionDate,
    } = req.body;

    // اعتبارسنجی اولیه
    if (!type || !amount || !category) {
      return res.status(400).json({
        error: "type, amount and category are required",
      });
    }

    const transaction = await Transaction.create({
      user: userId,
      type,
      amount,
      category,
      title,
      description,
      cell,
      transactionDate,
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error("🔥 Error in createTransaction:", err);
    res.status(500).json({
      error: "Failed to create transaction",
    });
  }
};