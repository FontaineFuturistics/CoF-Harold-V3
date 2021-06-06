module.exports = {

    // The command name
    name: "schedule",

    // The command description when the help command is run
    usage: "sends a list of regularly scheduled events relevent to standard users of the server",

    // The code of the command
    execute(message, args) {
        // The content of the command

        let serverID = message.guild.id;
        let schedule = require("../schedules/" + serverID + ".json");

        message.channel.send(schedule);
        return

    },

}