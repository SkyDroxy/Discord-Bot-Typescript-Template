<div align="center">
  <h3 align="center">Discord Bot Typescript Template made by SkyDroxy</h3>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#information">Information</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#prettier">Prettier</a></li>
    <li><a href="#discord-bot-cli">Discord Bot CLI</a></li>
  </ol>
</details>

## Information

This template contains everything you need to quickly start creating your own Discord bot.

## Getting Started

Here's what you need to install this project locally.
Follow these simple steps to get started.

### Prerequisites

- Node.js
  <a href="https://nodejs.org/en/">Node.js Downloads</a>

- npm

  ```sh
  npm install -g typescript ts-node
  ```

- yarn
  ```sh
  npm install yarn -g
  yarn global add typescript ts-node
  ```

- pnpm
  ```sh
  npm install -g pnpm
  pnpm add -g typescript ts-node
  ```

### Installation

1. Create a new bot on [Discord Developper Applications](https://discord.com/developers/applications)
2. Clone the repo
   ```sh
   git clone https://github.com/Kalddeon/TypeScript-Discord-Bot-Template.git
   ```
3. Modifier le package.json
   ```sh
    npm init
   ```
4. Install packages

   ```sh
   yarn

   OR

   npm i

   OR

   pnpm i
   ```

5. Setup environment variables in .env
   ```env
   BOT_TOKEN="YOUR BOT TOKEN"
   DEV_ID="YOUR DISCORD ID"
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

```sh
npm run start:dev
npm run start:dev:watch

OR

yarn start:dev
yarn start:dev:watch

OR

pnpm start:dev
pnpm start:dev:watch
```

## Prettier

```sh
npm run prettier-code

OU

yarn prettier-code
```

## Discord Bot CLI
The Discord Bot CLI helps you quickly scaffold new bot commands and configure your bot.

### Installation
```sh
npm run setup-cli

OR

yarn setup-cli

OR

pnpm setup-cli
```

### Usage
Configure bot settings:
```sh
discord-bot-cli setup
```

Create a new command:
```sh
discord-bot-cli new command
```


<p align="right">(<a href="#top">back to top</a>)</p>
