"use client";
import React, { useEffect, useState } from "react";
import style from "./top-habits.module.css";

function TopHabits() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("http://localhost:4000/habits", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setHabits(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHabits();
  }, []);

  return (
    <div className={style.habits}>
      {habits.map((habit, index) => (
        <>
          <div className={style.habit} key={index}>
            <div className="title">{habit.title}</div>
            <div className="date">{habit.dates[400]}</div>
          </div>
        </>
      ))}
    </div>
  );
}

export default TopHabits;
