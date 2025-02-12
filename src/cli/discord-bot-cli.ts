#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
const program = new Command();

program
  .name('discord-bot-cli')
  .description('CLI to create commands and other stuffs for the discord bot')
  .version('1.0.0');

// Command to generate a new command
program
  .command('new command')
  .description('Generate a new command')
  .action(async () => {
    const commandsDir = path.resolve(__dirname, '../../src/commands');
    const getFolders = (dir: string): string[] => {
      return fs
        .readdirSync(dir)
        .filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
    };

    const folders = getFolders(commandsDir);

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'folder',
        message: 'Choose the folder for the new command:',
        choices: [...folders, 'Create new folder'],
      },
      {
        type: 'input',
        name: 'newFolder',
        message: 'Enter the name of the new folder:',
        when: (answers) => answers.folder === 'Create new folder',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter the command name:',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter the command description:',
      },
      {
        type: 'confirm',
        name: 'developer',
        message: 'Is this a developer command?',
        default: false,
      },
      {
        type: 'checkbox',
        name: 'flags',
        message: 'Select the flags for the command:',
        choices: [
          { name: 'Crossposted', value: 'MessageFlags.Crossposted' },
          { name: 'IsCrosspost', value: 'MessageFlags.IsCrosspost' },
          { name: 'SuppressEmbeds', value: 'MessageFlags.SuppressEmbeds' },
          {
            name: 'SourceMessageDeleted',
            value: 'MessageFlags.SourceMessageDeleted',
          },
          { name: 'Urgent', value: 'MessageFlags.Urgent' },
          { name: 'HasThread', value: 'MessageFlags.HasThread' },
          { name: 'Ephemeral', value: 'MessageFlags.Ephemeral' },
          { name: 'Loading', value: 'MessageFlags.Loading' },
          {
            name: 'FailedToMentionSomeRolesInThread',
            value: 'MessageFlags.FailedToMentionSomeRolesInThread',
          },
          {
            name: 'ShouldShowLinkNotDiscordWarning',
            value: 'MessageFlags.ShouldShowLinkNotDiscordWarning',
          },
          {
            name: 'SuppressNotifications',
            value: 'MessageFlags.SuppressNotifications',
          },
          { name: 'IsVoiceMessage', value: 'MessageFlags.IsVoiceMessage' },
          { name: 'HasSnapshot', value: 'MessageFlags.HasSnapshot' },
        ],
      },
      {
        type: 'confirm',
        name: 'addOptions',
        message: 'Do you want to add options?',
        default: false,
      },
    ]);

    const options = [];
    while (answers.addOptions) {
      const option = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the option name:',
        },
        {
          type: 'input',
          name: 'description',
          message: 'Enter the option description:',
        },
        {
          type: 'confirm',
          name: 'required',
          message: 'Is this option required?',
          default: false,
        },
        {
          type: 'list',
          name: 'type',
          message: 'Choose the option type:',
          choices: [
            { name: 'String', value: 'String' },
            { name: 'Integer', value: 'Integer' },
            { name: 'Boolean', value: 'Boolean' },
            { name: 'User', value: 'User' },
            { name: 'Channel', value: 'Channel' },
            { name: 'Role', value: 'Role' },
            { name: 'Mentionable', value: 'Mentionable' },
            { name: 'Number', value: 'Number' },
            { name: 'Attachment', value: 'Attachment' },
          ],
        },
        {
          type: 'confirm',
          name: 'addChoice',
          message: 'Do you want to add choices?',
          default: false,
          when: (option) =>
            ['String', 'Integer', 'Number'].includes(option.type),
        },
      ]);

      const choices = [];
      while (option.addChoice) {
        const choice = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Enter the choice name:',
          },
          {
            type: 'input',
            name: 'value',
            message: 'Enter the choice value:',
          },
          {
            type: 'confirm',
            name: 'addChoice',
            message: 'Do you want to add another choice?',
            default: false,
          },
        ]);
        choices.push(choice);
        option.addChoice = choice.addChoice;
      }

      options.push({ ...option, choices });
      const { addOptions } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'addOptions',
          message: 'Do you want to add another option?',
          default: false,
        },
      ]);
      answers.addOptions = addOptions;
    }

    const folderPath = answers.newFolder
      ? path.join(commandsDir, answers.newFolder)
      : path.join(commandsDir, answers.folder);
    if (answers.newFolder && !fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const commandFileName = answers.name.replace(/ /g, '-').toLowerCase();
    const commandFilePath = path.join(folderPath, `${commandFileName}.ts`);
    const commandFileContent = `
import { ApplicationCommandOptionType, ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { OptionBuilder } from '@/builders/option.builder';
import { DiscordBot } from '@client/discord.bot';

export const command: ICommandFile = {
  name: '${answers.name}',
  description: '${answers.description}',
  options: [
    ${options
      .map(
        (opt) => `
    new OptionBuilder()
      .setName('${opt.name}')
      .setDescription('${opt.description}')
      .setRequired(${opt.required})
      .setType(ApplicationCommandOptionType.${opt.type})
      ${opt.choices
        .map(
          (choice) => `
      .addChoice({
        name: '${choice.name}',
        value: '${choice.value}',
      })`,
        )
        .join('')}
      .build()`,
      )
      .join(',')}
  ],
  developer: ${answers.developer},
  ${answers.flags.length > 0 ? `flags: ${answers.flags.join(' | ')},` : ''}
  execute: async function (
    bot: DiscordBot,
    interaction: ChatInputCommandInteraction,
    args: IInteractionArg[],
  ): Promise<void> {
    await interaction.reply({ content: 'Command executed!', flags: command.flags });
  },
};
`;

    fs.writeFileSync(commandFilePath, commandFileContent.trim());
    console.log(`Command file created at ${commandFilePath}`);
  });

// Command to setup the bot
program
  .command('setup')
  .description('Setup the bot with your Discord ID and bot token')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'discordId',
        message: 'Enter your Discord ID:',
      },
      {
        type: 'input',
        name: 'botToken',
        message: 'Enter your Discord bot token:',
      },
    ]);

    const envPath = path.resolve(__dirname, '../../.env');

    const envContent = `BOT_TOKEN="${answers.botToken}"
DEVS_ID="${answers.discordId}""`;

    fs.writeFileSync(envPath, envContent);
  });

program.parse(process.argv);
