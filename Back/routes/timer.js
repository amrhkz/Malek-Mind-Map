const express = require("express");
const {
  getTimer,
  setTimer,
  resetTimer,
  updateTimer,
  deleteTimer,
} = require("../controllers/timerController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.use(authMiddleware);

router.get("/", getTimer);
router.post("/", setTimer);
router.post("/reset/:id", resetTimer);
router.put("/:id", updateTimer);
router.delete("/:id", deleteTimer);


module.exports = router;
