module.exports = {

    // The command name
    name: "mute",

    // The command description when the help command is run
    usage: "Adds muted role to target member (Usage f!mute @targetmember)",

    // The commands module (admin, firnando, default)
    module: "admin",

    // The code of the command
    execute(message, args) {

        // Get the member reference
        let tmem = message.mentions.members.first();

        // Check that there is a member refrence
        if (!tmem) return message.reply("Please @ mention a valid member of this server");

        // Find the muted role
        let role = message.guild.roles.cache.find(role => role.name === "Muted");

        // Apply the role
        tmem.roles.add(role);

        // Return that the command was successfully executed
        message.reply("Muted them");

        // Return
        return;

    },

}