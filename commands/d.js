module.exports = {

    // The command name
    name: "d",

    // The command description when the help command is run
    usage: "Parses D&D dice in the form XdY(+/-)Z, this command returns a shortend output",

    // The commands module (admin, firnando, default)
    module: "default",

    // The code of the command
    execute(message, args) {

        // Declare variables
        var dnum; // The number of times to roll the dice, as well as the input string
        var dside; // The number of sides of the dice
        var dmod; // The modifier
        var dtotal = 0; // The accumulator to hold the total of all dice rolls
        var dtotalINT; // The integer version of dtotal
        var dmodINT; // The integer version of dmod
        var argument = args[0]; // The argument



        // Checks that there is an argument
        if (!argument) {
            message.channel.send("Please specify the number of sides on the dice you would like to roll, as well as the number of dice and the modifier");
            return;
        }

        // Split the dice command along the d
        var dnum = argument.split("d");

        //Parse dnum and initial rest of message as dside
        if (!dnum[1]) {
            // If there is no second element of the array, there way no number of dice specified,
            // so set the number of sides to the first element, and set the number of dice to one
            var dside = dnum[0]
            var dnum = 1
        } else {
            // Otherwise use the separated array elements
            var dside = dnum[1]
            var dnum = dnum[0]
        }

        // Correct dnum if it has no value
        if (!dnum[0]) var dnum = 1;

        //Determine sides of the dice if a modifier was given
        var dside = dside.split("+");

        //Parse dside
        if (!dside[1]) {
            var dside = dside[0].split("-"); //causes an error

            if (!dside[1]) {
                var dmod = 0
                var dside = dside[0]
            } else {
                var dmod = -1 * dside[1]
                var dside = dside[0]
            }
        } else {
            var dmod = dside[1]
            var dside = dside[0]
        }

        //Ensure that dnum is not too large
        if (dnum > 1000) {
            message.channel.send("I refuse")
            return
        }

        //Preform the dice roles
        while (dnum > 0) {
            var random = Math.floor(Math.random() * (dside)) + 1; // Generate the random number
            var dtotal = dtotal + random; // Add the number to the total
            var dnum = dnum - 1; // Decrease dnum by 1 
        }

        // Convert dtotal and dmod into integers
        var dtotalINT = parseInt(dtotal, 10);
        var dmodINT = parseInt(dmod, 10);

        //Add the modifier
        var dtotal = dtotalINT + dmodINT

        //Print the output
        message.channel.send("I got **" + dtotal + "**\nNat: " + dtotalINT);
        return
    },

}