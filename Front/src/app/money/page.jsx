"use client";
import React, { useEffect, useState } from "react";
import "@/app/money/money.css";
import Container from "@/component/container/container";
import ShoppingList from "@/component/shopping-list/shopping-list";
import { Tab, TabItem, TabMenu, TabPanel } from "@/component/tab/tab";
import BankCard from "@/component/bank-card/bank-card";
import FinancialDashboard from "@/component/debts/debts";
import Dashboard from "@/component/OverviewChart/OverviewChart";
import CardsDashboard from "@/component/card-tab/card-tab";

const page = () => {
  const [banks, setBanks] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:4000/transactions", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    savings: 0,
  });

  useEffect(() => {
    const fetchMoneys = async () => {
      try {
        const res = await fetch("http://localhost:4000/moneys", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setMoneys(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMoneys();
  }, []);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("http://localhost:4000/banks", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setBanks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    const now = new Date();

    const monthlyTransactions = transactions.filter((t) => {
      const date = new Date(t.transactionDate);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    });

    const monthlyIncome = monthlyTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpense = monthlyTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = banks.reduce((sum, bank) => sum + bank.balance, 0);

    setStats({
      totalBalance,
      monthlyIncome,
      monthlyExpense,
      savings: monthlyIncome - monthlyExpense,
    });
  }, [transactions, banks]);

  return (
    <>
      <Container>
        <Tab>
          <TabMenu defaultActive={0}>
            <TabItem index={0} icon="bx-dollar">
              Overview
            </TabItem>
            <TabItem index={1} icon="bx-cart">
              Shopping List
            </TabItem>
            <TabItem index={2} icon="bx-donate-heart">
              Debts
            </TabItem>
            <TabItem index={3} icon="bx-credit-card-alt">
              Cards
            </TabItem>
          </TabMenu>
          <TabPanel index={0}>
            <Dashboard />
          </TabPanel>
          <TabPanel index={1}>
            <ShoppingList />
          </TabPanel>
          <TabPanel index={2}>
            <FinancialDashboard />
          </TabPanel>
          <TabPanel index={3}>
            <CardsDashboard />
          </TabPanel>
        </Tab>
      </Container>
    </>
  );
};

export default page;
