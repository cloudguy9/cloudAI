const { GoogleGenAI } = require('@google/genai');
const { ai } = require('../config');

const gemini = new GoogleGenAI({ apiKey: ai.gemini.apiKey });

async function geminiResponse(prompt) {
    const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { systemInstruction: "You are a discord AI bot. Do not exceed 4096 characters."},
    }); return response.text;
};

module.exports = { geminiResponse };

