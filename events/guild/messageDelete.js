const channels = require('../../configs/channels.json');
const Discord = require('discord.js');
module.exports = async (message) => {
    var channel = message.guild.channels.cache.find(channel => channel.id === channels.chatlogs);
    const embed = new Discord.MessageEmbed().setColor('YELLOW').setTitle('Message Deleted').addFields({name: 'Author:', value: `${message.author}`},{name: 'Message:', value: `${message}`},{name: `Channel:`, value: `${message.channel}`}).setFooter('KarpBot Logging').setTimestamp();
    channel.send(embed)
}