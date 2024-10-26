module.exports = async (interaction) => {
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.autocomplete(interaction);
	} catch (err) {
		console.error(err);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: `There was an error while processing the autocomplete!`,
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: `There was an error while processing the autocomplete!`,
				ephemeral: true,
			});
		}
	}
};
