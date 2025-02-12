import { consola, ConsolaInstance } from 'consola';
import {
  Client,
  ClientOptions,
  Collection,
  REST,
  ModalBuilder,
  User,
  ButtonInteraction,
  AnySelectMenuInteraction,
} from 'discord.js';
import { handleCommands } from '@/handlers/commands.handler';
import { handleEvents } from '@/handlers/events.handler';
import { handleModals } from '@/handlers/modals.handler';
import * as dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

export class DiscordBot extends Client {
  private static instance: DiscordBot;
  logger: ConsolaInstance = consola;
  logged: boolean = false;
  restRequest = new REST({ version: '10' }).setToken(
    process.env.BOT_TOKEN ?? '',
  );
  events: Collection<string, IEvent> = new Collection();
  commands: Collection<string, ICommandFile> = new Collection();
  modals: Collection<string, { builder: ModalBuilder; file: IModal }> =
    new Collection();
  buttonActions: Collection<
    string,
    {
      execute: (
        bot: DiscordBot,
        interaction: ButtonInteraction,
      ) => Promise<void>;
    }
  > = new Collection();
  selectMenuActions: Collection<
    string,
    {
      execute: (
        bot: DiscordBot,
        interaction: AnySelectMenuInteraction,
      ) => Promise<void>;
    }
  > = new Collection();
  currentUser: User | null = null;
  currentUsedCommand: ICommand | null = null;

  private constructor(options: ClientOptions) {
    super(options);
  }

  public static getInstance(options?: ClientOptions): DiscordBot {
    if (!DiscordBot.instance) {
      if (!options) {
        throw new Error('Options must be provided for the first instantiation');
      }
      DiscordBot.instance = new DiscordBot(options);
    }
    return DiscordBot.instance;
  }

  public async start() {
    this.logger.info(`Bot starting..`);

    await this.login(process.env.BOT_TOKEN);
    this.logger.success(`Bot Started!`);
    this.logged = true;

    this.logger.info(`Loading events..`);
    await handleEvents(this);

    this.logger.info(`Loading commands..`);
    await handleCommands(this);

    this.logger.info(`Loading modals...`);
    await handleModals(this);

    this.logger.success('Everything is ready!');
  }

  public stop() {
    this.logger.info('Destroying Economy Bot..');
    this.destroy();
    this.logged = false;
  }

  public getIdentifier(): string | undefined {
    return this.user?.id;
  }

  public getAvatarURL(): string | null | undefined {
    return this.user?.displayAvatarURL();
  }

  public getDiscriminator(): string | undefined {
    return this.user?.discriminator;
  }

  public getUsername(): string | undefined {
    return this.user?.username;
  }

  public getTag(): string | undefined {
    return this.user?.tag;
  }

  public isVerified(): boolean | undefined {
    return this.user?.verified;
  }

  public isDeveloper(userId: string): boolean {
    return process.env.DEVS_ID!.split(',').includes(userId);
  }
}
