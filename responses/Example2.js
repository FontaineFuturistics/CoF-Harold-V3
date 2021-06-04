module.exports = {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * NOTE: This is a complex response, which requires actual coding to make work *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    // This is the first word that harold looks for to decide
    // whether a particular message warrents this response.
    // This trigger word should be the least common word of
    // all of the trigger words
    initTrig: "example2",

    // This is the array representing all other trigger words
    // Harold will first check if a message has the first trigger
    // word before then checking that it has all other trigger words
    // Only has one other trigger word besides the first trigger, set
    // This to be a single String value instead of an array
    // If this response is triggered by a single word, set the single
    // String value to be the same as the first trigger word
    trigs: ["example2"],

    // The complex response function
    compTrig(message) {

        // As an example, get the persons username
        var userName = message.author.username;

        // And then tell it to them
        message.channel.send("You are " + userName);

    }

}