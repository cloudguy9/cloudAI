const { Client, Collection, REST, GatewayIntentBits, Events, Routes, MessageFlags } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { bot } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const commands = [];
client.commands = new Collection();

const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
	const cmd = require(`./commands/${file}`);
	if ('data' in cmd && 'execute' in cmd) {
        client.commands.set(cmd.data.name, cmd)
		commands.push(cmd.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// It's a mess.
const rest = new REST().setToken(bot.token);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put( Routes.applicationCommands(bot.clientId), { body: commands });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) { console.error(error)}
})();

client.once(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}`)
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	
    if (!command) return;

	try { await command.execute(interaction) } 
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

client.login(bot.token);