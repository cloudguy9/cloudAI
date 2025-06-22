const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const { geminiGenerateImage } = require('../scripts/geminiAPI')

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
        let response;
        const usrMsg = interaction.options.getString('prompt');
        
        await interaction.deferReply();
        try {
            response = geminiGenerateImage(usrMsg);

            const buffer = Buffer.from(imageData, "base64");
            const file = new AttachmentBuilder(buffer, "image.png");

            const embed = new EmbedBuilder()
                .setTitle('CloudAI Generated Image')
                .setImage('attachment://image.png');
            await interaction.editReply({embeds: [embed], files: [file] });
        } catch (error) {
            console.error(error.message);
            return interaction.editReply(`I wasn't able to generate your image. Check console for more info.`)
        };
    },
};
