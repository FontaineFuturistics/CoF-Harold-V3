module.exports = {

    // The command name
    name: "help",

    // The command description when the help command is run
    usage: "Lists all valid commands and their usage",

    // The code of the command
    execute(message, args) {

        // Get the client
        const { commands } = message.client;

        // Declare a variable to hold the help message
        const content = []; // Yes this is a constant that is modified, no idea why that works

        // Create a header
        content.push("**Here is a list of all valid commands:**\n");

        // Populate the variable with all commands and their usage
        content.push(commands.map(command => ("**" + command.name + ":** " + command.usage)).join("\n"));

        // Send the help message
        message.channel.send(content);

        // Return
        return;

    },

}