const { OpenAI } = require('openai');
const { ai } = require('../config');

const chatgptAI = new OpenAI({apiKey: ai.chatgpt.apiKey});

async function chatgptResponse(prompt) {
    const response = await chatgptAI.responses.create({
        model: ai.chatgpt.model,
        instructions: "You are a discord AI bot. Do not exceed 4096 characters.",
        input: prompt
    }); return response.output_text;
}; module.exports = { chatgptResponse };

