import { DiscordBot } from '@/client/discord.bot';
import {
  ColorResolvable,
  EmbedBuilder as DiscordEmbedBuilder,
  EmbedData,
  EmbedField,
} from 'discord.js';

interface PaginationOptions {
  items: EmbedField[];
  itemsPerPage: number;
  currentPage?: number;
}

export class EmbedBuilder extends DiscordEmbedBuilder {
  private client: DiscordBot = DiscordBot.getInstance();
  private paginationOptions?: PaginationOptions;

  constructor(color?: ColorResolvable, data?: EmbedData) {
    super(data);

    this.setFooter({
      text: this.client.currentUsedCommand.name,
      iconURL: this.client.getAvatarURL(),
    });

    this.setAuthor({
      name: this.client.currentUser?.username ?? 'Unknown User',
      iconURL: this.client.currentUser?.displayAvatarURL() ?? '',
    });

    this.setColor(color);
  }

  public setPagination(options: PaginationOptions): this {
    this.paginationOptions = options;
    if (!this.paginationOptions.currentPage)
      this.paginationOptions.currentPage = 1;
    this.updatePagination();
    return this;
  }

  private updatePagination(): void {
    if (!this.paginationOptions) return;

    const { items, itemsPerPage, currentPage } = this.paginationOptions;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);

    this.setFields(paginatedItems);
    this.setFooter({
      text: `Page ${currentPage} / ${Math.ceil(items.length / itemsPerPage)} | ${this.client.currentUsedCommand.name}`,
      iconURL: this.client.getAvatarURL(),
    });
  }

  public nextPage(): this {
    if (!this.paginationOptions) return this;

    this.paginationOptions.currentPage++;
    if (
      this.paginationOptions.currentPage >
      Math.ceil(
        this.paginationOptions.items.length /
          this.paginationOptions.itemsPerPage,
      )
    ) {
      this.paginationOptions.currentPage = 1;
    }
    this.updatePagination();
    return this;
  }

  public previousPage(): this {
    if (!this.paginationOptions) return this;

    this.paginationOptions.currentPage--;
    if (this.paginationOptions.currentPage < 1) {
      this.paginationOptions.currentPage = Math.ceil(
        this.paginationOptions.items.length /
          this.paginationOptions.itemsPerPage,
      );
    }
    this.updatePagination();
    return this;
  }
}
