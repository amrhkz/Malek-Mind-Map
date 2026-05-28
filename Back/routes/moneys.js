const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { getMoney, allocateIncome, outcome } = require("../controllers/moneyController");
const router = express.Router();

router.use(authMiddleware);

router.get("/", getMoney);
router.post("/allocate", authMiddleware, allocateIncome);
router.post("/outcome", authMiddleware, outcome);


module.exports = router;