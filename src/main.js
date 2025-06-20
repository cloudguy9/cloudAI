const { Client, Collection, REST, GatewayIntentBits, Events, Routes, MessageFlags } = require('discord.js');
const path = require('path');



const deployCommands = require('./events/deployCommands');
const RegisterCommands = require('./handlers/RegisterCommands');
const { bot } = require('./config');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


// not  a mess anymore.

client.once(Events.ClientReady, readyClient => { 
	RegisterCommands(client);
    console.log(`Logged in as ${readyClient.user.tag}`)
});

client.on(Events.InteractionCreate, async interaction => {
	deployCommands(interaction);
});

client.login(bot.token);