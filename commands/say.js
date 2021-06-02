module.exports = {

    // The command name
    name: "say",

    // The command description when the help command is run
    usage: "Prints the arguments",

    // The code of the command
    execute(message, args) {

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
        message.channel.send(sayMessage);

    },

}