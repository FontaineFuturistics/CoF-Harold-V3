module.exports = {

    // The command name
    name: "quote",

    // The command description when the help command is run
    usage: "Returns a random quote from quote-of-the-day or community-quotes",

    // The commands module (admin, firnando, default)
    module: "firnando",

    // The code of the command
    execute(message, args) {

        // Get a reference to client
        const client = message.client;

        // Get a reference to quote of the day and community quotes channel
        const qotd = client.channels.cache.get('655268080758554636');

        // Get the message handler and start execution immediatly
        qotd.messages.fetch().then(messages => {

            // Pick a random message and send it
            message.channel.send(messages.random(1))

        })

    },

}