const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	user_id: String,
	task: [
		{
			title: String,
			createdAt: { type: Date, default: Date.now },
			dueDate: Date,
			reminderTime: Date,
			isCompleted: Boolean,
		},
	],
});

module.exports = new mongoose.model("tbl_todo", todoSchema);
