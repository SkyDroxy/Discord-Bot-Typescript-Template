import { ButtonInteraction } from 'discord.js';
import { DiscordBot } from '@client/discord.bot';

export const event = {
  name: 'buttonInteractionCreate',
  once: false,
  execute: async (bot: DiscordBot, interaction: ButtonInteraction) => {
    bot.logger.info(`Button ${interaction.customId} clicked`);

    const action = bot.buttonActions.get(interaction.customId);
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
      bot.logger.error('Error executing button action:', error);
      const replyContent = 'There was an error executing this action.';
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: replyContent, ephemeral: true });
      } else {
        await interaction.reply({ content: replyContent, ephemeral: true });
      }
    }
  },
};
