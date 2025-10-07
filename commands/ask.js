const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { geminiResponse } = require('../scripts/geminiAPI');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask CloudAI about something!')
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option.setName('prompt')
            .setDescription('Your prompt sent to AI')
            .setRequired(true),
        ),
    async execute(interaction) {
        const usrMsg = interaction.options.getString('prompt');
        await interaction.deferReply();
        try {
            let response;
            const timestamp = Date.now();
            response = await geminiResponse(usrMsg);

            const duration = (Date.now() - timestamp) / 1000;
            const embed = new EmbedBuilder()
                .setTitle(`CloudAI Response`)
                .setDescription(response)
                .setFooter({text: `Took ${(duration.toFixed(2))}s to generate - ${response.length} characters`});
            await interaction.editReply({embeds:[embed]});
        } catch (error) {
            console.error(error);
            return interaction.editReply(`I wasn't able to send my response. Check console for more info.`);
        };
    },
};

