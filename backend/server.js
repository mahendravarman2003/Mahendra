import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Allowed Origins list (can be configured via FRONTEND_URL in .env)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:4173",
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",").map((s) => s.trim()) : []),
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    // Allow configured origins, any Vercel deployment (*.vercel.app), or localhost
    const isAllowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app") ||
      origin.includes("localhost") ||
      origin.includes("127.0.0.1");

    if (isAllowed) {
      return callback(null, true);
    }

    // Fallback allow for public portfolio API
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Mahendravarman's Portfolio Backend API is Running!",
    status: "online",
    frontend: "http://localhost:5173",
    endpoints: {
      health: "/api/health",
      contact: "/api/contact",
      auth: "/api/auth/login",
    },
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// Global 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio Backend Server running on http://localhost:${PORT}`);
  });
}

export default app;
