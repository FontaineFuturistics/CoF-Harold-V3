module.exports = {

    // The command name
    name: "StandardSchedule",

    // The command description when the help command is run
    usage: "sends a schedule of events relevent to standard users of the server",

    // The code of the command
    execute(message, args) {
        // The content of the command
        let serverID = message.guild.id;
        let firnandoID = 642203556312776714;
        let yruuID = 827570784930365480;
        let uuccID = 773618438135873558;
        if (serverID === firnandoID) { 
        message.channel.send(
            "**Sunday**: \n" +
            "**Monday**:\n" +
            "**Tuesday**: Discussion night at 8:00 pm EST\n" +
            "**Wednesday**: Council meeting at 5:00 pm EST\n" +
            "**Thursday**:\n" +
            "**Friday**: Weekly Games night or monthly movie night at 8:00pm EST\n" +
            "**Saturday**: Monthly Minecraft event");
            return
        }
        
        else if (serverID === yruuID) {
        message.channel.send
        ('**Sunday**: Biweekly YRUU meeting');
        return
        }

        else message.channel.send('No schedule exists for this server');
        return

    },

}