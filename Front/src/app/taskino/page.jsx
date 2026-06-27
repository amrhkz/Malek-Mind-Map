"use client";
import { useEffect, useState } from "react";
import Container from "@/component/container/container";
import "./taskino.css";
import Modal, { ModalMenu, ModalToggle } from "@/component/modal/modal";

export default function Page() {
  const [taskino, setTaskino] = useState([]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(15);

  useEffect(() => {
    getTaskinos();
  }, []);

  const getTaskinos = async () => {
    try {
      const res = await fetch("http://localhost:4000/taskino", {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      setTaskino(data);
    } catch (error) {
      console.error("Error fetching habits history:", error);
    }
  };

  async function createTask() {
    if (!title.trim()) return;
    try {
      await fetch("http://localhost:4000/taskino", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          notes,
          estimatedTime,
        }),
      });
      setTitle("");
      setNotes("");
      setEstimatedTime(15);
      getTaskinos();
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleTask(id) {
    try {
      await fetch(`${"http://localhost:4000/taskino"}/${id}/toggle`, {
        method: "PATCH",
        credentials: "include",
      });

      getTaskinos();
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTask(id) {
    try {
      await fetch(`${"http://localhost:4000/taskino"}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      getTaskinos();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <div className="taskino">
        <div className="taskino-header">
          <div>
            <h1>🧠 Taskino</h1>
            <p>Empty your mind. Focus on doing.</p>
          </div>

          <Modal>
            <ModalToggle>
              <button className="new-task-btn">+ New Task</button>
            </ModalToggle>

            <ModalMenu width={520}>
              <div className="task-modal">
                <h2>New Task</h2>

                <div className="form-group">
                  <label>Task</label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What is on your mind?"
                  />
                </div>

                <div className="form-group">
                  <label>Estimated Time</label>

                  <div className="time-grid">
                    {[5, 10, 15, 30, 45, 60, 120, 240].map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={estimatedTime === time ? "active-time" : ""}
                        onClick={() => setEstimatedTime(time)}
                      >
                        {time >= 60 ? `${time / 60}h` : `${time}m`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Notes</label>

                  <textarea
                    rows={5}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Anything you don't want to forget..."
                  />
                </div>

                <button className="save-btn" onClick={createTask}>
                  Save Task
                </button>
              </div>
            </ModalMenu>
          </Modal>
        </div>

        <div className="task-list">
          {taskino.map((task) => (
            <div
              key={task._id}
              className={`task-card ${task.completed ? "completed" : ""}`}
            >
              <div className="left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id)}
                />

                <div>
                  <h4>{task.title}</h4>

                  <span>
                    ⏱{" "}
                    {task.estimatedTime >= 60
                      ? `${task.estimatedTime / 60}h`
                      : `${task.estimatedTime}m`}
                  </span>

                  {task.notes && <p className="notes">{task.notes}</p>}
                </div>
              </div>

              <div className="actions">
                <button onClick={() => deleteTask(task._id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
