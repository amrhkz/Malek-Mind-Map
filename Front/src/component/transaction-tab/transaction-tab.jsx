"use client";
import React, { useEffect, useState } from "react";
import "./transaction-tab.css";
import Modal, { ModalMenu, ModalToggle } from "../modal/modal";

function TransactionTab() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("outcome");
  const [cell, setCell] = useState("");
  const [filter, setFilter] = useState("all");
  const [moneys, setMoneys] = useState([]);

  // Fetch Transactions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/transactions", {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed fetching transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Fetch Money cells (Storage / Charity / Investing / Shopping)
  useEffect(() => {
    const fetchMoneys = async () => {
      try {
        const res = await fetch("http://localhost:4000/moneys", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        setMoneys(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMoneys();
  }, []);

  // Add Transaction
  const addTransaction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const body = {
        amount: Number(amount),
        description: desc,
        type,
        cell,
      };

      const res = await fetch("http://localhost:4000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed creating transaction");
      const newTr = await res.json();

      setTransactions((prev) => [...prev, newTr]);
      setAmount("");
      setDesc("");
      setType("outcome");
      setCell("");

    } finally {
      setIsLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    if (!confirm("Delete this transaction?")) return;

    try {
      const res = await fetch(`http://localhost:4000/transactions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      setTransactions((prev) => prev.filter((t) => t._id !== id));

    } catch (err) {
      console.error(err);
      alert("Failed deleting transaction");
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  return (
    <div className="transaction-tab">
      {/* ---------- FILTERS ---------- */}
      <div className="transaction-controls">
        <div className="filters">
          <div
            className={`filter-item ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </div>
          <div
            className={`filter-item ${filter === "income" ? "active" : ""}`}
            onClick={() => setFilter("income")}
          >
            Incomes
          </div>
          <div
            className={`filter-item ${filter === "outcome" ? "active" : ""}`}
            onClick={() => setFilter("outcome")}
          >
            Outcomes
          </div>
        </div>

        {/* ---------- NEW TRANSACTION MODAL ---------- */}
        <Modal>
          <ModalToggle>
            <div className="new-transaction">New Transaction</div>
          </ModalToggle>
          <ModalMenu>
            <div className="new-transaction-menu">
              <form onSubmit={addTransaction}>
                <div className="title">Add New Transaction</div>

                <input
                  type="number"
                  required
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <textarea
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />

                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="income">Income</option>
                  <option value="outcome">Outcome</option>
                </select>

                <label>Money Cell</label>
                <select
                  required
                  value={cell}
                  onChange={(e) => setCell(e.target.value)}
                >
                  <option value="">Select...</option>
                  {moneys.map((m) => (
                    <option value={m._id} key={m._id}>
                      {m.title}
                    </option>
                  ))}
                </select>

                <button disabled={isLoading}>
                  {isLoading ? (
                    <i className="bx bx-loader-alt bx-spin"></i>
                  ) : (
                    "Add"
                  )}
                </button>
              </form>
            </div>
          </ModalMenu>
        </Modal>
      </div>

      {/* ---------- TRANSACTION LIST ---------- */}
      <div className="transaction-list">
        {filteredTransactions.length ? (
          filteredTransactions.map((tr) => (
            <div className="transaction-item" key={tr._id}>
              <div className="left">
                <div className="amount">
                  {tr.type === "income" ? "➕" : "➖"}{" "}
                  {tr.amount.toLocaleString("fa-IR")} تومان
                </div>
                <div className="desc">{tr.description}</div>
                <div className="cell">{tr.cell?.title}</div>
                <div className="date">
                  {new Date(tr.createdAt).toLocaleString("fa-IR")}
                </div>
              </div>

              <Modal>
                <ModalToggle>
                  <i className="bx bx-dots-horizontal-rounded bx-sm"></i>
                </ModalToggle>
                <ModalMenu>
                  <div className="transaction-edit-menu">
                    <button
                      className="delete-btn"
                      onClick={() => deleteTransaction(tr._id)}
                    >
                      Delete
                    </button>
                  </div>
                </ModalMenu>
              </Modal>
            </div>
          ))
        ) : (
          <p>No transactions found...</p>
        )}
      </div>
    </div>
  );
}

export default TransactionTab;
