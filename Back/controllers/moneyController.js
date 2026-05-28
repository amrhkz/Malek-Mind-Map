const Money = require("../models/money");
const Transaction = require("../models/transaction");

exports.getMoney = async (req, res) => {
  try {
    const userId = req.user.id;
    let moneys = await Money.find({ user: userId });
    if (moneys.length === 0) {
      const baseDefaults = [
        { title: "Storage", slug: "storage" },
        { title: "Charity", slug: "charity" },
        { title: "Investing", slug: "investing" },
        { title: "Shopping", slug: "shopping" },
      ];
      const userSlugSuffix = userId.toString().slice(0, 4);
      const userDefaults = baseDefaults.map((item) => ({
        ...item,
        slug: `${item.slug}-${userSlugSuffix}`,
        user: userId,
        targetMoney: 0,
        currentMoney: 0,
        financeTask: [],
      }));
      await Money.insertMany(userDefaults);
      moneys = await Money.find({ user: userId });
    }
    res.json(moneys);
  } catch (err) {
    console.error("🔥 Error in getMoney:", err);
    res.status(500).json({ error: "Failed to get moneys" });
  }
};

exports.allocateIncome = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;
    if (!amount || isNaN(amount)) {
      return res
        .status(400)
        .json({ error: "Amount is required and must be a number" });
    }
    const percentages = {
      storage: 0.2,
      charity: 0.1,
      investing: 0.2,
      shopping: 0.5,
    };
    const categories = ["storage", "charity", "investing", "shopping"];
    for (const key of categories) {
      const slug = key;
      const money = await Money.findOne({ user: userId, slug });
      if (money) {
        money.targetMoney += amount * percentages[key];
        await money.save();
      } else {
        console.warn(`⚠️ No money found for ${slug}, skipping`);
      }
    }
    console.log("✅ Income allocated successfully");
    res.json({ success: true });
  } catch (error) {
    console.error("🔥 Error allocating income:", error);
    res.status(500).json({ error: "Failed to allocate income" });
  }
};

exports.outcome = async (req, res) => {
  try {
    const { amount, slug } = req.body;
    const userId = req.user.id;
    if (!amount || !slug) {
      return res.status(400).json({ error: "Amount and slug are required" });
    }
    const cell = await Money.findOne({ user: userId, slug });
    if (!cell) {
      return res.status(404).json({ error: "Money cell not found" });
    }
    if (cell.currentMoney < amount) {
      return res.status(400).json({ error: "Not enough money in this cell" });
    }
    cell.currentMoney -= amount;
    await cell.save();
    await Transaction.create({
      user: userId,
      cell: cell._id,
      type: "outcome",
      amount,
      description: `Outcome from ${slug}`,
    });
    res.json({ success: true, cell });
  } catch (error) {
    console.error("🔥 Error in outcome:", error);
    res.status(500).json({ error: "Server error" });
  }
};
