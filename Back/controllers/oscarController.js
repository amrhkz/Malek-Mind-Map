const Habit = require("../models/habit");
const Task = require("../models/task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedBy: "Oscar",
      status: "Pending",
    }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: "Completed" },
      { new: true },
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommand = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id });
    const todayStr = new Date().toISOString().split("T")[0];
    let todayPendingTasks = [];
    let allPastDebts = [];
    const formatDate = (dateInput) => {
      if (!dateInput) return "";
      const d = new Date(dateInput);
      return d.toISOString().split("T")[0];
    };
    habits.forEach((habit) => {
      const type = habit.type || habit.habitType;
      const target = habit.target || 1;
      let todayDone = 0;
      if (type === "multi") {
        const todayTicks = habit.multiDates
          ? habit.multiDates.filter((d) => formatDate(d.date) === todayStr)
          : [];
        todayDone = todayTicks.length;
      } else {
        const hasDoneToday = habit.dates
          ? habit.dates.some((d) => formatDate(d) === todayStr)
          : false;
        todayDone = hasDoneToday ? 1 : 0;
      }
      if (todayDone < target) {
        todayPendingTasks.push({
          _id: habit._id,
          title: habit.title,
          done: todayDone,
          target: target,
          targetDate: todayStr,
          type: type,
          multiDates: habit.multiDates || [],
          dates: habit.dates || [],
        });
      }
      const startDate = new Date(
        habit.createdAt || Date.now() - 7 * 24 * 60 * 60 * 1000,
      );
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      for (
        let d = new Date(startDate);
        d <= yesterday;
        d.setDate(d.getDate() + 1)
      ) {
        const currentPastDayStr = d.toISOString().split("T")[0];
        let pastDayDone = 0;

        if (type === "multi") {
          const pastTicks = habit.multiDates
            ? habit.multiDates.filter(
                (x) => formatDate(x.date) === currentPastDayStr,
              )
            : [];
          pastDayDone = pastTicks.length;
        } else {
          const hasDonePast = habit.dates
            ? habit.dates.some((x) => formatDate(x) === currentPastDayStr)
            : false;
          pastDayDone = hasDonePast ? 1 : 0;
        }
        if (pastDayDone < target) {
          allPastDebts.push({
            _id: habit._id,
            title: habit.title,
            done: pastDayDone,
            target: target,
            targetDate: currentPastDayStr,
            type: type,
            multiDates: habit.multiDates || [],
            dates: habit.dates || [],
            timestamp: d.getTime(),
          });
        }
      }
    });
    if (todayPendingTasks.length > 0) {
      return res.json({
        mode: "SHIELD_MODE",
        message: `امروز هنوز تسک‌های فعالی داری که تیک نخوردن! اسکار روی حالت [سپر امروز] قرار گرفت تا اول زنجیره امروزت رو حفظ کنی و سراغ گذشته نری.`,
        targetTasks: todayPendingTasks,
      });
    }
    if (allPastDebts.length > 0) {
      allPastDebts.sort((a, b) => a.timestamp - b.timestamp);
      const oldestDebtDate = allPastDebts[0].targetDate;
      const oldestDayTasks = allPastDebts.filter(
        (t) => t.targetDate === oldestDebtDate,
      );
      return res.json({
        mode: "DEBT_MODE",
        message: `عالیه! تسک‌های امروزت رو ۱۰۰٪ صاف کردی. حالا وقتشه بریم سراغ بدهی‌های تاریخ [${oldestDebtDate}] و زنجیره گذشته رو ترمیم کنیم.`,
        targetTasks: oldestDayTasks,
      });
    }
    return res.json({
      mode: "MONEY_MODE",
      message:
        "فوق‌العاده است! هیچ بدهی نداری و تسک‌های امروزت هم کامله. مغز اسکار در وضعیت [چراغ سبز] قرار گرفت. برو سراغ بیزینس اصلی!",
      targetTasks: [],
    });
  } catch (error) {
    console.error("Oscar Core Error:", error);
    res.status(500).json({ error: "خطای سرور در موتور پردازش اسکار" });
  }
};
