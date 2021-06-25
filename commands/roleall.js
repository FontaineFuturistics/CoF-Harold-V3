module.exports = {

    // The command name
    name: "roleall",

    // The command description when the help command is run
    usage: "Adds a role to all members",

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

        // Find the Harold Access role
        let role = message.guild.roles.cache.find(role => role.name === "Harold Access");

        // Get all members
        let allMembers = message.guild.members.cache;

        // Run against all members
        allMembers.map(sMem => {

            // Apply the role
            sMem.roles.add(role);

        })

        // Return that the command was successfully executed
        message.reply("Gave them all the roles");

        // Return
        return;

    },

}