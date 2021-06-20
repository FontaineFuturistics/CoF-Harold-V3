module.exports = {

    // The command name
    name: "define",

    // The command description when the help command is run
    usage: "Returns the definition of the word from the Oxford English Dictionary",

    // The commands module (admin, firnando, default)
    module: "default",

    // The code of the command
    execute(message, args) {

        // Get https library
        const https = require("https");

        // Declare constants
        // API keys
        const app_id = "ba7e9983";
        const app_key = "09d8030fd262f244193ab4999c141ee9";

        // Word to be searched
        const wordId = args[0];

        // Fields to be returned
        /*
         * All valid fields:
         * definitions
         * domains
         * etymologies
         * examples
         * pronunciations
         * regions
         * registers
         * variantForms
         */
        const fields = "definitions";

        // Strinct match
        const strictMatch = "false";

        // Parse options into a JSON
        const options = {
            host: 'od-api.oxforddictionaries.com',
            port: '443',
            path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
            method: "GET",
            headers: {
                'app_id': app_id,
                'app_key': app_key
            }
        };

        // Query the server
        https.get(options, (resp) => {
            let body = '';

            // Continue to add to the response as data is returned
            resp.on('data', (d) => {
                body += d;
            });

            // Wait for the response to end
            resp.on('end', () => {

                // Convert the definition into a JSON
                let parsed = JSON.parse(body);

                // If there is no result, report the error and return
                if (!parsed.results) {

                    // Respond to the message
                    message.reply("That word is not in the dictionary, please make sure that you are using the singular form of the noun, or the infinitive form of the verb.");

                    // Return
                    return;

                }

                // Variable to hold the final definition string
                let fString = '';

                // Variable to hold the current definition number
                let dnum = 1;

                // Add the header to fString
                fString += "**" + parsed.id + "**\n";

                // Run against each result
                for (result of parsed.results) {

                    // For each result run against the individual lexical entries
                    for (lexEn of result.lexicalEntries) {

                        // If lexEn.entries[0].senses doesn't exist, don't try to iterate it
                        if (!lexEn.entries[0].senses) {

                            // Continue
                            continue;

                        }

                        // For each sense within the entry of each lexical entry
                        for (sense of lexEn.entries[0].senses) {

                            // Add the definition to fString
                            fString += "\n" + dnum + ". **" + sense.definitions + "**";

                            // Increase dnum
                            dnum++;

                            // If there is no subsense, continue
                            if (!sense.subsenses) continue;

                            // If there is a subsense, add it
                            fString += "\n" + dnum + ". **" + sense.subsenses[0].definitions + "**";

                            // Increase dnum
                            dnum++;

                        }
                    }
                }

                // Add footer
                fString += "";


                // Send the definition into the channel
                message.channel.send(fString, { split: true });
                
            });
        });
    },

}