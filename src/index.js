const { Client, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Logged in as $${readyClient.user.tag}`);
	readyClient.user.setPresence({
		activities: [{ name: "💻 with discord.js" }],
		status: "dnd",
	});
});

client.login(process.env.TOKEN);
