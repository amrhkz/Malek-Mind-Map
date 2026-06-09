const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { getTransactions, createTransaction } = require("../controllers/transactionController");

router.use(authMiddleware);

router.get("/", getTransactions);
router.post("/", createTransaction);

module.exports = router;
