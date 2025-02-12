import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  Attachment,
  CacheType,
  ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  GuildBasedChannel,
  GuildMember,
  InteractionReplyOptions,
  Message,
  MessageFlags,
  ModalActionRowComponentBuilder,
  ModalSubmitInteraction,
  Role,
  SlashCommandBuilder,
  User,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import { DiscordBot } from '@client/discord.bot';
import { CommandBuilder, SubCommandBuilder } from '@builders';

declare global {
  /**
   * Discord Event Interface
   */
  interface IEvent {
    name: string;
    once: boolean;
    execute: (bot: DiscordBot, ...args: any[]) => Promise<any>;
  }

  /**
   * Discord CommandFile Interface
   */
  interface ICommandFile {
    name: string;
    description: string;
    options?: ICommandOption[];
    type?: ApplicationCommandType;
    developer: boolean;
    flags?: BitFieldResolvable<
      'SuppressEmbeds' | 'Ephemeral' | 'SuppressNotifications',
      | MessageFlags.SuppressEmbeds
      | MessageFlags.Ephemeral
      | MessageFlags.SuppressNotifications
    >;
    execute?: (
      bot: DiscordBot,
      interaction:
        | ChatInputCommandInteraction<CacheType>
        | UserContextMenuCommandInteraction<CacheType>,
      args?: IInteractionArg[],
    ) => Promise<any>;
  }

  /**
   * Discord ModalFile Interface
   */
  interface IModal {
    customId: string;
    title: string;
    developer: boolean;
    ephemeral: boolean;
    components: ActionRowBuilder<ModalActionRowComponentBuilder>[];
    execute?: (
      bot: DiscordBot,
      interaction: ModalSubmitInteraction,
    ) => Promise<any>;
  }

  /**
   * Discord Command Interface
   */
  interface ICommand {
    name: string;
    description: string;
    type?: ApplicationCommandType;
    options?: ICommandOption[];
  }

  /**
   * Discord CommandOptionChoice Interface
   */
  interface ICommandOptionChoice {
    name: string;
    value: string | number;
  }

  /**
   * Discord CommandOption Interface
   */
  interface ICommandOption {
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    required?: boolean;
    choices?: ICommandOptionChoice[];
    options?: ICommandOption[];
  }

  /**
   * Discord InteractionArg Interface
   */
  interface IInteractionArg {
    name: string;
    type: ApplicationCommandOptionType;
    value?: any;
    attachment?: Attachment;
    role?: Role;
    user?: User;
    member?: GuildMember;
    message?: Message<boolean>;
    autocomplete?: boolean;
    channel?: GuildBasedChannel;
    focused?: boolean;
  }
}

export {};
