import React, { useState } from "react";
import { Lock, User, KeyRound, X, AlertCircle, Loader2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminLogin({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("portfolio_admin_token", data.token);
        localStorage.setItem("portfolio_admin_user", JSON.stringify(data.user));
        onLoginSuccess(data.token, data.user);
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Cannot reach backend server. Please verify the server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card admin-login-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="admin-header">
          <div className="admin-icon-orb">
            <Lock size={22} />
          </div>
          <h2>Admin Portal</h2>
          <p>Sign in to manage inquiries and messages</p>
        </div>

        {error && (
          <div className="form-error-banner">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="admin-username">Username</label>
            <div className="input-with-icon">
              <User size={16} className="input-icon" />
              <input
                id="admin-username"
                type="text"
                required
                placeholder="Username (default: admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <div className="input-with-icon">
              <KeyRound size={16} className="input-icon" />
              <input
                id="admin-password"
                type="password"
                required
                placeholder="Password (default: admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="primary submit-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="spinner" size={16} />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Access Dashboard</span>
            )}
          </button>
        </form>

        <div className="admin-hint">
          <small>Default credentials: <b>admin</b> / <b>admin123</b></small>
        </div>
      </div>
    </div>
  );
}
