const Habit = require("../models/habit");

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

exports.getTestSort = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id }).sort({ _id: 1 });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const detailedHabits = habits.map((habit) => {
      const creationDate = habit._id.getTimestamp();
      creationDate.setHours(0, 0, 0, 0);
      const formatDateStr = (d) => {
        const dateObj = new Date(d);
        return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
      };
      const dateProgressMap = {};
      if (habit.habitType === "multi" && habit.multiDates) {
        habit.multiDates.forEach((md) => {
          const dStr = formatDateStr(md.date);
          dateProgressMap[dStr] = (dateProgressMap[dStr] || 0) + 1;
        });
      } else if (habit.dates) {
        habit.dates.forEach((d) => {
          const dStr = formatDateStr(d);
          dateProgressMap[dStr] = (dateProgressMap[dStr] || 0) + 1;
        });
      }
      let historyLog = [];
      let totalRequiredTasks = 0;
      let totalCompletedTasks = 0;
      let currentLoopDate = new Date(creationDate);
      while (currentLoopDate <= today) {
        let shouldHabitRun = false;
        const dayOfWeek = currentLoopDate.getDay();
        const loopDateStr = formatDateStr(currentLoopDate);
        if (habit.repeat === "daily") {
          shouldHabitRun = true;
        } else if (habit.repeat === "week-days") {
          const iranianWeekDays = [6, 0, 1, 2, 3];
          if (iranianWeekDays.includes(dayOfWeek)) {
            shouldHabitRun = true;
          }
        } else if (
          habit.repeat === "specific-days" &&
          habit.specificDays.includes(dayOfWeek)
        ) {
          shouldHabitRun = true;
        } else if (
          habit.repeat === "specific-date" &&
          habit.customDate &&
          formatDateStr(habit.customDate) === loopDateStr
        ) {
          shouldHabitRun = true;
        }
        if (shouldHabitRun) {
          const targetForDay = habit.target || habit.count || 1;
          const doneCountForDay = dateProgressMap[loopDateStr] || 0;
          totalRequiredTasks += targetForDay;
          totalCompletedTasks += doneCountForDay;
          const isToday = loopDateStr === formatDateStr(today);
          let dayStatus = "missed";
          if (doneCountForDay >= targetForDay) {
            dayStatus = "done";
          } else if (doneCountForDay > 0) {
            dayStatus = "partial";
          } else if (isToday) {
            dayStatus = "today-pending";
          }
          historyLog.push({
            date: loopDateStr,
            status: dayStatus,
            doneCount: doneCountForDay,
            target: targetForDay,
            missedCount: Math.max(0, targetForDay - doneCountForDay),
          });
        }
        currentLoopDate.setDate(currentLoopDate.getDate() + 1);
      }
      return {
        _id: habit._id,
        title: habit.title,
        repeat: habit.repeat,
        habitType: habit.habitType,
        creationDate: formatDateStr(creationDate),
        stats: {
          totalRequired: totalRequiredTasks,
          done: totalCompletedTasks,
          missed: Math.max(0, totalRequiredTasks - totalCompletedTasks),
        },
        history: historyLog.reverse(),
      };
    });
    res.json(detailedHabits);
  } catch (err) {
    console.error("❌ Error calculating habit history:", err);
    res.status(500).json({ error: "Failed to calculate habit history" });
  }
};

// این رو به انتهای کنترلر عادات اضافه کن:

exports.tickHabit = async (req, res) => {
  try {
    const { id } = req.params; // دریافت آی‌دی عادت از سناریو URL
    const { targetDate, type, done } = req.body;

    if (!targetDate) {
      return res.status(400).json({ error: "تاریخ هدف ارسال نشده است." });
    }

    let updateQuery = {};
    if (type === "multi") {
      // اضافه کردن آبجکت مالتی بدون دست زدن به بقیه آرایه
      updateQuery = {
        $push: { multiDates: { date: new Date(targetDate), index: done } },
      };
    } else {
      // اضافه کردن تاریخ ساده
      updateQuery = {
        $push: { dates: new Date(targetDate) },
      };
    }
    const userId = req.user ? req.user.id || req.user._id : req.userId;
    // آپدیت امن با چک کردن آی‌دی کاربر
    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: id, user: userId },
      updateQuery,
      { new: true },
    );

    if (!updatedHabit) {
      return res
        .status(404)
        .json({ error: "عادت پیدا نشد یا دسترسی مجاز نیست." });
    }

    console.log(`✅ تیک جدید ثبت شد برای: ${updatedHabit.title}`);
    res.json({ success: true, habit: updatedHabit });
  } catch (err) {
    console.error("❌ Error ticking habit:", err);
    res.status(500).json({ error: "Failed to tick Habit" });
  }
};
