import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
            .setName("setname")
            .setDescription("Change client name"),

    async execute(interaction: any) {

    }
}