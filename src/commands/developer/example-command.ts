import {
  ChatInputCommandInteraction,
  Colors,
  MessageFlags,
  ButtonStyle,
  ActionRowBuilder,
} from 'discord.js';
import { DiscordBot } from '@client/discord.bot';
import { EmbedBuilder } from '@/builders/embed.builder';
import { ButtonBuilder } from '@/builders/button.builder';
import { StringSelectMenuBuilder } from '@/builders/select-menu.builder';

export const command: ICommandFile = {
  name: 'select command',
  description: 'Select Command example',
  developer: false,
  flags: MessageFlags.Ephemeral,
  execute: async function (
    bot: DiscordBot,
    interaction: ChatInputCommandInteraction,
    args: IInteractionArg[],
  ): Promise<void> {
    const items = [
      { name: 'Item 1', value: 'Description 1', inline: true },
      { name: 'Item 2', value: 'Description 2', inline: true },
      { name: 'Item 3', value: 'Description 3', inline: true },
      { name: 'Item 4', value: 'Description 4', inline: true },
      { name: 'Item 5', value: 'Description 5', inline: true },
      { name: 'Item 6', value: 'Description 6', inline: true },
    ];
    const embed = new EmbedBuilder(Colors.Orange)
      .setTitle("Titre de l'embed")
      .setPagination({
        items,
        itemsPerPage: 2,
      });

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel('Previous')
        .setStyle(ButtonStyle.Primary)
        .setAction('previous', async (bot, interaction) => {
          embed.previousPage();
          await interaction.update({ embeds: [embed] });
        }),
      new ButtonBuilder()
        .setLabel('Next')
        .setStyle(ButtonStyle.Primary)
        .setAction('next', async (bot, interaction) => {
          embed.nextPage();
          await interaction.update({ embeds: [embed] });
        }),
    );

    const row2 = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('select-menu')
        .setOptions([
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ])
        .setAction('select-menu', async (bot, interaction) => {
          await interaction.reply({
            content: `You selected ${interaction.values[0]}`,
            flags: command.flags,
          });
        }),
    );

    await interaction.reply({
      embeds: [embed],
      components: [row, row2],
      flags: command.flags,
    });
  },
};
