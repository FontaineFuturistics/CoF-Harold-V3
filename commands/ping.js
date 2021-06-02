module.exports = {

    // Set the name of the command
    name: "ping",

    // Set the description
    usage: "Returns the current ping to the Discord API",

    // The command
    async execute(message, args) {

        // Get a reference to the client
        const client = message.client;

        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        return
    },

};