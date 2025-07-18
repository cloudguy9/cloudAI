const { GoogleGenAI, Modality } = require('@google/genai');
const { ai } = require('../config');

const gemini = new GoogleGenAI({ apiKey: ai.gemini.apiKey });

async function geminiResponse(prompt) {
    const response = await gemini.models.generateContent({
        model: ai.gemini.model,
        contents: prompt,
        config: { systemInstruction: "You are a discord AI bot. Do not exceed 4096 characters." },
    }); return response.text;
};

async function geminiGenerateImage(prompt) {
    const response = await gemini.models.generateContent({
        model: ai.gemini.ig_model,
        contents: prompt,
        config : { responseModalities: [Modality.TEXT, Modality.IMAGE] }
    })
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64")
            return buffer;
        }
    }
};
module.exports = { geminiResponse, geminiGenerateImage };

