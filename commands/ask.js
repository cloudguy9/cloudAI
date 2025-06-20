const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { GoogleGenAI } = require('@google/genai');
const { OpenAI } = require('openai');
const { bot, gemini, openai } = require('../config.json');

const gemini-ai = new GoogleGenAI({ apiKey: gemini.apiKey });
const openai-ai = new OpenAI({apiKey: openai.apiKey});

async function geminiResponse() {
        const ts1 = Date.now();
        const response = await gemini=ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: interaction.options.getString('message'),
        config: { systemInstruction: "You are a discord AI bot. Do not exceed 4096 characters." },
	});

async function openaiResponse() {
	const ts1 = Date.now();
	const response = await openai-ai.chat.completions.create({
	model: "gpt-3.5-turbo",
	contents: interaction.options.getString('message'),
	config: [{ role: 'system', content: 'You are a discord AI bot. Do not exceed 4096 characters.', role: 'user', content: contents }],
	});

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
            if bot.provider = "gemini" then
		geminiResponse();
	    else if bot.provider = "openai" then 
		openaiResponse();
	    else 
		console.error("Your AI provider in config.json is specified incorrectly, Choose either 'openai' or 'gemini'");
            const embed = new EmbedBuilder()
                .setTitle(`CloudAI Response`)
                .setDescription(response.text)
                .setFooter({text: `Took ${((ts1-Date.now()) / 1000).toFixed(2)}s to generate - ${response.text.length} characters - Model used = ${response.model}`})
            await interaction.editReply({embeds:[embed]});
        } catch (error) {
            console.error(error.message);
            return interaction.editReply(`I wasn't able to send my response. Check console for more info.`);
        }
		
	},
};
