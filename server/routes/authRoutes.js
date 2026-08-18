import express from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Helper to generate JWT
const generateToken = (id, username) => {
  return jwt.sign(
    { id, username },
    process.env.JWT_SECRET || "mahendravarman_portfolio_secret_key_2026",
    { expiresIn: "7d" }
  );
};

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Please provide username and password" });
    }

    const cleanUsername = username.trim().toLowerCase();

    // Check if any admin exists. If not, auto-seed default admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultUser = (process.env.ADMIN_USERNAME || "admin").toLowerCase();
      const defaultPass = process.env.ADMIN_PASSWORD || "admin123";

      if (cleanUsername === defaultUser && password === defaultPass) {
        const newAdmin = await Admin.create({
          username: defaultUser,
          password: defaultPass,
        });
        const token = generateToken(newAdmin._id, newAdmin.username);
        return res.json({
          success: true,
          token,
          user: { username: newAdmin.username },
          message: "Initial Admin created and logged in successfully",
        });
      }
    }

    const admin = await Admin.findOne({ username: cleanUsername });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    const token = generateToken(admin._id, admin.username);
    res.json({
      success: true,
      token,
      user: { username: admin.username },
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// @route   GET /api/auth/me
// @desc    Verify current admin token
// @access  Private (Admin)
router.get("/me", protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.admin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
