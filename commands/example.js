module.exports = {

    // The command name
    name: "example",

    // The command description when the help command is run
    usage: "No use",

    // The commands module (admin, firnando, default)
    module: "default",

    // The code of the command
    execute(message, args) {
        // The content of the command
        message.channel.send("You weren't supposed to run this");
    },

}