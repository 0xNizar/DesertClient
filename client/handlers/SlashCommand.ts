import { REST, Routes } from 'discord.js';
import client from "../../index";
import fs from "fs";
import dotenv from "dotenv";

export async function SlashCommand() {
    dotenv.config({ path: "../../" });

    const slashCommands = fs.readdirSync("././slashCommands");

    for (const module of slashCommands) {
        const commandFiles = fs.readdirSync(`././slashCommands/${module}`);
        for (const commandFile of commandFiles) {
            const command = require(`../../slashCommands/${module}/${commandFile}`).default;
            client.slashCommands.set(command.data.name, command);
        }
    }

    const commandJsonData = [
        ...Array.from(client.slashCommands.values()).map((command) => command.data.toJSON()),
    ];

    const rest = new REST({ version: '10' }).setToken(process.env.clientToken!);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.clientID!), { body: commandJsonData });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}