import { Client, Collection, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

interface Command {
  data: SlashCommandBuilder;
  execute: (...args: any[]) => void;
}

interface ExtendedClient extends Client {
  slashCommands: Collection<string, Command>;
}

const client: ExtendedClient = new Client({ intents: [GatewayIntentBits.Guilds] }) as ExtendedClient;

client.slashCommands = new Collection();

client.on('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  } else {
    console.log("Client user is null. Something went wrong!");
  }
});

const slashCommands = fs.readdirSync("./slashCommands");

for (const module of slashCommands) {
	const commandFiles = fs.readdirSync(`./slashCommands/${module}`);
	for (const commandFile of commandFiles) {
		const command = require(`./slashCommands/${module}/${commandFile}`).default;
		client.slashCommands.set(command.data.name, command);
	}
}

const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((command) => command.data.toJSON()),
];

const rest = new REST({ version: '10' }).setToken(process.env.clientToken!);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.clientID!), { body: commandJsonData });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.login(process.env.clientToken);