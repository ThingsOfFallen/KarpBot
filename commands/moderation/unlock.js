const Discord = require('discord.js');
const channels = require('../../configs/channels.json');
const roles = require('../../configs/roles.json');
module.exports = {
    name: "unlock",
    category: "moderation",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === `${roles.staff}`)) {
            const embed = new Discord.MessageEmbed().setColor('#ffe600').setTitle('KarpBot Moderation').setDescription('This channel is no longer in lockdown!').addFields({name: 'Moderator:', value: `${message.author}`});
            const logsembed = new Discord.MessageEmbed().setColor('#ffe600').setTitle('Channel Lockdown End').addFields({name: 'Channel:', value: `${message.channel}`},{name: 'Moderator:', value: `${message.author}`}).setTimestamp();
            const logschannel = message.guild.channels.cache.find(channel => channel.id === `${channels.modlogs}`);
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null});
            message.reply('Channel lockdown ended!')
            message.channel.send(embed)
            logschannel.send(logsembed)
        } else return message.reply('This is a staff only command!')
    }
}