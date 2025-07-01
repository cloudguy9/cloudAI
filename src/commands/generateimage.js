const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generateimage')
        .setDescription('Generate an image using AI')
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option.setName('prompt')
            .setDescription('What the AI should generate')
            .setRequired(true),
        ),
    async execute(interaction) {
        interaction.reply('This command is deprecated. Use /imagine instead.')
    },
};
