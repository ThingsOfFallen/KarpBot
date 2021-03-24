const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "help",
    category: "info",
    timeout: 15000,
    run: async (client, message, args) => {
        if (args[0] === 'commands') {
            message.channel.send('Commands')
        } else return message.channel.send('Coming soon.')
    }
}