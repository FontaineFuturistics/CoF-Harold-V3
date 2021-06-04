module.exports = {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * NOTE: This is a complex response, which requires actual coding to make work *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    // This is the first word that harold looks for to decide
    // whether a particular message warrents this response.
    // This trigger word should be the least common word of
    // all of the trigger words
    initTrig: "genshin",

    // This is the array representing all other trigger words
    // Harold will first check if a message has the first trigger
    // word before then checking that it has all other trigger words
    // Only has one other trigger word besides the first trigger, set
    // This to be a single String value instead of an array
    // If this response is triggered by a single word, set the single
    // String value to be the same as the first trigger word
    trigs: ["impact"],

    // The complex response function
    compTrig(message) {

        // Get the userID
        var senduserID = message.author.id;

        // Alana's UUID
        const alanaID = "498335873637679117";

        // If the user was Alana, say something special, otherwise, say something generic
        if (senduserID === alanaID) {

            // Send the message
            message.channel.send("I want a divorce");

            // Return
            return;

        } else {

            // Send the message
            message.channel.send("I had zero expectations for you mortal, yet you still have disappointed me")

            // Return
            return;

        }

    }

}