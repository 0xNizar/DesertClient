import { Client, GatewayIntentBits, SlashCommandBuilder, Collection } from 'discord.js';
import { EventsHandler } from "./handlers/EventsHandler";
import { SlashCommand } from './handlers/SlashCommand';

interface Command {
    data: SlashCommandBuilder;
    execute: (...args: any[]) => void;
}

export class Desert extends Client {
    public slashCommands: Collection<string, Command>;
    public eventHnadler: any;

    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds]
        });

        this.slashCommands = new Collection();
    }

    connect = () => {
        EventsHandler();
        SlashCommand();
    }
}