const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: String,
	createdAt: { type: Date, default: Date.now },
	dueDate: Date,
	reminderTime: Date,
	isCompleted: Boolean,
});

const todoSchema = new mongoose.Schema({
	user_id: String,
	task: [taskSchema],
});

module.exports = new mongoose.model("tbl_todo", todoSchema);
