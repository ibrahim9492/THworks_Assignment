import React, { useState } from "react";
import { apiRequest } from "../api";

export default function Login({ onSwitch, onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest("/users/login", "POST", form);
      localStorage.setItem("token", res.token);
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="message">{error}</p>}
      </form>
      <p className="switch-text">
        No account?{" "}
        <button className="switch-btn" onClick={onSwitch}>
          Register
        </button>
      </p>

      <style jsx>{`
        .auth-box {
          background: #fff8f0;
          padding: 24px 28px;
          border-radius: 12px;
          border: 1px solid #d2b48c;
          max-width: 380px;
          margin: 40px auto;
          font-family: "Segoe UI", sans-serif;
        }

        .auth-box h2 {
          margin-bottom: 18px;
          color: #5a3e2b;
          font-weight: 600;
          font-size: 22px;
        }

        .auth-box form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .auth-box input {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #cbb292;
          background: #fff6f0;
          font-size: 14px;
          color: #5a3e2b;
        }

        /* Scoped button inside form */
        .auth-box form button {
          background: #a67c52;
          color: #fff;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .auth-box .message {
          margin-top: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #b03a2e; 
        }

        .auth-box .switch-text {
          margin-top: 16px;
          font-size: 14px;
          color: #5a3e2b;
        }

        .auth-box .switch-text .switch-btn {
          background: none;
          border: none;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          color: #a67c52;
        }

        .auth-box .switch-text .switch-btn:hover,
        .auth-box .switch-text .switch-btn:focus,
        .auth-box .switch-text .switch-btn:active {
          background: none !important;
          color: #a67c52 !important;
          text-decoration: none !important;
          outline: none !important;
        }
      `}</style>
    </div>
  );
}
