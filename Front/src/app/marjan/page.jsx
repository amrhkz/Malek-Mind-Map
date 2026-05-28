"use client";
import React, { useEffect, useState, useRef } from "react";
import Container from "@/component/container/container";
import "./partner.css";

const USER_EMAIL = "amrhkz@outlook.com";
const PARTNER_EMAIL = "sadeghian.marjan13@gmail.com";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:4000/messages", {
          credentials: "include",
        });
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("خطا در دریافت پیام‌ها:", err);
        setMessages([]);
      }
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const msg = {
      sender: USER_EMAIL === "amrhkz@outlook.com" ? "me" : "user",
      text: newMessage,
      avatar: "/img/amrhkz.png",
      email: USER_EMAIL,
    };

    try {
      const res = await fetch("http://localhost:4000/messages", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });

      const savedMsg = await res.json();

      setMessages((prev) => [...prev, savedMsg]);
      setNewMessage("");
    } catch (err) {
      console.error("خطا در ارسال پیام:", err);
    }
  };

  const getAvatar = (email) => {
    if (email === USER_EMAIL) return "/img/amrhkz.png";
    if (email === PARTNER_EMAIL) return "/img/marjan.png";
    return "/img/default.png";
  };

  return (
    <Container>
      <div className="partner-container">
        <div className="partner-chat">
          <div className="chat-title">
            <div className="back-btn">
              <i className="bx bx-chevron-left bx-sm"></i> Back
            </div>
            <div className="status">Online</div>
            <div className="avatar">
              <img src={getAvatar(USER_EMAIL)} alt="" />
            </div>
          </div>

          <div className="chat-box">
            {messages.map((msg, i) => {
              const isMe = msg.email === USER_EMAIL;
              return (
                <div key={i} className={`chat-row ${isMe ? "me" : "user"}`}>
                  {!isMe && (
                    <img
                      src={getAvatar(msg.email)}
                      alt="avatar"
                      className="avatar"
                    />
                  )}

                  <div className={`chat-bubble ${isMe ? "me" : "user"}`}>
                    {msg.text}
                  </div>

                  {isMe && (
                    <img
                      src={getAvatar(msg.email)}
                      alt="avatar"
                      className="avatar"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="type-field">
            <div className="attach">
              <i className="bx bx-plus bx-sm"></i>
            </div>

            <div className="input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
            </div>

            <div className="send-btn" onClick={handleSend}>
              <i className="bx bxs-paper-plane bx-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
