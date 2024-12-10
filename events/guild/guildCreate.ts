export default {
    name: "guildCreate",
    once: false,

    execute: async (guild: any) => {
        console.log(`Client has been added to: ${guild.name}`);
    }
}