const express = require("express");
const {
  getHabits,
  updateHabit,
  createHabit,
  deleteHabit,
<<<<<<< HEAD
  getTestSort,
  tickHabit,
} = require("../controllers/habitController");
=======
  toggleHabitDate,
} = require("../controllers/habbitController");
>>>>>>> 3a6bb7e2eeeeee0b464fccf2ff2e60926a65c84c
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

<<<<<<< HEAD
=======




>>>>>>> 3a6bb7e2eeeeee0b464fccf2ff2e60926a65c84c
module.exports = router;
