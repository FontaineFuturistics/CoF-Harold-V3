module.exports = {

    // The command name
    name: "hail",

    // The command description when the help command is run
    usage: "Hails our Lord Split in Twain, the One of Rubbery Texture, the cleaved one itself",

    // The commands module (admin, firnando, default)
    module: "firnando",

    // The code of the command
    execute(message, args) {

        // Send the message
        message.channel.send("Hail Firnando!");

        // Return
        return;

    },

}