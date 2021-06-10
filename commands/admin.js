module.exports = {

    // The command name
    name: "admin",

    // The command description when the help command is run
    usage: "Returns whether or not the user has an administrative role",

    // The commands module (admin, firnando, default)
    module: "admin",

    // The code of the command
    execute(message, args) {

        // Load config.json
        const config = require("../config.json");

        // Load list of admin roles into a variable
        const adminRoles = config.adminRoles; // This puts all roles into the first array index as a comma separated list

        // Determine whether the user has admin
        if (message.member.roles.cache.some(r => adminRoles.includes(r.name))) {

            // If the user does then tell them
            message.channel.send("You are an administrator on this server");

        } else {

            // If the user does not tell them
            message.channel.send("You are not an administrator on this server");

        }

    },

}