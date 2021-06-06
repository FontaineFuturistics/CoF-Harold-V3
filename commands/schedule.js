module.exports = {

    // The command name
    name: "schedule",

    // The command description when the help command is run
    usage: "sends a list of regularly scheduled events relevent to standard users of the server",

    // The code of the command
    execute(message, args) {

        // Variable to store whether a schedule was sent
        var sentMsg = false;

        // The serverID where the command was sent
        const serverID = message.guild.id;

        // The file with all of the schedule
        const schedules = require("../Schedule.json");

        // Check to see if any of the keys in the json match the current ID
        for (const key in schedules) {

            // If the server matches a cached schedule, send the schedule
            if (key === serverID) {

                // Send the schedule
                message.channel.send("Schedule String:\n" + schedules[key].join(''));

                // Set sentMsg to true
                sentMsg = true;

            }

        }

        // If a schedule wasn't found, send an error message
        if (sentMsg == false) {

            message.channel.send("No schedule exists for this server");

        }

    },

}