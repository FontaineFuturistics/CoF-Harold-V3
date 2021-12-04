module.exports = {

    // The command name
    name: "puppet",

    // The command description when the help command is run
    usage: "Sends a message into the harold puppet channel for Carstens date",

    // The commands module (admin, firnando, default)
    module: "firnando",

    // The code of the command
    execute(message, args) {

        // Declare variable to hold the string
        var sayMessage = args.join(" ");

        // Delete the command message
        message.delete();

        // If there is no message, report the error
        if (!sayMessage) {
            message.channel.send("Please include a string after f!puppet for me to send");
            return;
        }

        // Send the message
        message.client.channels.cache.get('916694496874479616').send(sayMessage); 

        // Return
        return;

    },

}