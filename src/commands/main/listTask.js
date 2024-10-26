const { SlashCommandBuilder } = require("discord.js");
const TodoSchema = require("../../schema/todoList.schema");
const findUser = require("../../utils/findUser");
const { buildTodoEmbed } = require("../utility/buildTodoEmbed");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("listtask")
		.setDescription("List all your saved task/s."),
	async execute(interaction) {
		try {
			let userCollection = await findUser(TodoSchema, interaction.user.id);

			if (!userCollection) {
				await interaction.reply({
					content: `You do not currently have a task in your to-do list.`,
					ephemeral: true,
				});
				return;
			}

			const embed = buildTodoEmbed(userCollection.task);
			await interaction.reply({ embeds: [embed], ephemeral: true });
		} catch (err) {
			console.log(`Error fetching list of task: ${err}`);
			await interaction.reply({
				content: `There seems to be a problem. Please try again later.`,
				ephemeral: true,
			});
		}
	},
};
