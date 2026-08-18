import express from "express";
import { Message } from "../models/Message.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (name, email, subject, message)",
      });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received successfully.",
      data: {
        id: newMessage._id,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error) {
    console.error("Error submitting contact message:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Internal server error while saving message" });
  }
});

// @route   GET /api/contact
// @desc    Get all messages (with search/filter options)
// @access  Private (Admin)
router.get("/", protect, async (req, res) => {
  try {
    const { search, isRead } = req.query;
    const query = {};

    if (isRead !== undefined) {
      query.isRead = isRead === "true";
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const messages = await Message.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Server error fetching messages" });
  }
});

// @route   GET /api/contact/stats
// @desc    Get dashboard metrics & stats
// @access  Private (Admin)
router.get("/stats", protect, async (req, res) => {
  try {
    const totalMessages = await Message.countDocuments();
    const unreadMessages = await Message.countDocuments({ isRead: false });
    
    // Messages in the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentMessages = await Message.countDocuments({ createdAt: { $gte: oneDayAgo } });

    res.json({
      success: true,
      data: {
        total: totalMessages,
        unread: unreadMessages,
        read: totalMessages - unreadMessages,
        last24Hours: recentMessages,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ success: false, message: "Server error fetching stats" });
  }
});

// @route   PATCH /api/contact/:id/read
// @desc    Toggle or mark message as read
// @access  Private (Admin)
router.patch("/:id/read", protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    const { isRead } = req.body;
    message.isRead = isRead !== undefined ? isRead : !message.isRead;
    await message.save();

    res.json({
      success: true,
      message: `Message marked as ${message.isRead ? "read" : "unread"}`,
      data: message,
    });
  } catch (error) {
    console.error("Error updating message status:", error);
    res.status(500).json({ success: false, message: "Server error updating message" });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete a message
// @access  Private (Admin)
router.delete("/:id", protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    await message.deleteOne();

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, message: "Server error deleting message" });
  }
});

export default router;
