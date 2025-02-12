import { UserContextMenuCommandInteraction } from 'discord.js';
import { DiscordBot } from '@client/discord.bot';

export const event = {
  name: 'contextMenuInteractionCreate',
  once: false,
  execute: async (
    bot: DiscordBot,
    interaction: UserContextMenuCommandInteraction,
  ) => {
    bot.logger.info(`${interaction.commandName} command provided`);
    bot.currentUser = interaction.user;

    const command = bot.commands.get(interaction.commandName);
    bot.currentUsedCommand = command;

    const reply = async (content: string) => {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content, ephemeral: true });
      } else {
        await interaction.reply({ content, ephemeral: true });
      }
    };

    if (!command) {
      await reply('This command does not exist or is outdated.');
      return;
    }

    if (command.developer && !bot.isDeveloper(interaction.user.id)) {
      await reply('You do not have access to this command.');
      return;
    }

    try {
      await command.execute(bot, interaction);
    } catch (error) {
      console.error(error);
      await reply('There was an error while executing this command!');
    }
  },
};
