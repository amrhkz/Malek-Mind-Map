// components/OscarCommand.jsx
"use client";
import { useEffect, useState } from "react";

export default function OscarCommand() {
  const [command, setCommand] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOscarCommand = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/oscar/command", {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      setCommand(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Oscar command:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOscarCommand();
  }, []);

  // تابع کمکی برای سبز کردن متون داخل کروشه مثل تاریخ موجود در عکس
  const formatMessage = (msg) => {
    if (!msg) return "";
    const parts = msg.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        return (
          <span key={index} style={{ color: "#22c55e", fontWeight: "bold" }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  if (loading) {
    return (
      <div style={{
        fontFamily: "IranSans",
        padding: "24px",
        textAlign: "center",
        backgroundColor: "#0d1527",
        border: "1px solid #17233b",
        borderRadius: "12px",
        color: "#64748b",
        fontSize: "13px"
      }}>
        ⏳ اسکار در حال شخم زدن تقویم و عادات شماست...
      </div>
    );
  }

  if (!command) return null;

  // کانفیگ تم‌های تاریک و نئونی اسکار متناسب با تصویر
  let theme = {
    bg: "#0d1527",
    border: "#2e2511",
    accentText: "#facc15",
    title: "🛡️ وضعیت: سپر امروز (Shield Mode)",
    btnBg: "#d97706",
    iconBg: "#231c0c",
    icon: "🛡️"
  };

  if (command.mode === "DEBT_MODE") {
    theme = {
      bg: "#0d1527",
      border: "#17233b",
      accentText: "#38bdf8",
      title: "وضعیت: وصول بدهی گذشته",
      subTitle: "(Debt Collector)",
      btnBg: "#2563eb",
      iconBg: "#1e1b4b",
      icon: "💼"
    };
  } else if (command.mode === "MONEY_MODE") {
    theme = {
      bg: "#0d1527",
      border: "#065f46",
      accentText: "#34d399",
      title: "💰 وضعیت: چراغ سبز (Money Making)",
      btnBg: "#10b981",
      iconBg: "#0a1e1a",
      icon: "💰"
    };
  }

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        border: "1px solid #17233b",
        borderRadius: "12px",
        padding: "24px",
        width: "100%",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        direction: "rtl",
        fontFamily: "IranSans, sans-serif"
      }}
    >
      {/* هدر باکس اسکار */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontWeight: "700", color: "#ffffff", fontSize: "15px" }}>
            {theme.title}
          </span>
          {theme.subTitle && (
            <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>
              {theme.subTitle}
            </span>
          )}
        </div>

        <div style={{
          backgroundColor: theme.iconBg,
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          border: `1px solid ${command.mode === "DEBT_MODE" ? "#312e81" : theme.border}`
        }}>
          {theme.icon}
        </div>
      </div>

      {/* متن پیام اسکار */}
      <div
        style={{
          color: "#94a3b8",
          lineHeight: "1.8",
          fontSize: "13px",
          fontWeight: "400",
          textAlign: "center",
          marginBottom: "24px",
          padding: "0 10px"
        }}
      >
        {formatMessage(command.message)}
      </div>

      {/* لیست عادات هدف - بازطراحی شده صرفاً به صورت متن و نمایش آماری */}
      {command.targetTasks.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {command.targetTasks.map((task) => (
            <div
              key={task._id}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#080d1a",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #16223f",
              }}
            >
              {/* نشانگر رنگی وضعیت متناسب با تم جاری اسکار */}
              <span style={{ 
                color: theme.accentText, 
                marginLeft: "10px", 
                fontSize: "16px",
                lineHeight: "1" 
              }}>
                •
              </span>
              
              {/* عنوان عادت */}
              <span style={{ color: "#ffffff", fontSize: "13.5px", fontWeight: "500" }}>
                {task.title}
              </span>

              {/* آمار عددی به صورت متن ساده در سمت چپ باکس */}
              <span style={{ 
                fontSize: "12px", 
                color: "#475569", 
                marginRight: "auto",
                direction: "ltr"
              }}>
                ({task.done} / {task.target})
              </span>
            </div>
          ))}
        </div>
      )}

      {/* دکمه ناوبری حالت مانی مود */}
      {command.mode === "MONEY_MODE" && (
        <div style={{ display: "flex", justifyContent: "stretch", marginTop: "16px" }}>
          <button
            onClick={() => (window.location.href = "/dashboard/projects")}
            style={{
              backgroundColor: theme.btnBg,
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "13px",
              width: "100%",
              textAlign: "center"
            }}
          >
            ورود به اتاق جنگ مالک تک 🚀
          </button>
        </div>
      )}

      {/* دکمه فوتر مشاهده همه موارد */}
      {command.mode !== "MONEY_MODE" && (
        <div style={{
          borderTop: "1px solid #17233b",
          marginTop: "20px",
          paddingTop: "14px",
          textAlign: "center"
        }}>
          <span style={{
            color: "#475569",
            fontSize: "12px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: "500"
          }}
          onMouseEnter={(e) => e.target.style.color = "#94a3b8"}
          onMouseLeave={(e) => e.target.style.color = "#475569"}
          >
            📋 مشاهده همه موارد
          </span>
        </div>
      )}
    </div>
  );
}