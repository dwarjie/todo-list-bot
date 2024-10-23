const { Events } = require("discord.js");
const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		if (!process.env.MONGO_URI) return console.log(`No Database URL provided`);

		mongoose
			.connect(process.env.MONGO_URI)
			.then(() => {
				console.log(`Database connection established...`);
			})
			.catch((err) => {
				console.log(`Could not connect to database: ${err}`);
				return;
			});

		client.user.setPresence({
			activities: [{ name: "💻 with discord.js" }],
			status: "dnd",
		});

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
