// app/test-habits/page.jsx
"use client";
import Container from "@/component/container/container";
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
      <div style={{ 
        fontFamily: "IranSans", 
        padding: "40px", 
        backgroundColor: "#080d1a", 
        color: "#94a3b8", 
        minHeight: "100vh", 
        textAlign: "center",
        fontSize: "16px"
      }}>
        ⏳ در حال پردازش جزئیات عادات توسط مغز متفکر اسکار...
      </div>
    );

  return (
    <Container>
      {/* پوسته اصلی تاریک کل صفحه */}
      <div style={{ backgroundColor: "#080d1a", minHeight: "100vh", padding: "20px 10px" }}>
        
        {/* هدر بخش آنالیز اسکار */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto 25px auto",
          padding: "0 10px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2 style={{ color: "#ffffff", fontSize: "18px", margin: 0, fontWeight: "bold" }}>
              📊 آنالیز پیشرفت عادات به تفکیک تعداد دفعات
            </h2>
            <span style={{
              backgroundColor: "#1e1b4b",
              color: "#818cf8",
              border: "1px solid #312e81",
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: "600"
            }}>
              OSCAR CORE v1.1
            </span>
          </div>

          <button style={{
            backgroundColor: "#0f172a",
            color: "#94a3b8",
            border: "1px solid #1e293b",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            🗓️ فیلتر زمان
          </button>
        </div>

        {/* گرید دو ستونه: سمت راست دستورات اسکار / سمت چپ کارت‌های عادات */}
        <div className="oscarDash flex" style={{
          display: "flex",
          gap: "24px",
          margin: "0 auto",
          fontFamily: "IranSans, Poppins, sans-serif",
          alignItems: "flex-start"
        }}>
          
          {/* ستون سمت چپ: لیست عادات */}
          <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "20px" }}>
            {habits.map((habit) => (
              <div
                key={habit._id}
                style={{
                  backgroundColor: "#0d1527",
                  border: "1px solid #17233b",
                  padding: "24px",
                  borderRadius: "12px",
                }}
              >
                {/* هدر اطلاعات عادت و آمار ۳ تایی نئون */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #17233b",
                    paddingBottom: "16px",
                  }}
                >
                  {/* اطلاعات سمت راست */}
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", color: "#ffffff", fontSize: "18px", fontWeight: "bold" }}>
                      {habit.title}
                    </h3>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      نوع عادت: <span style={{ color: "#94a3b8" }}>{habit.habitType}</span> | تکرار: <span style={{ color: "#94a3b8" }}>{habit.repeat}</span>
                    </span>
                  </div>

                  {/* آمار ۳ تایی تطبیق داده شده با پلت رنگی عکس */}
                  <div style={{ display: "flex", gap: "12px", textAlign: "center" }}>
                    
                    {/* کل تارگت‌ها (آبی شب) */}
                    <div style={{
                      backgroundColor: "#0f1b35",
                      border: "1px solid #1e40af",
                      color: "#60a5fa",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      minWidth: "90px"
                    }}>
                      <div style={{ fontWeight: "bold", fontSize: "16px" }}>{habit.stats.totalRequired}</div>
                      <div style={{ fontSize: "10px", color: "#93c5fd", marginTop: "2px" }}>کل بازگشت‌ها</div>
                    </div>

                    {/* کل تیک‌ها (سبز نئون دیپ) */}
                    <div style={{
                      backgroundColor: "#0a1e1a",
                      border: "1px solid #065f46",
                      color: "#34d399",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      minWidth: "90px"
                    }}>
                      <div style={{ fontWeight: "bold", fontSize: "16px" }}>{habit.stats.done}</div>
                      <div style={{ fontSize: "10px", color: "#6ee7b7", marginTop: "2px" }}>کل تیک‌ها</div>
                    </div>

                    {/* کل بدهی‌ها (قرمز آتشی دیپ) */}
                    <div style={{
                      backgroundColor: "#1c1018",
                      border: "1px solid #7f1d1d",
                      color: "#f87171",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      minWidth: "100px"
                    }}>
                      <div style={{ fontWeight: "bold", fontSize: "16px" }}>{habit.stats.missed}</div>
                      <div style={{ fontSize: "10px", color: "#fca5a5", marginTop: "2px" }}>کل دفعات حذرها</div>
                    </div>

                  </div>
                </div>

                {/* بخش روزنگار با استایل باکس‌های دور خطه شیک دو ردیفه */}
                <div style={{ marginTop: "20px" }}>
                  <h4 style={{ fontSize: "13px", color: "#64748b", marginBottom: "12px", fontWeight: "500" }}>
                    وضعیت روزانه (تعداد انجام شده / تارگت روز):
                  </h4>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {habit.history.map((day) => {
                      // استایل پیش‌فرض برای حالت Missed (قرمز دیپ شب)
                      let boxBg = "#1a1013";
                      let boxBorder = "1px solid #5c1d24";
                      let textColor = "#f87171";
                      let statusIcon = "×";

                      if (day.status === "done") {
                        boxBg = "#091f1a";
                        boxBorder = "1px solid #0f766e";
                        textColor = "#34d399";
                        statusIcon = "✓";
                      } else if (day.status === "partial") {
                        boxBg = "#24140d";
                        boxBorder = "1px solid #9a3412";
                        textColor = "#fb923c";
                        statusIcon = "⚠️";
                      } else if (day.status === "today-pending") {
                        boxBg = "#231c0c";
                        boxBorder = "1px solid #854d0e";
                        textColor = "#facc15";
                        statusIcon = "⏳";
                      }

                      return (
                        <div
                          key={day.date}
                          style={{
                            backgroundColor: boxBg,
                            border: boxBorder,
                            color: textColor,
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "85px",
                            textAlign: "center"
                          }}
                        >
                          {/* ردیف اول: تاریخ روز */}
                          <span style={{ fontSize: "11px", opacity: 0.85, marginBottom: "4px" }}>
                            {day.date}
                          </span>
                          {/* ردیف دوم: وضعیت تیک و شمارشگر */}
                          <span style={{ fontWeight: "bold", fontSize: "12px", direction: "ltr" }}>
                            {statusIcon} ({day.doneCount}/{day.target})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ستون سمت راست: کامپوننت دستورات یا وصول بدهی اسکار */}
          <div style={{ width: "450px", position: "sticky", top: "20px" }}>
            <OscarCommand />
          </div>

        </div>
      </div>
    </Container>
  );
}