import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { DiscordBot } from '@client/discord.bot';

export const event = {
  name: 'chatInputInteractionCreate',
  once: false,
  execute: async (
    bot: DiscordBot,
    interaction: ChatInputCommandInteraction,
  ) => {
    bot.logger.info(`${interaction.commandName} command provided`);

    bot.currentUser = interaction.user;

    const commandName = interaction.commandName;
    const subCommandGroupName = interaction.options.getSubcommandGroup(false);
    const subCommand = interaction.options.getSubcommand(false);

    let commandFullName = commandName;
    if (subCommandGroupName && subCommand) {
      commandFullName += ` ${subCommandGroupName} ${subCommand}`;
    } else if (subCommand) {
      commandFullName += ` ${subCommand}`;
    }

    const command = bot.commands.get(commandFullName);
    bot.currentUsedCommand = command;

    const args = command?.options
      ? command.options.map(
          (option) => interaction.options.get(option.name) as IInteractionArg,
        )
      : [];

    if (!command) {
      const replyContent = 'This command does not exist or is outdated.';
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: replyContent, ephemeral: true });
      } else {
        await interaction.reply({ content: replyContent, ephemeral: true });
      }
      return;
    }

    if (command.developer && !bot.isDeveloper(interaction.user.id)) {
      const replyContent = 'You do not have access to this command.';
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: replyContent, ephemeral: true });
      } else {
        await interaction.reply({ content: replyContent, ephemeral: true });
      }
      return;
    }

    try {
      await command.execute(bot, interaction, args);
    } catch (error) {
      console.error(error);
      const replyContent = 'There was an error while executing this command!';
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: replyContent,
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: replyContent,
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
