import React, { useState } from "react";
import { apiRequest } from "../api";

export default function TaskForm({ onTaskCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest("/tasks", "POST", form, true);
      setMessage("Task created!");
      setForm({ title: "", description: "", priority: "Medium", due_date: "" });
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      setMessage(`Oops! ${err.message}`);
    }
  };

  return (
    <div className="form-box">
      <h3>New Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="form-row">
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="date"
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            required
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
      {message && <p className="message">{message}</p>}

      <style jsx>{`
        .form-box {
          background: #fff8f0;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #d2b48c;
          max-width: 400px;
          margin: 20px auto;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
          font-family: "Segoe UI", sans-serif;
        }

        h3 {
          margin-bottom: 16px;
          color: #5a3e2b;
          font-weight: 600;
          font-size: 18px;
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        input,
        textarea,
        select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #cbb292;
          background: #fff6f0;
          font-size: 14px;
          color: #5a3e2b;
          width: 100%;
          box-sizing: border-box;
        }

        textarea {
          min-height: 60px;
          resize: vertical;
        }

        .form-row {
          display: flex;
          gap: 10px;
        }

        .form-row select,
        .form-row input[type="date"] {
          flex: 1;
        }

        button {
          background: #a67c52;
          color: #fff;
          border: none;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        button:hover {
          background: #926442;
        }

        .message {
          margin-top: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #704d32;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
