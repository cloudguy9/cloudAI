# cloudai
<p>Open source Discord AI Bot powered by Gemini</p>

# Features
- **Use it anywhere!** - CloudAI works in Servers / DMs / Groups!
- **Image Generation** - Generates images based on user prompts
- **Reply CloudAI through Pings / DMs** - Ping/Reply CloudAI to interact! Also works by DM-ing the bot. (ClydeAI Reference)

# Getting Started
### Prerequisites
- Node.JS (LTS Recommended)
- Discord Bot, Token, and Client ID: ([Create your bot in Discord Developer Portal](https://discord.com/developers/applications))
- Gemini API Key: ([Create your API Key in Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation
1. Clone the repository
   ```sh
    git clone https://github.com/cloudguy9/cloudAI
    cd cloudAI
    ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the bot
   - Copy `config.example.json` and paste as `config.json`.
   - Inside config.json, place your discord bot token in: bot.token, and then place your bot's clientID in: bot.clientId
   - Fill out your GeminiAI API Key in `ai.apikey` - and choose your desired gemini model
4. Start the bot:
   You can use `node .` or `npm start`.

# Commands
- `/ask [prompt]`: Start your conversation w/ AI
- `/imagine [prompt]`: Generates an Image based on prompt (Currently this is only available for Gemini)

# License
Licenced by **MIT License**