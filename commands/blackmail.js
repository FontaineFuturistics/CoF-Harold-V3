module.exports = {

    // The command name
    name: "blackmail",

    // The command description when the help command is run
    usage: "Returns a random piece of blackmail on Alana",

    // The commands module (admin, firnando, default)
    module: "firnando",

    // The code of the command
    execute(message, args) {

        // Get a reference to client
        const client = message.client;

        // Get a reference to quote of the day and community quotes channel
        const blkml = client.channels.cache.get('852559396927438869');

        blkml.messages.fetch().then(messages => {

            // Pick a random message and send it (the smily is just there, don't question it)
            message.channel.send(messages.random(1)).catch(O_o => { })

        })

    },

}