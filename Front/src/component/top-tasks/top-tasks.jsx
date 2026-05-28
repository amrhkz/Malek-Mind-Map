"use client";
import React, { useEffect, useState } from "react";
import "./top-tasks.css";
import Task from "./task/task";

const getGoals = async () => {
  const res = await fetch("http://localhost:4000/goals", {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch goals");
  return res.json();
};

const TopTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getGoals()
      .then((data) => {
        const parentMap = new Set(
          data.map((g) => g.parentId?.toString()).filter(Boolean)
        );

        const leafGoals = data
          .filter((g) => !parentMap.has(g._id.toString()))
          .filter((g) => g.status !== "done")
          .sort((a, b) => (a.mindOrder ?? 9999) - (b.mindOrder ?? 9999))
          .slice(0, 3);

        setTasks(leafGoals);
      })
      .catch(console.error);
  }, []);

  const handleTaskDone = (taskId) => {
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  };

  return (
    <div className="top-tasks">
      {tasks.map((task, index) => (
        <Task
          key={task._id}
          task={task}
          isActive={index === 0}
          onTaskDone={handleTaskDone}
        />
      ))}
    </div>
  );
};

export default TopTasks;
