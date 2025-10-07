const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');

const { bot } = require('./config');
const { deplCmd } = require('./scripts/deployCmd');

const client = new Client({
    intents: [
		GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
	partials: [
		Partials.Channel,
		Partials.Message
	]
});
client.commands = new Collection();

const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
	const cmd = require(`./commands/${file}`);
	if ('data' in cmd && 'execute' in cmd) {
		client.commands.set(cmd.data.name, cmd)
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

deplCmd();
client.login(bot.token);

