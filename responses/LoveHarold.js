module.exports = {

    // The first trigger word
    initTrig: "love",

    // All subsequent trigger words
    trigs: [ "harold" ],

    // The chance (represented by 1 in x) that the response triggers
    chance: 1,

    // The responses
    responses: ["I love you too", ":sparkling_heart:", "I am already married, sorry"],

    // The complex response function
    compTrig(message) {

        // Normal responses
        responses = ["I love you too", ":sparkling_heart:", "I am already married, sorry"];

        // Alana responses
        aRes = ["I love you too", ":sparkling_heart:", "Well we are married", "Fair enough", "You know I think I almost have some feelings as well now, impressive"];

        // Get the userID
        var senduserID = message.author.id;

        // Alana's UUID
        const alanaID = "498335873637679117";

        // If the user was Alana, say something special, otherwise, say something generic
        if (senduserID === alanaID) {

            // Select which response to give
            var random = Math.floor(Math.random() * (parseInt(aRes.length, 10)));

            // Send the message
            message.channel.send(aRes[random]);

            // Return
            return;

        } else {

            // Select which response to give
            var random = Math.floor(Math.random() * (parseInt(responses.length, 10)));

            // Send the message
            message.channel.send(responses[random]);

            // Return
            return;

        }

    }

}