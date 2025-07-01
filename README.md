# cloudai
<p>Open source Discord AI Bot powered by Gemini, ChatGPT, and Ollama</p>

<!-- https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts -->
> [!NOTE]
> We haven't tested ChatGPT because we do not have the API Key to test it out.
> Report through Issues if you find any problem
>
> We rely CloudAI on Gemini currently. [Invite CloudAI!](https://discord.com/oauth2/authorize?client_id=1302648298917593120)

# Features
- **Use it anywhere!** - CloudAI works in Servers / DMs / Groups!
- **Image Generation** - Generates images based on user prompts with Gemini!
- **Reply CloudAI through Pings / DMs** - Ping/Reply CloudAI to interact! Also works by DM-ing the bot. (ClydeAI Reference)

# Getting Started
### Prerequisites
- Node.JS (LTS Recommended)
- Discord Bot, Token, and Client ID: ([Create your bot in Discord Developer Portal](https://discord.com/developers/applications))
- Gemini API Key: ([Create your API Key in Google AI Studio](https://aistudio.google.com/app/apikey))
- (Optional) ChatGPT API Key: ([Create your API Key in OpenAI Platform](https://platform.openai.com/api-keys))
- (Optional) oLlama Server: ([Download ollama right here!](https://ollama.com/))

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
   - Select your desire provider in the config: `ai.provider`. (Choose 'gemini', 'chatgpt', 'ollama')
   - And now, place your API key into your desired provider. (ollama = local)
4. Start the bot:
   You can use `node .` or `npm start`.

# Commands
- `/ask [prompt]`: Start your conversation w/ AI
- `/prompt [prompt]`: Generates an Image based on prompt (Currently this is only available for Gemini)

# Screenshot (07/01/2025 Update)
![image](https://github.com/user-attachments/assets/22cd6e12-f9a3-4702-a18c-3dbd2af78ed8)
![image](https://github.com/user-attachments/assets/d3c70bb4-7da9-4368-baf6-0c7d942b2cc3)
![image](https://github.com/user-attachments/assets/2dbb5794-6221-48ef-add6-f6d9790ad017)
![image](https://github.com/user-attachments/assets/47043c5d-ab9f-4326-bec7-e603f86b27a0)

# Contribution
- We welcome contributions! Feel free to fork the repository, create new branch (cloudai/my-feature) or switch to dev branch,
- make your changes, and submit a pull request to dev branch.

