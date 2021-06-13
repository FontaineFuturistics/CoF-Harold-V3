module.exports = {

    // The command name
    name: "heresy",

    // The command description when the help command is run
    usage: "",

    // The commands module (admin, firnando, default)
    module: "default",

    // The code of the command
    execute(message, args) {

        // Delete the command message
        message.delete();

        // Send the image
        message.channel.send("https://cdn.discordapp.com/attachments/520767802806632448/746165091782885397/959665d8cef104afee8d5ad7a71a8d50.jpg");
    },

}