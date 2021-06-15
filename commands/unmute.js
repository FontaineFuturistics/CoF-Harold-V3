module.exports = {

    // The command name
    name: "unmute",

    // The command description when the help command is run
    usage: "Removed muted role from target member (Usage f!unmute @targetmember)",

    // The commands module (admin, firnando, default)
    module: "admin",

    // The code of the command
    execute(message, args) {

        // Get the isAdmin function
        let adminCmd = require("./admin.js");

        // Check that the user running the command is an admin
        if (adminCmd.isAdmin(message) == false) {

            // Tell the user they aren't an admin
            message.channel.send("You do not have permission to run that command")

            // Return
            return;

        }

        // Get the member reference
        let tmem = message.mentions.members.first();

        // Check that there is a member refrence
        if (!tmem) return message.reply("Please @ mention a valid member of this server");

        // Find the muted role
        let role = message.guild.roles.cache.find(role => role.name === "Muted");

        // Apply the role
        tmem.roles.remove(role);

        // Return that the command was successfully executed
        message.reply("Unmuted them");

        // Return
        return;

    },

}