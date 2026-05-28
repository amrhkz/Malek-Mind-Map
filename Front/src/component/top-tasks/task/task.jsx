"use client";
import React from "react";
import "./task.css";

function Task({ task, isActive, onTaskDone }) {
  const handleClick = async () => {
    if (!isActive) return;
    await fetch(`http://localhost:4000/goals/${task._id}/complete`, {
      method: "PATCH",
      credentials: "include",
    });
    onTaskDone(task._id);
  };

  return (
    <div
      className={`task ${!isActive ? "task-disabled" : ""}`}
      onClick={handleClick}
    >
      <div className="task-title">{task.title}</div>
      {/* {isActive && (
        <div className="task-hint">
          در حال انجام
        </div>
      )} */}
    </div>
  );
}

export default Task;
