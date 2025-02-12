import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  MessageFlags,
} from 'discord.js';
import { OptionBuilder } from '@/builders/option.builder';
import { DiscordBot } from '@client/discord.bot';

export const command: ICommandFile = {
  name: 'test modal',
  description: 'Test Modal',
  options: [],
  developer: true,
  flags: MessageFlags.Ephemeral,
  execute: async function (
    bot: DiscordBot,
    interaction: ChatInputCommandInteraction,
    args: IInteractionArg[],
  ): Promise<void> {
    await interaction.showModal(bot.modals.get('modalTemplate').builder);
    return;
  },
};
