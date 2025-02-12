import {
  ButtonBuilder as DiscordButtonBuilder,
  ButtonInteraction,
} from 'discord.js';
import { DiscordBot } from '@client/discord.bot';

export class ButtonBuilder extends DiscordButtonBuilder {
  private actionId: string;

  constructor() {
    super();
    this.actionId = '';
  }

  public setAction(
    actionId: string,
    action: (bot: DiscordBot, interaction: ButtonInteraction) => Promise<void>,
  ): this {
    this.actionId = actionId;
    this.setCustomId(actionId);
    DiscordBot.getInstance().buttonActions.set(actionId, { execute: action });
    return this;
  }
}
