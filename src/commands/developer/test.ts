import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  MessageFlags,
} from 'discord.js';
import { OptionBuilder } from '@/builders/option.builder';
import { DiscordBot } from '@client/discord.bot';

export const command: ICommandFile = {
  name: 'test command',
  description: 'Test Command',
  options: [
    new OptionBuilder()
      .setName('arg1')
      .setDescription('Arg1')
      .setRequired(true)
      .setType(ApplicationCommandOptionType.String)
      .addChoice({
        name: 'choice 1',
        value: '1',
      })
      .addChoice({
        name: 'choice 2',
        value: '2',
      })
      .build(),
    new OptionBuilder()
      .setName('arg2')
      .setDescription('Arg 2')
      .setRequired(false)
      .setType(ApplicationCommandOptionType.Attachment)
      .build(),
  ],
  developer: true,
  flags: MessageFlags.Ephemeral,
  execute: async function (
    bot: DiscordBot,
    interaction: ChatInputCommandInteraction,
    args: IInteractionArg[],
  ): Promise<void> {
    await interaction.reply({ content: 'Test!', flags: command.flags });
    return;
  },
};
