


import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import InsightsPanel from "./components/InsightsPanel";
import "./index.css";

export default function App() {
  const [view, setView] = useState(localStorage.getItem("token") ? "tasks" : "login");
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setView("login");
  };

  const triggerRefresh = () => setRefreshFlag((prev) => !prev);

  if (view === "login")
    return <Login onSwitch={() => setView("register")} onSuccess={() => setView("tasks")} />;

  if (view === "register") return <Register onSwitch={() => setView("login")} />;

  return (
    <div className="container">
      <header>
        <h1>Task Tracker</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <div className="left-panel">
    
          <TaskForm onTaskCreated={triggerRefresh} />
          <InsightsPanel refreshFlag={refreshFlag} />
        </div>

        <div className="right-panel">
       
          <TaskList refreshFlag={refreshFlag} onTaskUpdated={triggerRefresh} />
        </div>
      </main>
    </div>
  );
}

