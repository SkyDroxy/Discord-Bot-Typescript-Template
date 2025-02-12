import { ClientOptions, GatewayIntentBits } from 'discord.js';
import { DiscordBot } from '@client/discord.bot';

// Initialisation du bot
const botOptions: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
};

const bot = DiscordBot.getInstance(botOptions);
bot.start();
