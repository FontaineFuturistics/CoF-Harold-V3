// Require prerequisites
require("dotenv").config();
const Discord = require("discord.js");
const fs = require('fs');
const config = require('./config.json');

// Instantiate the client
const client = new Discord.Client();

// Create a collection for all commands
client.commands = new Discord.Collection();

// Create a collection for all responses
client.responses = new Discord.Collection();

// Load commands into an array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Load response files into an array
const responseFiles = fs.readdirSync('./responses').filter(file => file.endsWith('.js'));

// Load commands into the collection
for (const file of commandFiles) {

    // Load the current command into a variable
    const command = require('./commands/' + file);

    // Put the command into the collection
    client.commands.set(command.name, command);

}

// Load response into the collection
for (const file of responseFiles) {

    // Load the current command into a variable
    const response = require('./responses/' + file);

    // Put the command into the collection
    client.responses.set(response.initTrig, response);

}

/* * * * * * * * * * * 
 * Declare Constants *
 * * * * * * * * * * */

// Server IDs
const firnandoID = 642203556312776714;
const yruuID = 827570784930365480;
const uuccID = 773618438135873558;

// bot-commands channel IDs
const firnandoBotCmd = '676923663643312128';
const yruuBotCmd = '827574804378943508';
const uuccBotCmd = '773620818373902348';

// startup message channels from config.json
const startup = config.startup;

// Response module array
const resMod = config.response;

/* Join link:
 * https://discord.com/api/oauth2/authorize?client_id=<746029175294656582>&scope=applications.commands
 */

// Timestamp function
function timestamp() {

    // Instantiate a new Date object
    var today = new Date();

    // Create variable time and set it to the date displayed hh:mm
    var time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();

    // Return time
    return time;
}

// Bot startup block
client.on('ready', () => {

    // Log in the console that the bot has booted
    console.log('Bot activated at ' + timestamp());

    // Send messages into each server that Harold has booted
    for (const server of startup) {
        client.channels.cache.get(server).send('I have awoken now at ' + timestamp());
    }


    // Set status
    client.user.setActivity(`god`); // Should pick a better status
   
});

// User join block
client.on("guildMemberAdd", async Member => {

    // Check that the server is Firnando
    if (Member.guild.id != firnandoID) return;

    // Send A Funny into general
    client.channels.cache.get('642203556841127958').send('https://www.youtube.com/watch?v=R2kovI6tpRE'); 

    // Send message into log channel
    client.channels.cache.get('833783384937070613').send(Member.displayName + ' has joined the server');

    // Send something into the logs
    console.log(timestamp() + " " + Member.displayName + " has joined the server."); 

});

// User leave block
client.on("guildMemberRemove", async Member => {

    // Check that the server is Firnando
    if (Member.guild.id != firnandoID) return;

    // Send message into log channel
    client.channels.cache.get('833783384937070613').send(Member.displayName + ' has left the server'); 

    // Send something into the logs
    console.log(timestamp() + " " + Member.displayName + " has left the server."); 

});


// Dynamic command handler
client.on('message', message => {

    // Check that the message is not from a bot
    if (message.author.bot) return;

    // If the message is a command, run the command handler
    if (message.content.startsWith(config.prefix)) {

        // Sanitize input
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        // Get senduserID
        var senduserName = message.author.username;

        // Check that the command requested exists
        if (!client.commands.has(command)) {
            message.channel.send("That command is not supported");
            return;
        }

        // Try to execute the command and report an error if it occurs
        try {
            client.commands.get(command).execute(message, args);
            console.log(timestamp() + ' A ' + command + ' command was run by ' + senduserName)
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!');
        }
    }

    // Otherwise assume that the message is just a normal message to be handled by the response handler

    // Reponse handler:

    // If the server does not have the response module, return
    if (!resMod.includes(message.guild.id)) return;

    //Sanitize Input
    const sanitized = message.content.replace(/[^\w\s]|_/g, "");

    //Convert message into array
    const words = sanitized.trim().split(/ +/g);

    //Convert array to lower case
    const lcwords = words.join('|').toLowerCase().split('|');

    // Check the lcwords array against the initTrig of each response file
    for (const cword of lcwords) {

        // Check if the current word is one of the trigger words
        if (client.responses.has(cword)) {

            // Set variable to hold whether additional triggers are present
            var allTrigs = true;

            // Check that each additional trigger word is also in the array
            for (const tword of client.responses.get(cword).trigs) {

                // If a trigger word is missing set allTrigs to false
                if (!lcwords.includes(tword)) allTrigs = false;

            }

            // If all trigger words for the current response are present, run the response
            if (allTrigs == true) {

                // If the response has a complex trigger, call that, otherwise do it in index
                if (typeof client.responses.get(cword).compTrig == "function") {
                    client.responses.get(cword).compTrig(message);
                    return;
                } else {

                    // Decide whether or not to respond
                    var random = Math.floor(Math.random() * (parseInt(client.responses.get(cword).chance, 10)));

                    // If random isn't the lowest possible value, return
                    if (random == 0) {

                        // Generate a new random number to decide which response to give
                        var random = Math.floor(Math.random() * (parseInt(client.responses.get(cword).responses.length, 10)));

                        // Select the response
                        var response = client.responses.get(cword).responses[random];

                        // Send the message
                        message.channel.send(response);

                        // Exit out so only one response is sent
                        return;

                    }
                }
            }
        }
    }
});

// Use login credentials
client.login(process.env.BOT_TOKEN);