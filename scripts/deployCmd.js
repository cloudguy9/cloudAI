const { REST, Routes } = require('discord.js');
const { bot } = require('../config');
const fs = require('node:fs');

const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
async function loadCmd() {
    const commands = [];
    for (const file of cmdFiles) {
        const cmd = require(`../commands/${file}`);
        if ('data' in cmd && 'execute' in cmd) {
            commands.push(cmd.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    } return commands;
} 

const rest = new REST().setToken(bot.token);

async function deplCmd() {
    try {
        const commands = await loadCmd();
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put( Routes.applicationCommands(bot.clientId), { body: commands });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) { console.error(error)}
}; module.exports = { deplCmd };
