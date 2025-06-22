const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { geminiResponse } = require('../scripts/geminiAPI');
const { chatgptResponse } = require('../scripts/chatgptAPI');
const { ollamaResponse } = require('../scripts/ollamaAPI')

const { ai } = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask AI about something')
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option.setName('message')
            .setDescription('Your message sent to AI')
            .setRequired(true),
        ),
    async execute(interaction) {
        let timestamp; let response; let duration;
        const usrMsg = interaction.options.getString('message');
        
        await interaction.deferReply();
        try {
            timestamp = Date.now();

            if(ai.provider == "gemini") { 
                response = await geminiResponse(usrMsg);
            } else if (ai.provider == "chatgpt") { 
                response = await chatgptResponse(usrMsg); 
            } else if (ai.provider == "ollama") { 
                response = await ollamaResponse(usrMsg); 
            } else {
                console.error("AI Provider were set incorrectly in configuration. Choose either 'chatgpt', 'gemini', or 'ollama'.")
            }; duration = (Date.now() - timestamp) / 1000;

            const embed = new EmbedBuilder()
                .setTitle(`CloudAI Response`)
                .setDescription(response)
                .setFooter({text: `Took ${(duration.toFixed(2))}s to generate - ${response.length} characters`})
            await interaction.editReply({embeds:[embed]});
        } catch (error) {
            console.error(error.message);
            return interaction.editReply(`I wasn't able to send my response. Check console for more info.`);
        };
    },
};

