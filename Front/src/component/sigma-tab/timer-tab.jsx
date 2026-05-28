"use client";
import React, { useEffect, useState } from "react";
import "./timer-tab.css";
import Modal, { ModalMenu, ModalToggle } from "../modal/modal";

function TimerTab() {
  const [timers, setTimers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [startTime, setStartTime] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTimers = async () => {
      try {
        console.log("⏳ Fetching timers...");
        const res = await fetch("http://localhost:4000/timer", {
          cache: "no-store",
          credentials: "include",
        });
        console.log("📡 Response status:", res.status);
        if (!res.ok) throw new Error("Failed fetching timers");
        const data = await res.json();
        console.log("📥 Received timers:", data);
        console.log("🔍 Type:", Array.isArray(data) ? "Array" : typeof data);
        setTimers(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      }
    };

    fetchTimers();
  }, []);

  const addTimer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const body = {
        title,
        desc,
        startTime: new Date(startTime).getTime(),
        status,
      };
      const res = await fetch("http://localhost:4000/timer", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to create timer");
      const newTimer = await res.json();
      setTimers((prev) => [...prev, newTimer]);
      setTitle("");
      setDesc("");
      setStartTime("");
      setStatus("ongoing");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTimer = async (id) => {
    if (!confirm("Delete timer?")) return;
    try {
      const res = await fetch(`http://localhost:4000/timer/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setTimers((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed deleting timer");
    }
  };

  return (
    <div className="timer-tab">
      <div className="timer-controls">
        <div className="filters">
          <div
            className={`filter-item ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </div>

          <div
            className={`filter-item ${filter === "ongoing" ? "active" : ""}`}
            onClick={() => setFilter("ongoing")}
          >
            Ongoing
          </div>

          <div
            className={`filter-item ${filter === "done" ? "active" : ""}`}
            onClick={() => setFilter("done")}
          >
            Done
          </div>

          <div
            className={`filter-item ${filter === "archived" ? "active" : ""}`}
            onClick={() => setFilter("archived")}
          >
            Archived
          </div>
        </div>

        <Modal>
          <ModalToggle>
            <div className="new-timer">New Timer</div>
          </ModalToggle>
          <ModalMenu>
            <div className="new-timer-menu">
              <form onSubmit={addTimer}>
                <div className="title">Add New Timer</div>
                <input
                  type="text"
                  required
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Start Time</label>
                <input
                  type="datetime-local"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="done">Done</option>
                  <option value="archived">Archived</option>
                </select>
                <button disabled={isLoading}>
                  {isLoading ? (
                    <i className="bx bx-loader-alt bx-spin"></i>
                  ) : (
                    "Add"
                  )}
                </button>
              </form>
            </div>
          </ModalMenu>
        </Modal>
      </div>
      <div className="timer-list">
        {timers.length ? (
          timers.map((timer) => (
            <div className="timer-item" key={timer._id}>
              <div className="title">{timer.title}</div>
                <div className="status">{timer.status}</div>
                <div className="time">
                  Start: {new Date(timer.startTime).toLocaleString("fa-IR")}
                </div>
              <Modal>
                <ModalToggle>
                  <i className="bx bx-dots-horizontal-rounded bx-sm"></i>
                </ModalToggle>
                <ModalMenu>
                  <div className="update-timer">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setIsLoading(true);
                        const body = {
                          title: e.target.title.value,
                          startTime: new Date(
                            e.target.startTime.value
                          ).getTime(),
                          status: e.target.status.value,
                        };
                        try {
                          const res = await fetch(
                            `http://localhost:4000/timer/${timer._id}`,
                            {
                              method: "PUT",
                              credentials: "include",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(body),
                            }
                          );
                          if (!res.ok) throw new Error("Update failed");
                          const updated = await res.json();
                          setTimers((prev) =>
                            prev.map((t) => (t._id === timer._id ? updated : t))
                          );
                          alert("✔️ Timer updated");
                        } catch (err) {
                          console.error(err);
                          alert("❌ Update failed");
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                    >
                      <div className="title">Edit Timer</div>
                      <input
                        type="text"
                        name="title"
                        defaultValue={timer.title}
                        placeholder="Title"
                        required
                      />
                      <label>Start Time</label>
                      <input
                        type="datetime-local"
                        name="startTime"
                        defaultValue={new Date(timer.startTime)
                          .toISOString()
                          .slice(0, 16)}
                        required
                      />
                      <label>Status</label>
                      <select name="status" defaultValue={timer.status}>
                        <option value="ongoing">Ongoing</option>
                        <option value="done">Done</option>
                        <option value="archived">Archived</option>
                      </select>
                      <div className="buttons">
                        <button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <i className="bx bx-loader-alt bx-spin"></i>
                          ) : (
                            "Update"
                          )}
                        </button>
                        <button
                          type="button"
                          className="reset-btn"
                          disabled={isLoading}
                          onClick={async () => {
                            try {
                              setIsLoading(true);
                              const res = await fetch(
                                `http://localhost:4000/timer/reset/${timer._id}`,
                                {
                                  method: "POST",
                                  credentials: "include",
                                }
                              );
                              if (!res.ok) throw new Error("Reset failed");
                              const data = await res.json();
                              setTimers((prev) =>
                                prev.map((t) =>
                                  t._id === timer._id ? data.timer : t
                                )
                              );
                              alert("🔄 Timer reset!");
                            } catch (err) {
                              console.error(err);
                              alert("❌ Reset failed");
                            } finally {
                              setIsLoading(false);
                            }
                          }}
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          disabled={isLoading}
                          onClick={async () => {
                            if (!confirm(`Delete "${timer.title}" ?`)) return;
                            try {
                              const res = await fetch(
                                `http://localhost:4000/timer/${timer._id}`,
                                {
                                  method: "DELETE",
                                  credentials: "include",
                                }
                              );
                              if (!res.ok) throw new Error("Delete failed");
                              setTimers((prev) =>
                                prev.filter((t) => t._id !== timer._id)
                              );
                              alert("🗑️ Timer deleted");
                            } catch (err) {
                              console.error(err);
                              alert("❌ Delete failed");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </div>
                </ModalMenu>
              </Modal>
            </div>
          ))
        ) : (
          <p>No timers found...</p>
        )}
      </div>
    </div>
  );
}

export default TimerTab;
