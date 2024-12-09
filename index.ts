import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from "dotenv";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  } else {
    console.log("Client user is null. Something went wrong!");
  }
});

client.login(process.env.clientToken);