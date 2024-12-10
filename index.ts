import { Desert } from "./client/Desert";
import dotenv from "dotenv";

dotenv.config();

const client = new Desert();
export default client;

client.connect();
client.login(process.env.clientToken);