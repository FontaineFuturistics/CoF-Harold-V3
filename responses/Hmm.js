module.exports = {

    // This is the first word that harold looks for to decide
    // whether a particular message warrents this response.
    // This trigger word should be the least common word of
    // all of the trigger words
    initTrig: "hmm",

    // This is the array representing all other trigger words
    // Harold will first check if a message has the first trigger
    // word before then checking that it has all other trigger words
    // Only has one other trigger word besides the first trigger, set
    // This to be a single String value instead of an array
    // If this response is triggered by a single word, set the single
    // String value to be the same as the first trigger word
    trigs: ["hmm"],

     // The complex response function
    compTrig(message) {

        // Decide whether or not to respond
        var random = Math.floor(Math.random() * (4));

        // If random isn't 0, return
        if (random != 0) return;

        // Split message into separate words again
        const words = message.content.trim().split(/ +/g);

        // If there is more in the message then just "hmm", return
        if (words[1]) return;

        // Create a variable to hold all responses
        var responses = [ "I am warning you", "Try that again and...", "Don't make me send my Russian operatives after you" ]

        // Generate a new random number to decide which response to give
        var random = Math.floor(Math.random() * (parseInt(responses.length, 10)));

        // Send the message
        message.channel.send(responses[random]);

    }

}