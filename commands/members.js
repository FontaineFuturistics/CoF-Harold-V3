module.exports = {

    // The command name
    name: "members",

    // The command description when the help command is run
    usage: "Returns number of members in the server",

    // The commands module (admin, firnando, default)
    module: "default",

    // The code of the command
    execute(message, args) {

        // Get the number of members
        var numMembers = message.channel.guild.memberCount;

        // Send the number of members
        message.channel.send("There are " + numMembers + " users in the server at this time.")

        // Return
        return;

    },

}