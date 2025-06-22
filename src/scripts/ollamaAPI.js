const { Ollama } = require('ollama');
const { ai } = require('../config');

const ollama = new Ollama({ host: ai.local.ollama_address });

async function ollamaResponse(prompt) { 
    response = await ollama.chat({
        model: ai.local.model,
        messages: [{ role: 'user', content: prompt }],
    }); return response.message.content;
}; module.exports = { ollamaResponse }

