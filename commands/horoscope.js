module.exports = {

    // The command name
    name: "horoscope",

    // The command description when the help command is run
    usage: "Tells you your horoscope for the day",

    // The commands module (admin, firnando, default)
    module: "default",

    // The code of the command
    execute(message, args) {

        // Get the UUID
        let uuid = parseInt(message.author.id);

        // Declare a date object
        let today = new Date();

        // Get the date as a single string
        let dString = today.getDate().toString() + today.getMonth().toString() + today.getFullYear().toString();

        // Get the response list
        let horoscopes = require('../resources/Horoscopes.json');

        // Get the length of the response list
        let length = horoscopes.length;

        // Run the improvised hash algorithm
        let hash = ((uuid * dString * dString) + uuid) % dString;

        // Mod the hash by the length
        let aIndex = hash % length;

        // Send the variables
        //message.channel.send("dString: " + dString + "\nlength: " + length + "\nhash: " + hash + "\naIndex:" + aIndex + "\nuuid: " + uuid + "\ndInt: " + dInt)

        // Send the correct response
        message.channel.send(horoscopes[aIndex]);

    },

}