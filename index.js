// Require prerequisites
require("dotenv").config();
const Discord = require("discord.js");
const fs = require('fs');
const config = require('./config.json');
const modules = require('./resources/Modules.json');

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
const resMod = modules.response;

// Load an array of all default emoji's for Harold
const defEmojis = require('./resources/DefaultEmojis.json');

// Load array of banned channels
const bannedChannels = config.bannedChannels;

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

    // Find the muted role
    let role = Member.guild.roles.cache.find(role => role.name === "Harold Access");

    // Apply the role
    Member.roles.add(role);

    // Send message into log channel
    client.channels.cache.get('833783384937070613').send(Member.user.tag + ' has joined the server');

    // Send something into the logs
    console.log(timestamp() + " " + Member.user.tag + " has joined the server."); 

});

// User leave block
client.on("guildMemberRemove", async Member => {

    // Check that the server is Firnando
    if (Member.guild.id != firnandoID) return;

    // Send message into log channel
    client.channels.cache.get('833783384937070613').send(Member.user.tag + ' has left the server'); 

    // Get the user's list of roles
    let roleList = []

    // Add all roles to the rolelist
    roleList.push(Member.roles.cache.map(cRole => cRole.toString()));

    // Make a string of all the roles
    let roleString = roleList.join(",").replace(/,/g, "\n");

    // Send the role list into the log channel
    client.channels.cache.get('833783384937070613').send('Their roles were:\n' + roleString); 

    // Send something into the logs
    console.log(timestamp() + " " + Member.user.tag + " has left the server."); 

});

// Dynamic command handler
client.on('message', message => {

    // Check that the message is not from a bot
    if (message.author.bot) return;

    // Check if the channel is a banned channel
    if (bannedChannels.includes(message.channel.id)) return;

    // If the channel is a DM channel, exit out
    try {

        // Try to get the guild id, if this fails it means the channel is a DM channel
        let temp = message.guild.id;

    } catch (error) {

        // If it failed, return so this runs ends
        return;

    }

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

            // Check if the module is default
            if (!(client.commands.get(command).module === "default")) {

                // Check that the module the command is in is active in the server in question
                if (!modules[client.commands.get(command).module].includes(message.guild.id)) {

                    // Send an error
                    message.reply("That module is not active in this server");

                    // Log it
                    console.log(timestamp() + ' A ' + command + ' command was invoked in a server without its module by ' + senduserName)

                    // Return
                    return;

                }
            }

            // Run the command
            client.commands.get(command).execute(message, args);

            // Log it
            console.log(timestamp() + ' A ' + command + ' command was run by ' + senduserName)

            // Return
            return;

        } catch (error) {

            // Log the error
            console.error(error);

            // Inform the user of the error
            message.reply('There was an error trying to execute that command!');

            // Return
            return;

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

                    // Trigger the complex message function
                    client.responses.get(cword).compTrig(message);

                    // Return
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

    // If execution has gotten to this point, the message was neither a command, nor a message harold will rspond to, and as such he may respond

    // Reaction manager:

    // Decide whether or not to react
    var random = Math.floor(Math.random() * 15);

    // If random is 0, react
    if (random == 0) {

        // Decide whether or not to use the default emoji selection or the guild specific emoji selection
        var random = Math.floor(Math.random() * 2);

        // If random is 0 use default emojis
        if (random == 0) {

            // Decide which emoji to use
            var random = Math.floor(Math.random() * (parseInt(defEmojis.length, 10)));

            // React to the message
            message.react(defEmojis[random]);

            // Return
            return;

        // Otherwise use guild specific emojis
        } else {

            // Get the emoji manager
            var cGuild = message.guild.emojis.cache;

            // Create an array to hold the emojis
            var eArray = [];

            // Load all emojis into an array
            eArray.push(cGuild.map(GuildEmoji => GuildEmoji.identifier));

            // Split the array along commas
            eArray = eArray.toString().split(',');

            // If there are no emojis, fail out
            if (!eArray[0]) return;

            // Now that the array is loaded, decide which array index to send
            var random = Math.floor(Math.random() * (parseInt(eArray.length, 10)));

            // React to the message
            message.react(eArray[random].toString())

        }
    }
});

// Use login credentials
client.login(process.env.BOT_TOKEN);