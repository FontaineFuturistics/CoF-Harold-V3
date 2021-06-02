// Require prerequisites
require("dotenv").config();
const Discord = require("discord.js");
const fs = require('fs');
const config = require('./config.json');

// Instantiate the client
const client = new Discord.Client();

// Create a collection for all commands
client.commands = new Discord.Collection();

// Load commands into an array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Load commands into the collection
for (const file of commandFiles) {

    // Load the current command into a variable
    const command = require('./commands/' + file);

    // Put the command into the collection
    client.commands.set(command.name, command);

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
    client.channels.cache.get(firnandoBotCmd).send('I have awoken now at ' + timestamp()); // Send logon to Firnando
    client.channels.cache.get(yruuBotCmd).send('I have awoken now at ' + timestamp()); // Send logon to YRUU
    client.channels.cache.get(uuccBotCmd).send('I have awoken now at ' + timestamp()); // Send logon to UUCC

    // Set status
    client.user.setActivity(`god`); // Should pick a better status
   
});

// Dynamic command handler
client.on('message', message => {

    // Check that the message has the prefix and is not from a bot
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    // Sanitize input
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Get senduserID
    var senduserID = message.author.id;

    // Check that the command requested exists
    if (!client.commands.has(command)) {
        message.channel.send("That command is not supported");
        return;
    }

    // Try to execute the command and report an error if it occurs
    try {
        client.commands.get(command).execute(message, args);
        console.log(timestamp() + ' A ' + command +  ' command was run by ' + senduserID)
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }

});

// Use login credentials
client.login(process.env.BOT_TOKEN);