import {
  StringSelectMenuBuilder as DiscordStringSelectMenuBuilder,
  StringSelectMenuInteraction,
  MentionableSelectMenuBuilder as DiscordMentionableSelectMenuBuilder,
  MentionableSelectMenuInteraction,
  ChannelSelectMenuBuilder as DiscordChannelSelectMenuBuilder,
  ChannelSelectMenuInteraction,
  UserSelectMenuBuilder as DiscordUserSelectMenuBuilder,
  UserSelectMenuInteraction,
  RoleSelectMenuBuilder as DiscordRoleSelectMenuBuilder,
  RoleSelectMenuInteraction,
} from 'discord.js';
import { DiscordBot } from '@client/discord.bot';

export class StringSelectMenuBuilder extends DiscordStringSelectMenuBuilder {
  private actionId: string;

  constructor() {
    super();
    this.actionId = '';
  }

  public setAction(
    actionId: string,
    action: (
      bot: DiscordBot,
      interaction: StringSelectMenuInteraction,
    ) => Promise<void>,
  ): this {
    this.actionId = actionId;
    this.setCustomId(actionId);
    DiscordBot.getInstance().selectMenuActions.set(actionId, {
      execute: action,
    });
    return this;
  }
}

export class UserSelectMenuBuilder extends DiscordUserSelectMenuBuilder {
  private actionId: string;

  constructor() {
    super();
    this.actionId = '';
  }

  public setAction(
    actionId: string,
    action: (
      bot: DiscordBot,
      interaction: UserSelectMenuInteraction,
    ) => Promise<void>,
  ): this {
    this.actionId = actionId;
    this.setCustomId(actionId);
    DiscordBot.getInstance().selectMenuActions.set(actionId, {
      execute: action,
    });
    return this;
  }
}

export class RoleSelectMenuBuilder extends DiscordRoleSelectMenuBuilder {
  private actionId: string;

  constructor() {
    super();
    this.actionId = '';
  }

  public setAction(
    actionId: string,
    action: (
      bot: DiscordBot,
      interaction: RoleSelectMenuInteraction,
    ) => Promise<void>,
  ): this {
    this.actionId = actionId;
    this.setCustomId(actionId);
    DiscordBot.getInstance().selectMenuActions.set(actionId, {
      execute: action,
    });
    return this;
  }
}

export class ChannelSelectMenuBuilder extends DiscordChannelSelectMenuBuilder {
  private actionId: string;

  constructor() {
    super();
    this.actionId = '';
  }

  public setAction(
    actionId: string,
    action: (
      bot: DiscordBot,
      interaction: ChannelSelectMenuInteraction,
    ) => Promise<void>,
  ): this {
    this.actionId = actionId;
    this.setCustomId(actionId);
    DiscordBot.getInstance().selectMenuActions.set(actionId, {
      execute: action,
    });
    return this;
  }
}

export class MentionableSelectMenuBuilder extends DiscordMentionableSelectMenuBuilder {
  private actionId: string;

  constructor() {
    super();
    this.actionId = '';
  }

  public setAction(
    actionId: string,
    action: (
      bot: DiscordBot,
      interaction: MentionableSelectMenuInteraction,
    ) => Promise<void>,
  ): this {
    this.actionId = actionId;
    this.setCustomId(actionId);
    DiscordBot.getInstance().selectMenuActions.set(actionId, {
      execute: action,
    });
    return this;
  }
}
