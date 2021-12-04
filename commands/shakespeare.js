module.exports = {

    // The command name
    name: "shakespeare",

    // The command description when the help command is run
    usage: "Returns quotes or synopsis from the Folger's Shakespeare Library API, run f!shakespeare -h for more information",

    // The commands module (admin, firnando, default)
    module: "default",

    // The code of the command
    execute(message, args) {

        // General command usage
        if (args[0] == "-h" || !args[0]) {

            message.channel.send("This command will query the Folgers Shakespeare Library API. Regrettably the API is a mess so this command must be formatted very specifically\n" +
                "To get this help page run f!shakespeare -h\n" +
                "To get a list of all play codes run f!shakespeare -c\n" +
                "To return the synopsis of a particular play run f!shakespeare -s (play code) (act, optional)\n" +
                "To return a quote run f!shakespeare -q (play code) (line #)\n" +
                "The line numbers refer to the line number in the Folger Shakespeare Library edition of the play. \nIf no line number is given a random line will be returned, play code is required");

            return;

        }

        // Ensure there is a valid format specifier
        if (args[0] != "-c" && args[0] != "-q" && args[0] != "-s") {

            message.channel.send("You must enter a valid format specifier such as -q, -c, -s, or -h");

            return;

        }

        // Play codes
        if (args[0] == "-c") {

            message.channel.send("**AWW**: All's Well That Ends Well\n" + 
                "**ANT**: Antony and Cleopatra\n" +
                "**AYL**: As You Like It\n" + 
                "**ERR**: The Comedy of Errors\n" +
                "**COR**: Coriolanus\n" +
                "**CYM**: Cymbeline\n" + 
                "**HAM**: Hamlet\n" +
                "**1H4**: Henry IV, Part 1\n" +
                "**2H4**: Henry IV, Part 2\n" +
                "**H5**: Henry V\n" +
                "**1H6**: Henry VI, Part 1\n" +
                "**2H6**: Henry VI, Part 2\n" +
                "**3H6**: Henry VI, Part 3\n" +
                "**H8**: Henry VIII\n" +
                "**JC**: Julius Caeser\n" +
                "**JN**: King John\n" +
                "**LR**: King Lear\n" +
                "**LLL**: Love's Labor's Lost\n" +
                "**MAC**: Macbeth\n" +
                "**MM**: Measure for Measure\n" +
                "**MV**: The Merchant of Venice\n" +
                "**WIV**: The Merry Wives of Windsor\n" +
                "**MND**: A Midsummer Night's Dream\n" +
                "**ADO**: Much Ado About Nothing\n" +
                "**OTH**: Othello\n" +
                "**PER**: Pericles\n" +
                "**R2**: Richard II\n" +
                "**R3**: Richard III\n" +
                "**ROM**: Romeo and Juliet\n" +
                "**SHR**: The Taming of the Shrew\n" +
                "**TMP**: The Tempest\n" +
                "**TIM**: Timon of Athens\n" +
                "**TIT**: Titus Andronicus\n" +
                "**TRO**: Troilus and Cressida\n" +
                "**TN**: Twelfth Night\n" +
                "**TGV**: Two Gentlement of Verona\n" +
                "**TNK**: Two Noble Kinsmen\n" +
                "**WT**: The Winter's Tale");

            return;

        }

        // Ensure there is a playcode
        if (!args[1]) {

            message.channel.send("You must specify a play code for that operation");

            return;

        }

        // Set play code
        var playcode = args[1];

        // Setpcval to false
        var pcval = false;

        // Load all valid playcodes
        const iterableValidCodes = require("../resources/PlayCodes_I.json");

        // Preform input validation
        for (i = 0; i < iterableValidCodes.length; i++) {

            if (playcode == iterableValidCodes[i]) {

                var pcval = true;

                continue;
            } else if (playcode.toLowerCase() == iterableValidCodes[i].toLowerCase()) {

                var playcode = iterableValidCodes[i];

                var pcval = true;

                continue;

            }

        }

        // Make sure the playcode was found to be valid
        if (pcval == false) {

            message.channel.send("You must enter a valid play code");

            return;

        }

        // Declare linenumber
        var linenumber = "";

        // Set Line number
        if (args[2]) {

            var linenumber = args[2].toString();

        } else if (args[0] == "-q") {

            var linenumber = (Math.floor(Math.random() * (2000)) + 1).toString();

        }

        while (linenumber.length < 4) {

            var linenumber = "0" + linenumber;

        }

        // Get https library
        const https = require("https");

        // Parse options into a JSON
        const options = {
            host: 'www.folgerdigitaltexts.org',
            port: '443',
            path: '/' + playcode + (args[0] == "-s" ? "/synopsis/" : "/ftln/") + linenumber,
            method: "GET",
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

                var sanitized = body.replace(/<.*?>/g, "");

                // If there is no result, report the error and return
                if (!sanitized) {

                    // Respond to the message
                    message.reply("No return");

                    // Return
                    return;

                }

                // Get rid of unnecessary parts:
                if (args[0] == "-s") {

                    var sanitized = sanitized.replace(/Synopsis of.*?:/, "");

                } else {

                    // Get the quote text
                    let text = sanitized.replace(/[^]*Text:  /, "");

                    // Remove everything before the speaker name
                    var speaker = sanitized.replace(/[^]*Speaker: #/, "");

                    // Remove everything after the speaker name
                    var speaker = speaker.replace(/_[^]*/, "");

                    // Combine it all
                    var sanitized = "\"" + text + "\" -" + speaker;

                }

                // Send the result
                message.channel.send(sanitized, { split: true });

            });

        });

    },

}