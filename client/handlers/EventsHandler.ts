import client from "../../index";
import fs from "fs";

export function EventsHandler() {
    const eventsDir = fs.readdirSync("./events");

    for (const events of eventsDir) {
        const eventFiles = fs.readdirSync(`./events/${events}`);
        for (const eventFile of eventFiles) {
            try {
                const event = require(`../../events/${events}/${eventFile}`).default;

                if (!event || !event.name || !event.execute) {
                    console.error(
                        `Invalid event structure in file: ${events}/${eventFile}`
                    );
                    continue;
                }

                if (event.once) {
                    client.once(event.name, (...args) => {
                        event.execute(...args);
                    });
                } else {
                    client.on(event.name, (...args) => {
                        event.execute(...args);
                    });
                }
            } catch (error) {
                console.error(`Error loading event file: ${events}/${eventFile}`, error);
            }
        }
    }
}