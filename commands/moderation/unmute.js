const channels = require('../../configs/channels.json');
const roles = require('../../configs/roles.json');
const Discord = require('discord.js');
module.exports = {
    name: "unmute",
    category: "moderation",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === `${roles.staff}`)) {
            const muterole = message.guild.roles.cache.find(role => role.id === `${roles.muterole}`)
            const user = message.mentions.users.first()
            const reason = message.content.split(" ").slice(2).join(' ');
            if (!reason) return message.reply('Please provide a reason!')
            if (user) {
                const member = message.guild.member(user)
                if (member) {
                    if (!member.roles.cache.some(role => role.id === `${roles.muterole}`)) return message.reply('Member is not muted!')
                    const embed = new Discord.MessageEmbed().setColor('ff0000').setTitle("KarpBot Moderation").setDescription("You have been un-muted in KingKarp's Dungeon!").addFields({name: 'Reason:', value: `${reason}`},{name: 'Moderator:', value: `${message.author.tag}`}).setFooter("© 2020: KingKarp's Dungeon", 'https://cdn.discordapp.com/avatars/756534705452613634/859c90f9183152e1f131d1ca60ddeaef.png?size=128').setTimestamp();
                    member.send(embed).then(() => {
                        member.roles.remove(muterole).then(() => {
                            message.channel.send(`🔊 Successfully un-muted ${user.tag} with reason: ${reason}`);
                            const logsembed = new Discord.MessageEmbed().setColor('#fffb00').setTitle('Member Un-Muted').addFields({name: 'User:', value: `${member}`},{name: 'Moderator:', value: `${message.author}`},{name: 'Reason:', value: `${reason}`}).setTimestamp().setFooter('KarpBot Moderation')
                            const logschannel = message.guild.channels.cache.find(channel => channel.id === `${channels.modlogs}`);
                            logschannel.send(logsembed);
                        }).catch(err => {
                            message.reply(':x: Something went wrong! Please try again later.');
                            console.log(err);
                        });
                    });
                } else message.reply('Cannot find that user!');
            } else message.reply('Please provide a user!');
        } else message.reply('This is a staff only command!');
    }
}