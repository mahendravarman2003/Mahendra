import React, { useState, useEffect, useCallback } from "react";
import {
  Inbox,
  Mail,
  Trash2,
  CheckCircle,
  RefreshCw,
  Search,
  LogOut,
  X,
  ExternalLink,
  Clock,
  User,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminDashboard({ isOpen, onClose, onLogout, token }) {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, last24Hours: 0 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'unread' | 'read'
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/contact/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  }, [token]);

  const fetchMessages = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      let url = `${API_BASE}/contact?`;
      if (filter === "unread") url += "isRead=false&";
      if (filter === "read") url += "isRead=true&";
      if (search) url += `search=${encodeURIComponent(search)}&`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        onLogout();
        return;
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setMessages(data.data);
      } else {
        setError(data.message || "Failed to load messages");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Cannot reach backend server. Please verify server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }, [token, filter, search, onLogout]);

  useEffect(() => {
    if (isOpen && token) {
      fetchStats();
      fetchMessages();
    }
  }, [isOpen, token, fetchStats, fetchMessages]);

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_BASE}/contact/${id}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isRead: !currentStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, isRead: !currentStatus } : m))
        );
        fetchStats();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`${API_BASE}/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        fetchStats();
      }
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card admin-dashboard-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navbar */}
        <div className="dashboard-header">
          <div className="dashboard-title">
            <div className="dash-badge">
              <ShieldCheck size={16} />
              <span>ADMIN INBOX</span>
            </div>
            <h2>Inquiries & Messages</h2>
          </div>

          <div className="dashboard-actions">
            <button
              className="action-btn"
              onClick={() => {
                fetchStats();
                fetchMessages();
              }}
              title="Refresh messages"
            >
              <RefreshCw size={15} className={loading ? "spin" : ""} />
            </button>
            <button
              className="action-btn danger"
              onClick={onLogout}
              title="Sign Out"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
            <button
              className="modal-close-static"
              onClick={onClose}
              title="Close panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Analytics Stats */}
        <div className="dash-stats-grid">
          <div className="dash-stat-card">
            <small>TOTAL INQUIRIES</small>
            <b>{stats.total}</b>
            <span>All time received</span>
          </div>
          <div className="dash-stat-card highlight">
            <small>UNREAD MESSAGES</small>
            <b>{stats.unread}</b>
            <span>Requires response</span>
          </div>
          <div className="dash-stat-card">
            <small>LAST 24 HOURS</small>
            <b>{stats.last24Hours}</b>
            <span>Recent contacts</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="dash-controls">
          <div className="dash-search">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search sender, email, subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="dash-filter-pills">
            <button
              className={filter === "all" ? "filter-pill active" : "filter-pill"}
              onClick={() => setFilter("all")}
            >
              All ({stats.total})
            </button>
            <button
              className={filter === "unread" ? "filter-pill active" : "filter-pill"}
              onClick={() => setFilter("unread")}
            >
              Unread ({stats.unread})
            </button>
            <button
              className={filter === "read" ? "filter-pill active" : "filter-pill"}
              onClick={() => setFilter("read")}
            >
              Read ({stats.read || 0})
            </button>
          </div>
        </div>

        {error && (
          <div className="form-error-banner" style={{ margin: "16px 24px" }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Messages List Container */}
        <div className="dash-messages-container">
          {loading && messages.length === 0 ? (
            <div className="dash-empty-state">
              <RefreshCw className="spin" size={28} />
              <p>Loading inquiries...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="dash-empty-state">
              <Inbox size={42} />
              <h4>No messages found</h4>
              <p>
                {filter === "unread"
                  ? "You have answered all pending inquiries!"
                  : "Messages submitted via the contact form will appear here."}
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`dash-message-card ${!msg.isRead ? "unread" : ""}`}
              >
                <div className="msg-card-top">
                  <div className="msg-sender-info">
                    <div className="msg-avatar">
                      <User size={14} />
                    </div>
                    <div>
                      <div className="sender-line">
                        <h4>{msg.name}</h4>
                        {!msg.isRead && <span className="unread-dot" title="Unread" />}
                      </div>
                      <a href={`mailto:${msg.email}`} className="sender-email">
                        {msg.email}
                      </a>
                    </div>
                  </div>

                  <div className="msg-meta">
                    <span className="msg-date">
                      <Clock size={12} />
                      {new Date(msg.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>

                <div className="msg-content">
                  <h5>{msg.subject}</h5>
                  <p>{msg.message}</p>
                </div>

                <div className="msg-card-actions">
                  <button
                    className={`btn-tag ${msg.isRead ? "marked" : ""}`}
                    onClick={() => handleToggleRead(msg._id, msg.isRead)}
                  >
                    <CheckCircle size={13} />
                    <span>{msg.isRead ? "Mark as Unread" : "Mark as Read"}</span>
                  </button>

                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                      msg.subject
                    )}&body=Hi ${encodeURIComponent(
                      msg.name
                    )},%0D%0A%0D%0AThank you for reaching out.%0D%0A%0D%0A`}
                    className="btn-tag primary-tag"
                  >
                    <Mail size={13} />
                    <span>Reply via Email</span>
                    <ExternalLink size={11} />
                  </a>

                  <button
                    className="btn-tag delete-tag"
                    onClick={() => handleDelete(msg._id)}
                    title="Delete message"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
