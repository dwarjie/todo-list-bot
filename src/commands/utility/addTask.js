const { SlashCommandBuilder } = require("discord.js");
const TodoSchema = require("../../schema/todoList.schema");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("addtask")
		.setDescription("Add a task to your to-do list.")
		.addStringOption((option) =>
			option
				.setName("task")
				.setDescription("Set your task name")
				.setRequired(true)
		),
	async execute(interaction) {
		const todoName = interaction.options.getString("task");

		try {
			let userCollection = await TodoSchema.findOne({
				user_id: interaction.user.id,
			});

			if (userCollection) {
				userCollection.task.push({
					title: todoName,
					createdAt: Date.now(),
				});

				await userCollection.save();
			} else {
				await TodoSchema.create({
					user_id: interaction.user.id,
					task: [
						{
							title: todoName,
							createdAt: Date.now(),
						},
					],
				});
			}

			await interaction.reply({
				content: `Task ${todoName} added to your 📋.`,
				ephemeral: true,
			});
		} catch (err) {
			console.log(`Error creating task: ${err}`);
			await interaction.reply({
				content: `There seems to be a problem. Please try again later.`,
				ephemeral: true,
			});
		}
	},
};
