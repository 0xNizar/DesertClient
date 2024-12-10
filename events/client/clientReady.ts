import { Desert } from "../../client/Desert";

export default {
    name: "ready",
    once: true,

    execute: async (client: Desert) => {
        if (client.user) {
            console.log(`Logged in as ${client.user.tag}!`);
        } else {
            console.log("Client user is null. Something went wrong!");
        }
    }
}