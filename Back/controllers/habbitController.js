const Habit = require("../models/habbit");

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: "Failed to get Habits" });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const {
      title,
      slug,
      repeat,
      count,
      target,
      habitType,
      specificDays,
      customDate,
    } = req.body;
    const newHabit = new Habit({
      title,
      slug,
      repeat,
      count,
      target,
      habitType,
      specificDays: repeat === "specific-days" ? specificDays || [] : [],
      customDate: repeat === "specific-date" ? customDate || null : null,
      user: req.user.id,
    });
    const saved = await newHabit.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Habit" });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      repeat,
      count,
      target,
      habitType,
      specificDays,
      customDate,
      dates,
      multiDates,
    } = req.body;

    // پیدا کردن عادت مربوط به کاربر
    const habit = await Habit.findOne({ _id: id, user: req.user.id });
    if (!habit) return res.status(404).json({ error: "Habit not found" });

    // فقط فیلدهایی که ارسال شدن رو به‌روزرسانی کن
    if (title !== undefined) habit.title = title;
    if (slug !== undefined) habit.slug = slug;
    if (repeat !== undefined) habit.repeat = repeat;
    if (count !== undefined) habit.count = count;
    if (target !== undefined) habit.target = target;
    if (habitType !== undefined) habit.habitType = habitType;
    if (dates !== undefined) habit.dates = dates;
    if (multiDates !== undefined) habit.multiDates = multiDates;

    // مدیریت خاص برای repeat
    if (repeat === "specific-days") {
      habit.specificDays = specificDays || [];
      habit.customDate = null;
    } else if (repeat === "specific-date") {
      habit.customDate = customDate || null;
      habit.specificDays = [];
    } else {
      habit.specificDays = [];
      habit.customDate = null;
    }

    // ذخیره در دیتابیس
    const updatedHabit = await habit.save();

    console.log("✅ Habit updated:", updatedHabit);
    res.json(updatedHabit);
  } catch (err) {
    console.error("❌ Error updating habit:", err);
    res.status(500).json({ error: "Failed to update Habit" });
  }
};

exports.toggleHabitDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, index = 0, habitType } = req.body;

    if (!date) return res.status(400).json({ error: "Date is required" });

    const selectedDate = new Date(date);
    if (Number.isNaN(selectedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date" });
    }

    const habit = await Habit.findOne({ _id: id, user: req.user.id });
    if (!habit) return res.status(404).json({ error: "Habit not found" });

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const isMulti = (habitType || habit.habitType) === "multi";

    if (isMulti) {
      const existingIndex = habit.multiDates.findIndex(
        (entry) =>
          entry.index === index &&
          entry.date >= startOfDay &&
          entry.date <= endOfDay
      );

      if (existingIndex >= 0) {
        habit.multiDates.splice(existingIndex, 1);
      } else {
        habit.multiDates.push({ index, date: selectedDate });
      }
    } else {
      const existingIndex = habit.dates.findIndex(
        (entryDate) => entryDate >= startOfDay && entryDate <= endOfDay
      );

      if (existingIndex >= 0) {
        habit.dates.splice(existingIndex, 1);
      } else {
        habit.dates.push(selectedDate);
      }
    }

    const updatedHabit = await habit.save();
    res.json(updatedHabit);
  } catch (err) {
    console.error("❌ Error toggling habit date:", err);
    res.status(500).json({ error: "Failed to toggle Habit date" });
  }
};


exports.deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Habit.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ error: "Habit not found" });
    }
    res.json({ message: "Habit deleted successfully", id });
  } catch (err) {
    console.error("❌ Delete Habit Error:", err);
    res.status(500).json({ error: "Failed to delete Habit" });
  }
};
