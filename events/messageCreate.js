const { Events, EmbedBuilder, ChannelType } = require('discord.js');
const { geminiResponse } = require('../scripts/geminiAPI');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        async function aiHandler() {
            const usrMsg = message.content;
            try {
                let response;
                await message.channel.sendTyping();
                const timestamp = Date.now();
                response = await geminiResponse(usrMsg);
                const duration = (Date.now() - timestamp) / 1000;
                const embed = new EmbedBuilder()
                    .setTitle(`CloudAI Response`)
                    .setDescription(response)
                    .setFooter({text: `Took ${(duration.toFixed(2))}s to generate - ${response.length} characters`});
                await message.reply({embeds:[embed]});
            } catch (error) {
                console.error(error);
                return message.reply(`I wasn't able to send my response. Check console for more info.`);
            };
        }
        if (message.author.bot) return;
        if (message.mentions.has(message.client.user) && !message.mentions.everyone){ await aiHandler(); };
        if (message.channel.type === ChannelType.DM)  { await aiHandler() };
    }
}