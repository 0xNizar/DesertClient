import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
            .setName("help")
            .setDescription("Show commands list"),

    async execute(interaction: any) {

    }
}