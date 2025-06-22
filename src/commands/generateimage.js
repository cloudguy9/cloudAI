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
        let response; let timestamp; let duration;
        const usrMsg = interaction.options.getString('prompt');
        
        await interaction.deferReply();
        try {
            timestamp = Date.now();
            response = await geminiGenerateImage(usrMsg);
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
