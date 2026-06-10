// components/OscarDashboard.jsx
"use client";
import { useEffect, useState } from "react";

export default function OscarDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchOscarTasks = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/oscar/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching Oscar tasks:", error);
      }
    };

    fetchOscarTasks();
  }, []);

  const completeTask = async (taskId) => {
    try {
      await fetch(`http://localhost:4000/api/oscar/tasks/${taskId}/complete`, {
        method: "PUT",
      });
      // آپدیت کردن لیست تسک‌ها در صفحه (حذف تسک انجام شده از لیست)
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "IranSans, Poppins, sans-serif",
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          borderBottom: "2px solid var(--text)",
          paddingBottom: "10px",
          color: "var(--text)",
        }}
      >
        🤖 مرکز فرماندهی مالک تک (Oscar)
      </h2>

      {tasks.length === 0 ? (
        <p>اسکار فعلاً دستور جدیدی ندارد.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
            color: "var(--text)",
          }}
        >
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                border: "1px solid #e2e8f0",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor:
                  task.priority === "Critical" ? "#fee2e2" : "transparent",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>
                {task.title}
              </h3>
              <p style={{ margin: "0 0 10px 0", color: "#475569" }}>
                {task.description}
              </p>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: task.priority === "Critical" ? "#dc2626" : "#2563eb",
                }}
              >
                اولویت: {task.priority}
              </div>
              <button
                onClick={() => completeTask(task._id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                انجام دادم، اسکار! ✅
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
