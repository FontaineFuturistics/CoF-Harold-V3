module.exports = {

    // The command name
    name: "random",

    // The command description when the help command is run
    usage: "Returns a number between 0 and x",

    // The commands module (admin, firnando, default)
    module: "default",

    // The code of the command
    execute(message, args) {

        // Generate the random number
        var random = Math.floor(Math.random() * (parseInt(args[0], 10)))

        // The content of the command
        message.channel.send("Your random number is: " + random);
    },

}