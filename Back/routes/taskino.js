const router = require("express").Router();
const {
  deleteTaskino,
  toggleCompleteTaskino,
  updateTaskino,
  createTaskino,
  getTaskino,
} = require("../controllers/taskinoController");

const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

router.get("/", getTaskino);
router.post("/", createTaskino);
router.put("/:id", updateTaskino);
router.patch("/:id/toggle", toggleCompleteTaskino);
router.delete("/:id", deleteTaskino);

module.exports = router;
