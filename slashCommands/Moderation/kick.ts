import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
            .setName("kick")
            .setDescription("Kick someone from the server"),

    async execute(interaction: any) {

    }
}