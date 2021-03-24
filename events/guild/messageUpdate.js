const channels = require('../../configs/channels.json');
const Discord = require('discord.js');
module.exports = async (oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) return;
    var channel = oldMessage.guild.channels.cache.find(channel => channel.id === channels.chatlogs);
    const embed = new Discord.MessageEmbed().setColor('YELLOW').setTitle('Message Updated').addFields({name: 'Author:', value: `${oldMessage.author}`},{name: 'Old Message:', value: `${oldMessage.content}`},{name: 'New Message:', value: `${newMessage.content}`},{name: `Channel:`, value: `${oldMessage.channel}`}).setFooter('KarpBot Logging').setTimestamp();
    channel.send(embed)
}