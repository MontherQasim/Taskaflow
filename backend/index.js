require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');
const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const Task = require("./models/task.model");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// Mongoose connection
mongoose.connect(config.connectionString);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully.");
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB:", err.message);
});

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  const isUser = await User.findOne({ email });

  if (isUser) {
    return res.json({ error: true, message: "User already exists" });
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

    return res.json({ error: false, user, accessToken, message: "Registration Successful" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  const userInfo = await User.findOne({ email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  const validPassword = await bcryptjs.compare(password, userInfo.password);

  if (!validPassword) {
    return res.status(400).json({ error: true, message: "Invalid Credentials" });
  }

  const accessToken = jwt.sign({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

  return res.json({ error: false, message: "Login Successful", email, accessToken });
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({ user: isUser, message: "" });
});

app.post("/add-task", authenticateToken, async (req, res) => {
  const { title, content, tags, status } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res.status(400).json({ error: true, message: "Content is required" });
  }

  try {
    const task = new Task({
      title,
      content,
      tags: tags || [],
      status: status || "pending",  // Default to "pending" if status is not provided
      userId: user._id,
    });

    await task.save();

    return res.json({
      error: false,
      task,
      message: "Task added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.put("/update-task-pinned/:id", authenticateToken, async (req, res) => {
  const taskId = req.params.id;
  const { isPinned } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    task.isPinned = isPinned;
    await task.save();

    res.json({ error: false, task, message: "Task pinned status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Edit Task
app.put("/edit-task/:taskId", authenticateToken, async (req, res) => {
  const taskId = req.params.taskId;
  const { title, content, tags, isPinned, status } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags && !status && isPinned === undefined) {
    return res.status(400).json({ error: true, message: "No changes provided" });
  }

  try {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    if (title) task.title = title;
    if (content) task.content = content;
    if (tags) task.tags = tags;
    if (status) task.status = status;
    if (isPinned !== undefined) task.isPinned = isPinned;

    await task.save();

    return res.json({ error: false, task, message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Update isPinned
app.put("/update-task-pinned/:taskId", authenticateToken, async (req, res) => {
  const taskId = req.params.taskId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    task.isPinned = isPinned;

    await task.save();

    return res.json({ error: false, task, message: "Task pinned status updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Get all Tasks
app.get("/get-all-tasks", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const tasks = await Task.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.json({ error: false, tasks, message: "All tasks retrieved successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Delete Task
app.delete("/delete-task/:taskId", authenticateToken, async (req, res) => {
  const taskId = req.params.taskId;
  const { user } = req.user;

  try {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      return res.status(404).json({ error: true, message: "Task not found" });
    }

    await Task.deleteOne({ _id: taskId, userId: user._id });

    return res.json({ error: false, message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Search Tasks
app.get("/search-tasks", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: true, message: "Search query is required" });
  }

  try {
    const matchingTasks = await Task.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.json({ error: false, tasks: matchingTasks, message: "Tasks matching the search query retrieved successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Clear Search and Fetch Tasks with Status "Pending"
app.get("/fetch-tasks-by-status", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const status = req.query.status;

  if (!status) {
    return res.status(400).json({ error: true, message: "Status is required" });
  }

  try {
    const tasks = await Task.find({
      userId: user._id,
      status: status,
    });

    return res.json({ error: false, tasks: tasks, message: "Tasks retrieved successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
