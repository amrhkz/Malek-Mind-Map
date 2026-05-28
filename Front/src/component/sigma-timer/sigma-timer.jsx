"use client";
import React, { useState, useEffect, useRef } from "react";
import "./sigma-timer.css";

function SigmaTimer({ timer, title, status }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(timer?.startTime || Date.now());
  useEffect(() => {
    if (!timer) return;
    startTimeRef.current = timer.startTime;
    setElapsedTime(Math.floor((Date.now() - timer.startTime) / 1000));
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const days = Math.floor(elapsedTime / (24 * 60 * 60));
  const hours = Math.floor((elapsedTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((elapsedTime % (60 * 60)) / 60);
  const seconds = elapsedTime % 60;
  const totalMinutes = Math.floor(elapsedTime / 60);

  const getLevel = () => {
    if (totalMinutes < 7 * 24 * 60) return "Cock Sucker";
    if (totalMinutes < 21 * 24 * 60) return "Ass Hole";
    if (totalMinutes < 51 * 24 * 60) return "Beta";
    if (totalMinutes < 141 * 24 * 60) return "Alpha";
    return "Legend";
  };

  const getBadgeImage = () => {
    const level = getLevel();
    switch (level) {
      case "Cock Sucker":
        return "/img/level-1.png";
      case "Ass Hole":
        return "/img/level-2.png";
      case "Beta":
        return "/img/level-3.png";
      case "Alpha":
        return "/img/level-4.png";
      case "Legend":
        return "/img/level-5.png";
      default:
        return "/img/level-1.png";
    }
  };

  const getProgressPercentage = () => {
    switch (getLevel()) {
      case "Cock Sucker":
        return (totalMinutes / (7 * 24 * 60)) * 100;
      case "Ass Hole":
        return ((totalMinutes - 7 * 24 * 60) / (14 * 24 * 60)) * 100;
      case "Beta":
        return ((totalMinutes - 21 * 24 * 60) / (30 * 24 * 60)) * 100;
      case "Alpha":
        return ((totalMinutes - 51 * 24 * 60) / (90 * 24 * 60)) * 100;
      case "Legend":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="sigma-timer">
      <div className="content">
        <div className="timer">
          <div className="row">
            <div className="title">{title}</div>
            <div className="status">{status}</div>
          </div>
          <div className="row">
            <div className="num day">
              {String(days).padStart(2, "0")} <span>D</span>
            </div>
            <div className="num hour">
              {String(hours).padStart(2, "0")} <span>H</span>
            </div>
            <div className="num minute">
              {String(minutes).padStart(2, "0")} <span>m</span>
            </div>
            <div className="num second">
              {String(seconds).padStart(2, "0")} <span>s</span>
            </div>
          </div>
        </div>
        <div className="level">
          <div className="badge">
            <img src={getBadgeImage()} alt="badge" />
          </div>
          {/* <div className="label">{getLevel()}</div> */}
          <div className="prog">
            <div className="prog-num">
              {getProgressPercentage().toFixed(2)} %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigmaTimer;
