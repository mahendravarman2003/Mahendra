import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit message. Please try again.");
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      setStatus("error");
      setErrorMessage(
        "Could not connect to backend server. Please ensure the server is running or reach out via email directly."
      );
    }
  };

  return (
    <div className="contact-form-card">
      <div className="form-header">
        <h3>Send a Direct Message</h3>
        <p>I usually respond within 24 hours.</p>
      </div>

      {status === "success" ? (
        <div className="form-success-banner">
          <CheckCircle2 size={32} className="success-icon" />
          <h4>Message Sent Successfully!</h4>
          <p>Thank you for reaching out, Mahendravarman will get back to you shortly.</p>
          <button className="secondary" onClick={() => setStatus("idle")}>
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          {status === "error" && (
            <div className="form-error-banner">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading"}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="e.g. john@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading"}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="e.g. Software Engineering Opportunity / Project Collab"
              value={formData.subject}
              onChange={handleChange}
              disabled={status === "loading"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              disabled={status === "loading"}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="spinner" size={16} />
                <span>Sending message...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
