const Discord = require('discord.js');
const channels = require('../../configs/channels.json');
const roles = require('../../configs/roles.json');
module.exports = {
    name: "lock",
    category: "moderation",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === `${roles.moderator}`) || message.member.roles.cache.some(role => role.id === `${roles.head_mod}`) || message.member.roles.cache.some(role => role.id === `${roles.admin}`) || message.member.roles.cache.some(role => role.id === `${roles.developer}`) || message.member.roles.cache.some(role => role.id === `${roles.manager}`)) {
            const reason = message.content.split(" ").slice(1).join(' ');
            if(!reason) return message.reply('Please provide a reason!');
            const embed = new Discord.MessageEmbed().setColor('#ffe600').setTitle('KarpBot Moderation').setDescription('This channel is now in lockdown!').addFields({name: 'Reason:', value: `${reason}`},{name: 'Moderator:', value: `${message.author}`});
            const logsembed = new Discord.MessageEmbed().setColor('#ffe600').setTitle('Channel Lockdown Started').addFields({name: 'Channel:', value: `${message.channel}`},{name: 'Moderator:', value: `${message.author}`},{name: 'Reason:', value: `${reason}`}).setTimestamp();
            const logschannel = message.guild.channels.cache.find(channel => channel.id === `${channels.modlogs}`);
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
            message.reply('Channel lockdown started!')
            message.channel.send(embed)
            logschannel.send(logsembed)
        }
    }
}