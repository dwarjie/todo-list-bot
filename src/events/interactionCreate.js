const { Events } = require("discord.js");
const chatInputCommand = require("./utility/chatInputCommand");
const autoCompleteCommand = require("./utility/autoCompleteCommand");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			chatInputCommand(interaction);
		} else if (interaction.isAutocomplete()) {
			autoCompleteCommand(interaction);
		}
	},
};
