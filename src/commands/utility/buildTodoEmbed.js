exports.buildTodoEmbed = (taskList) => {
	const embedFields = prepareFields(taskList);
	const todoListEmbed = {
		color: 0xff4655,
		title: "Todo List",
		description: "List of all your task/s.",
		fields: embedFields,
	};

	return todoListEmbed;
};

const prepareFields = (taskList) => {
	let fieldList = [];
	taskList.map((task) => {
		const titleField = {
			name: "Title",
			value: task.title,
			inline: true,
		};

		const breakField = {
			name: "\u200b",
			value: "\u200b",
			inline: false,
		};

		fieldList.push(titleField, breakField);
	});

	return fieldList;
};
