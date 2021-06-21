module.exports = {

    // The command name
    name: "invite",

    // The command description when the help command is run
    usage: "DM's the user a once use, 24-hour invite to the Church of Firnando Discord server",

    // The commands module (admin, firnando, default)
    module: "firnando",

    // The code of the command
    execute(message, args) {

        // Get client reference
        let client = message.client;

        // ID for #general-talk in firnando
        let fGenId = "642203556841127958";

        // ID for #log in firnando
        fLogId = "833783384937070613"

        // Instantiate a new Date object
        var today = new Date();

        // Create variable time and set it to the date displayed hh:mm
        var time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();

        // Create the invite promise
        client.channels.cache.get(fGenId).createInvite({}, false, 86400, 1, false, ("Per request by " + message.author.tag)).then(invite => {

            // Create the DM promise
            message.author.createDM().then(channel => {

                // DM the user their invite
                channel.send("Here is your once use, 24 hour invite: " + invite.url);

            });

            // Send it into the log channel
            client.channels.cache.get(fLogId).send("User " + message.author.tag + " has created an invite with code: \"" + invite.code + "\" at " + time);

        });   

        // Return
        return;

    },

}