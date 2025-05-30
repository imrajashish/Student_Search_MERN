// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
app.use(express.json());

// Cache student data in memory
let studentData = [];
let lastDataLoad = null;

async function loadStudentData() {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "student_data.json"),
      "utf-8"
    );
    studentData = JSON.parse(data);
    lastDataLoad = new Date();
    console.log(`Loaded ${studentData.length} student records`);
  } catch (err) {
    console.error("Error loading student data:", err);
    process.exit(1);
  }
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    lastDataLoad,
    recordCount: studentData.length,
  });
});

// Search endpoint with error handling
app.get("/api/students/search", async (req, res) => {
  try {
    const { query, limit=5 } = req.query;
    if (!query || query.length < 3) {
      return res.status(200).json([]);
    }

    const searchTerm = query.toLowerCase();
    const results = studentData
      .filter((student) => student.name.toLowerCase().includes(searchTerm))
      .slice(0, parseInt(limit));

    res.status(200).json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server with proper error handling
loadStudentData()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});
