const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, Attachment } = require('discord.js');
const { geminiGenerateImage } = require('../scripts/geminiAPI')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imagine')
        .setDescription('Generate an image based on your prompt')
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option.setName('prompt')
            .setDescription('Generate image based of your prompt')
            .setRequired(true),
        ),
    async execute(interaction) {
        const usrMsg = interaction.options.getString('prompt');
        await interaction.deferReply();
        try {
            const timestamp = Date.now();
            const response = await geminiGenerateImage(usrMsg);

            if (!response || !Buffer.isBuffer(response)) {
                throw new Error('Invalid or missing buffer from geminiGenerateImage()');
            }
            
            const file = new AttachmentBuilder(response, {name: 'image.png'});
            duration = (Date.now() - timestamp) / 1000;

            const embed = new EmbedBuilder()
                .setTitle('CloudAI Generated Image')
                .setImage('attachment://image.png')
                .setFooter({text: `Took ${duration}s to generate!`});
            await interaction.editReply({embeds: [embed], files: [file] });
        } catch (error) {
            console.error(error);
            return interaction.editReply(`I wasn't able to generate your image. Check console for more info.`)
        };
    },
};
