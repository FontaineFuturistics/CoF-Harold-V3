module.exports = {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * NOTE: This is a complex response, which requires actual coding to make work *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    // This is the first word that harold looks for to decide
    // whether a particular message warrents this response.
    // This trigger word should be the least common word of
    // all of the trigger words
    initTrig: "bannedwordteststring",

    // This is the array representing all other trigger words
    // Harold will first check if a message has the first trigger
    // word before then checking that it has all other trigger words
    // Only has one other trigger word besides the first trigger, set
    // This to be a single String value instead of an array
    // If this response is triggered by a single word, set the single
    // String value to be the same as the first trigger word
    trigs: ["bannedwordteststring"],

    // The complex response function
    compTrig(message) {

        // log channel ID
        const log = '833783384937070613';

        // Banned Word
        const word = "BannedWordTestString"

        // Create the log message:
        let logmsg = "Censored message from " + message.author.tag + "because it contained " + word + " the entire message was:\n" + message.content; 

        // Send a message into the logs
        message.client.channels.cache.get(log).send(logmsg);
        console.log(logmsg);

        // DM the message sender
        message.author.createDM().then(channel => {

            // DM the user their warning
            channel.send("I deleted a message you sent on the Firnando server because it contained a slur, the Firnanod server has a strict no-slur policy, continued violation of this policy will result in administrative action.\nThis is an automated message do not respond");

        });

        // Respond to the message
        message.channel.send("<@&642505336410079232> I have deleted a message from <@" + message.author.id + "> because it contained a slur. This is a notice to all in this conversation that slurs are explicitly banned on the Firnanod server");

        // Delete the message
        message.delete();

    }

}