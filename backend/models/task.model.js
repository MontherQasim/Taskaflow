const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, default: false },
  status: { type: String, default: 'Not Started' }, // Status field for task status
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
