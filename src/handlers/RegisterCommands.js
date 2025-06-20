const { Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { bot } = require('../config');

function getFilesInDirectory(directory) {
    let fileNames = [];

    const files = fs.readdirSync(directory, {withFileTypes: true});

    for (const file of files) {
        const filePath = path.join(directory, file.name);
        if (file.isFile()) {
            fileNames.push(filePath);
        }
    }

    return fileNames;
}

module.exports = async (client) => {

    let commands = [];
    client.commands = new Collection();

    const commandFiles = getFilesInDirectory(path.join(__dirname, '../commands'));

    for (const file of commandFiles) {
        const command = require(file);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        } else {
            console.warn(`[⚠️] | The command at ${file} is missing data/execute. Skipping`);
            continue;
        }

        const rest = new REST({ version: '10' }).setToken(client.token);
        (async () => {
            try {
                console.log(`[🔄] | Refreshing ${commands.length} Application [/] commands...`);
                await rest.put(Routes.applicationCommands(bot.clientId), {body: commands});
                
                console.log(`[✅] | Successfully refreshed!`);
            } catch (e) {
                console.error(`[❌] | Error occured. ${e.message}`);
            }
        })();
    }
}

