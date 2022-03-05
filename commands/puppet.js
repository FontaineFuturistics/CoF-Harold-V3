module.exports = {

    // The command name
    name: "puppet",

    // The command description when the help command is run
    usage: "Puppetting harold during dates",

    // The commands module (admin, firnando, default)
    module: "firnando",

    // The code of the command
    execute(message, args) {

        if (message.channel.id != '916694496874479616') {

            message.channel.send("This command is only for use in #harold-puppet");
            return;

        }

        // Declare variable to hold the string
        var sayMessage = args.join(" ");

        // Delete the command message
        message.delete();

        // If there is no message, report the error
        if (!sayMessage) {
            message.channel.send("Please include a string after f!say for me to repeat");
            return;
        }

        // Send the message
        message.client.channels.cache.get('916694471255678987').send(sayMessage);
    },

}