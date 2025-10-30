import React, { useState, useEffect } from "react";
import { apiRequest } from "../api";

export default function TaskList({ refreshFlag, onTaskUpdated }) {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const query = `?${filters.status ? `status=${filters.status}&` : ""}${
          filters.priority ? `priority=${filters.priority}&` : ""
        }sort=due_date&order=${sortOrder}&page=1&limit=100`;

        const res = await apiRequest(`/tasks${query}`, "GET", null, true);
        setTasks(Array.isArray(res) ? res : res.tasks || []);
      } catch (err) {
        console.error("Error loading tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [filters, sortOrder, refreshFlag]);

  const handleUpdate = async (id, field, value) => {
    try {
      await apiRequest(`/tasks/${id}`, "PATCH", { [field]: value }, true);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setEditData({ title: task.title, description: task.description });
  };

  const handleSaveClick = async (id) => {
    try {
      await apiRequest(`/tasks/${id}`, "PATCH", editData, true);
      setEditingId(null);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  if (loading) return <div className="task-list">Loading tasks...</div>;

  return (
    <div className="task-list">
      <h3>Your Tasks</h3>
      <div className="filters">
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          className="sort-button"
          onClick={() =>
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
          }
        >
          Due Date
          <span className={`arrow ${sortOrder === "asc" ? "up" : "down"}`} />
        </button>
      </div>

      <ul>
        {tasks.length === 0 && <p>No tasks found.</p>}
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingId === task.id ? (
              <>
                <input
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
                <div className="task-buttons">
                  <button onClick={() => handleSaveClick(task.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>
                  Priority:
                  <select
                    value={task.priority}
                    onChange={(e) =>
                      handleUpdate(task.id, "priority", e.target.value)
                    }
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </p>
                <p>
                  Status:
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleUpdate(task.id, "status", e.target.value)
                    }
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </p>
                <p className="due-date">Due: {task.due_date}</p>
                <button onClick={() => handleEditClick(task)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .task-list {
          background: #fdf6f0;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #d8bfa5;
        }

        .filters {
          display: flex;
          gap: 12px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        select {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid #d8bfa5;
          background: #fff8f0;
          color: #5a3e2b;
        }

        .sort-button {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #a67c52;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          cursor: pointer;
          font-weight: bold;
          position: relative;
        }

        .arrow {
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 6px;
          vertical-align: middle;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
        }

        .arrow.up {
          border-bottom: 8px solid white;
        }

        .arrow.down {
          border-top: 8px solid white;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        .task-item {
          background: #fffaf4;
          padding: 14px;
          border: 1px solid #d8bfa5;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .task-item h4 {
          margin: 0 0 6px 0;
          color: #5a3e2b;
        }

        .task-item p {
          margin: 5px 0;
          color: #704d32;
        }

        input,
        textarea {
          background: #fff8f0;
          border: 1px solid #d8bfa5;
          border-radius: 6px;
          padding: 6px 10px;
          width: 100%;
          margin-bottom: 6px;
          color: #5a3e2b;
        }

        .task-buttons {
          display: flex;
          gap: 10px;
        }

        button {
          background: #a67c52;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
        }

        button:hover {
          background: #8b6142;
        }

        .due-date {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
