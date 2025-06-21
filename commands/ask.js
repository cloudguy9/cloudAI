const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { GoogleGenAI } = require('@google/genai');
const { OpenAI } = require('openai');
const { bot, gemini, chatgpt } = require('../config.json');

const geminiAI = new GoogleGenAI({ apiKey: gemini.apiKey });
const chatgptAI = new OpenAI({apiKey: chatgpt.apiKey});

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
        let response; let airespond; let timestamp;
        async function geminiResponse() {
            timestamp = Date.now();
            response = await geminiAI.models.generateContent({
                model: "gemini-2.5-flash",
                contents: interaction.options.getString('message'),
                config: { systemInstruction: "You are a discord AI bot. Do not exceed 4096 characters." },
            }); airespond = response.text;
        };
        async function chatgptResponse() {
            timestamp = Date.now();
            response = await chatgptAI.responses.create({
                model: "o4-mini",
                instructions: "You are a discord AI bot. Do not exceed 4096 characters.",
                input: interaction.options.getString('message')
            }); airespond = response.output_text;
        }; await interaction.deferReply();
        
        try {
            if(bot.provider == "gemini") { await geminiResponse() }
            else if (bot.provider == "chatgpt") { await chatgptResponse() }
            else {console.error("AI Provider were set incorrectly in configuration. Choose either 'chatgpt' or 'gemini'.")};
            
            const embed = new EmbedBuilder()
                .setTitle(`CloudAI Response`)
                .setDescription(airespond)
                .setFooter({text: `Took ${((timestamp-Date.now()) / 1000).toFixed(2)}s to generate - ${airespond.length} characters`})
            await interaction.editReply({embeds:[embed]});
        } catch (error) {
            console.error(error.message);
            return interaction.editReply(`I wasn't able to send my response. Check console for more info.`);
        };
    },
};
