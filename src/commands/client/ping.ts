import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { DiscordBot } from '@client/discord.bot';

export const command: ICommandFile = {
  name: 'ping',
  description: 'Envoie Pong!',
  developer: false,
  flags: MessageFlags.Ephemeral,
  execute: async function (
    bot: DiscordBot,
    interaction: ChatInputCommandInteraction,
    args: IInteractionArg[],
  ): Promise<void> {
    await interaction.reply({ content: 'Pong!', flags: command.flags });
    return;
  },
};
