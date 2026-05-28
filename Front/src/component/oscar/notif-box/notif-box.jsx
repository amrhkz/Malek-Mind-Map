"use client";
import React, { useEffect, useRef } from "react";
import Oscar from "../oscar";
import "./notif-box.css";

function NotifBox({ show = false, message = "", onClose }) {
  const boxRef = useRef(null);

  useEffect(() => {
    if (!show) return;

    const handleClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="oscar-box" ref={boxRef}>
      <Oscar width={55} height={55} />
      <p className="oscar-text">{message}</p>
    </div>
  );
}

export default NotifBox;
