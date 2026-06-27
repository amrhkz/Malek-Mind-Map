// app/test-habits/page.jsx
"use client";
import OscarCommand from "@/component/OscarCommand/OscarCommand";
import { useEffect, useState } from "react";

export default function TestSortedHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSortedHabits = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/habits/test-sorted", {
          cache: "no-store",
          credentials: "include",
        });
        const data = await res.json();
        setHabits(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching habits history:", error);
        setLoading(false);
      }
    };
    fetchSortedHabits();
  }, []);

  if (loading)
    return (
      <div style={{ fontFamily: "IranSans", padding: "20px" }}>
        در حال پردازش جزئیات عادات توسط اسکار...
      </div>
    );

  return (
    <>
      <div
        style={{
          fontFamily: "IranSans, Poppins, sans-serif",
          padding: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
          direction: "rtl",
        }}
      >
        <h2
          style={{
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: "10px",
            color: "#0f172a",
          }}
        >
          🧪 آنالیز پیشرفت عادات به تفکیک تعداد دفعات
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            marginTop: "20px",
          }}
        >
          {habits.map((habit) => (
            <div
              key={habit._id}
              style={{
                border: "1px solid #cbd5e1",
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: "var(--card)",
              }}
            >
              {/* هدر اطلاعات عادت */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  borderBottom: "1px dashed #e2e8f0",
                  paddingBottom: "10px",
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 5px 0", color: "#1e293b" }}>
                    {habit.title}
                  </h3>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>
                    نوع عادت: {habit.habitType} | تکرار: {habit.repeat}
                  </span>
                </div>

                {/* آمار کل تیک‌ها */}
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    textAlign: "center",
                    fontSize: "13px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#e2e8f0",
                      padding: "5px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {habit.stats.totalRequired}
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>
                      کل تارگت‌ها
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#dcfce7",
                      color: "#15803d",
                      padding: "5px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>{habit.stats.done}</div>
                    <div style={{ fontSize: "11px" }}>کل تیک‌ها</div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#fee2e2",
                      color: "#b91c1c",
                      padding: "5px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {habit.stats.missed}
                    </div>
                    <div style={{ fontSize: "11px" }}>کل بدهی‌ها</div>
                  </div>
                </div>
              </div>

              {/* بخش روزنگار با آمار دقیق کسر پیشرفت */}
              <div style={{ marginTop: "15px" }}>
                <h4
                  style={{
                    fontSize: "14px",
                    color: "#475569",
                    marginBottom: "10px",
                  }}
                >
                  وضعیت روزانه (تعداد انجام شده / تارگت روز):
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {habit.history.map((day) => {
                    let badgeBg = "#ef4444"; // کلاً صفر بار انجام شده (missed)
                    let badgeText = `❌ (${day.doneCount}/${day.target})`;

                    if (day.status === "done") {
                      badgeBg = "#22c55e";
                      badgeText = `✅ (${day.doneCount}/${day.target})`;
                    } else if (day.status === "partial") {
                      badgeBg = "#f97316"; // رنگ نارنجی برای عادات ناقص تیک‌خورده
                      badgeText = `⚠️ (${day.doneCount}/${day.target})`;
                    } else if (day.status === "today-pending") {
                      badgeBg = "#eab308";
                      badgeText = `⏳ امروز (${day.doneCount}/${day.target})`;
                    }

                    return (
                      <div
                        key={day.date}
                        style={{
                          backgroundColor: badgeBg,
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          direction: "ltr",
                          fontWeight: "5px",
                        }}
                      >
                        {day.date} : {badgeText}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <OscarCommand />
    </>
  );
}
