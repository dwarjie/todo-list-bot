const { SlashCommandBuilder } = require("discord.js");
const TodoSchema = require("../../schema/todoList.schema");
const findUser = require("../../utils/findUser");
const taskChoices = require("../utility/fetchTaskChoices");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("removetask")
		.setDescription("Remove a task from your to-do list.")
		.addStringOption((option) =>
			option
				.setName("removetask")
				.setDescription("Select the task you want to remove.")
				.setRequired(true)
				.setAutocomplete(true)
		),
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		try {
			const choices = await taskChoices(TodoSchema, interaction.user.id);
			const filteredChoices = choices.filter((task) =>
				task.title.toLowerCase().startsWith(focusedValue.toLowerCase())
			);

			const result = filteredChoices.map((choice) => ({
				name: choice.title,
				value: choice._id,
			}));

			await interaction.respond(result.slice(0, 25)).catch(() => {});
		} catch (err) {
			console.log(`Error responding to autocomplete: ${err}`);
			await interaction.reply({
				content: `There seems to be a problem. Please try again later.`,
				ephemeral: true,
			});
		}
	},
	async execute(interaction) {
		const taskId = interaction.options.getString("removetask");
		try {
			const userCollection = await findUser(TodoSchema, interaction.user.id);
			const taskSelected = await userCollection.task.id(taskId);

			if (!userCollection || taskSelected === null) {
				await interaction.reply({
					content: `Task does not exist.`,
					ephemeral: true,
				});
				return;
			}

			await userCollection.task.pull(taskId);
			await userCollection.save();

			await interaction.reply({
				content: `Task ${taskSelected.title} removed from your 📋.`,
				ephemeral: true,
			});
		} catch (err) {
			console.log(`Error removing task: ${err}`);
			await interaction.reply({
				content: `There seems to be a problem. Please try again later.`,
				ephemeral: true,
			});
		}
	},
};
