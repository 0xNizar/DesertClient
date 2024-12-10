import { Client, GatewayIntentBits, SlashCommandBuilder, Collection } from 'discord.js';

interface Command {
    data: SlashCommandBuilder;
    execute: (...args: any[]) => void;
}

export class Desert extends Client {
    public slashCommands: Collection<string, Command>;

    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds]
        });

        this.slashCommands = new Collection();
    }
}