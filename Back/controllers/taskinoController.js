const taskino = require("../models/taskino");


// Get All
exports.getTaskino = async (req, res) => {
  try {
    const tasks = await taskino.find({ user: req.user.id }).sort({
      estimatedTime: 1,
      completed: 1,
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Create
exports.createTaskino = async (req, res) => {
  try {
    const { title, notes, estimatedTime } = req.body;

    const task = await taskino.create({
      title,
      notes,
      estimatedTime,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update
exports.updateTaskino = async (req, res) => {
  try {
    const task = await taskino.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(task);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Toggle Complete
exports.toggleCompleteTaskino = async (req, res) => {
  try {
    const task = await taskino.findById(req.params.id);

    if (!task)
      return res.status(404).json({
        message: "Task not found",
      });

    task.completed = !task.completed;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete
exports.deleteTaskino = async (req, res) => {
  try {
    const task = await taskino.findByIdAndDelete(req.params.id);

    if (!task)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};