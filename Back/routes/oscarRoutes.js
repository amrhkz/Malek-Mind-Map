// routes/oscarRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { getTasks, updateTask, getCommand } = require("../controllers/oscarController");

router.use(authMiddleware);

router.get("/tasks", getTasks);
router.put("/tasks/:id/complete", updateTask);
router.get("/command", getCommand);

module.exports = router;
