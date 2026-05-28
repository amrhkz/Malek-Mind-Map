import React from "react";
import "./transaction.css";

function Transaction({ type, amount, desc }) {
  return (
    <div className="transaction-item">
      <div className="flex flex-col gap-1">
        <div className="type">{type}</div>
        <div className="desc">{desc}</div>
      </div>
      <div className="amount" dir="rtl">{amount.toLocaleString("FA")} تومان</div>
    </div>
  );
}

export default Transaction;
