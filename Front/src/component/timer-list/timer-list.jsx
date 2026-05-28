"use client";
import React, { useState, useEffect } from "react";
import SigmaTimer from "../sigma-timer/sigma-timer";
import "./timer-list.css";

function TimerList() {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const fetchTimers = async () => {
      try {
        const res = await fetch("http://localhost:4000/timer", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setTimers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTimers();
  }, []);

  return (
    <div className="timer-list">
      {timers.map((timer) => (
        <SigmaTimer
          key={timer._id}
          timer={timer}
          title={timer.title}
          status={timer.status}
        />
      ))}
    </div>
  );
}

export default TimerList;
