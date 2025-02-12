import { AnySelectMenuInteraction } from 'discord.js';
import { DiscordBot } from '@client/discord.bot';

export const event = {
  name: 'interactionCreate',
  once: false,
  execute: async (bot: DiscordBot, interaction: AnySelectMenuInteraction) => {
    bot.logger.info(`Select menu ${interaction.customId} selected`);

    if (!interaction.isStringSelectMenu()) {
      return;
    }

    const action = bot.selectMenuActions.get(interaction.customId);
    if (!action) {
      const replyContent = 'Action not found.';
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: replyContent, ephemeral: true });
      } else {
        await interaction.reply({ content: replyContent, ephemeral: true });
      }
      return;
    }

    bot.currentUser = interaction.user;

    try {
      await action.execute(bot, interaction);
    } catch (error) {
      bot.logger.error('Error executing select menu action:', error);
      const replyContent = 'There was an error executing this action.';
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: replyContent, ephemeral: true });
      } else {
        await interaction.reply({ content: replyContent, ephemeral: true });
      }
    }
  },
};
