module.exports = {

    // The command name
    name: "messages",

    // The command description when the help command is run
    usage: "Sends a random message that someone considered funny",

    // The commands module (admin, firnando, default)
    module: "firnando",

    // The code of the command
    execute(message, args) {

        // Get a reference to client
        const client = message.client;

        // Get a reference to blackmail channel
        const msgs = client.channels.cache.get('858108545630601226');

        msgs.messages.fetch().then(messages => {

            // Pick a random message and send it (the smily is just there, don't question it)
            message.channel.send(messages.random(1)).catch(O_o => { })

        })

    },

}