module.exports = {

	// command name
	name: 'serverinfo',

	// command description
	usage: 'Gets info on a server',

	// The commands module (admin, firnando, default)
	module: "default",

	// sends server name and total member count
	execute(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);

		return;
	},
};