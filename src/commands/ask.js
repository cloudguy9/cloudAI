const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { GoogleGenAI } = require('@google/genai');
const { gemini } = require('../config');

const ai = new GoogleGenAI({ apiKey:  gemini.apiKey});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask AI about something')
        .setContexts([0, 1, 2]) // Allows the command to be executed in Guilds / DMs / DM Groups
        .addStringOption(option =>
            option.setName('message')
            .setDescription('Your message sent to AI')
            .setRequired(true),        
        ),
	async execute(interaction) {
        await interaction.deferReply();
        try {
            const ts1 = Date.now();
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: interaction.options.getString('message'),
                config: { systemInstruction: "You are a discord AI bot. Do not exceed 4096 characters." },
            });
            const embed = new EmbedBuilder()
                .setTitle(`CloudAI Response`)
                .setDescription(response.text)
                .setFooter({text: `Took ${((ts1-Date.now()) / 1000).toFixed(2)}s to generate - ${response.text.length} characters`})
            await interaction.editReply({embeds:[embed]});
        } catch (error) {
            console.error(error.message);
            return interaction.editReply(`I wasn't able to send my response. Check console for more info.`);
        }
		
	},
};