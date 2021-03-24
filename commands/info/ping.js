const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "ping",
    category: "info",
    timeout: 5000,
    run: async (client, message, args) => {
        const msg = message.channel.send('Pinging...').then(msg => {
            const embed = new MessageEmbed().setTitle('Status:').addField('Latency:', `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`).addField('API Latency:', `${Math.round(client.ws.ping)}ms`)
            msg.edit(embed);
        })
    }
}