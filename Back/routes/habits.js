const express = require("express");
const {
  getHabits,
  updateHabit,
  createHabit,
  deleteHabit,
  getTestSort,
  tickHabit,
  toggleHabitDate,
} = require("../controllers/habitController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.use(authMiddleware);

router.get("/", getHabits);
router.post("/", createHabit);
router.patch("/:id/toggle-date", toggleHabitDate);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.get("/test-sorted", getTestSort);
router.post("/:id/tick", tickHabit);

module.exports = router;
