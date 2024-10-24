exports.buildTodoEmbed = (taskList) => {
	const embedFields = prepareFields(taskList);
	console.log(embedFields);
	const todoListEmbed = {
		color: 0xff4655,
		title: "Todo List",
		description: "List of all your task/s.",
		fields: embedFields,
	};

	return todoListEmbed;
};

const prepareFields = (taskList) => {
	console.log(taskList);
	let fieldList = [];
	taskList.map((task) => {
		const titleField = {
			name: "Title",
			value: task.title,
			inline: true,
		};

		const dueField = {
			name: "Due",
			value: task.dueDate ? task.dueDate : "\u200b",
			inline: true,
		};

		const completedField = {
			name: "Completed",
			value: task.isCompleted ? "✅" : "❌",
			inline: true,
		};

		const breakField = {
			name: "\u200b",
			value: "\u200b",
			inline: false,
		};

		fieldList.push(titleField, dueField, completedField, breakField);
	});

	return fieldList;
};
