module.exports = {

    // The command name
    name: "thisserver",

    // The command description when the help command is run
    usage: "Returns server ID",

    // The code of the command
    execute(message, args) {

        // Get server name and ID
        var serverName = message.guild.name;
        var serverID = message.guild.id;

        // Send the server ID
        message.channel.send("This server, " + serverName + " has an ID of: " + serverID);

        // Return
        return;

    },

}