import React from "react";
import "./transaction.css";

const Transaction = ({ type, amount, desc, category, date }) => {
  const isIncome = type === "income";
  return (
    <div className={`transaction-card ${isIncome ? "income" : "expense"}`}>
      <div className="transaction-info">
        <div className="transaction-icon">
          <i
            className={`bx ${isIncome ? "bx-trending-up" : "bx-trending-down"}`}
          ></i>
        </div>
        <div className="transaction-details">
          <span className="transaction-desc">{desc}</span>
          <span className="transaction-type-label">
            {isIncome ? "واریز به حساب" : "برداشت از حساب"}
          </span>
        </div>
        {/* <span className="transaction-meta">
          {category} • {new Date(date).toLocaleDateString("fa-IR")}
        </span> */}
      </div>

      <div className="transaction-amount">
        <span className="sign">{isIncome ? "+" : "-"}</span>
        {amount.toLocaleString()}
      </div>
    </div>
  );
};

export default Transaction;
