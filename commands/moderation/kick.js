const Discord = require('discord.js');
const channels = require('../../configs/channels.json');
module.exports = {
    name: "kick",
    category: "moderation",
    run: async (client, message, args) => {
        if (message.member.hasPermission('KICK_MEMBERS')) {
            const reason = message.content.split(" ").slice(2).join(' ');
            const user = message.mentions.users.first();
            if(!reason) return message.reply('Please provide a reason!')
            const embed = new Discord.MessageEmbed().setColor('ff0000').setTitle("KarpBot Moderation").setDescription("You have been kicked from KingKarp's Dungeon!").addFields({name: 'Reason:', value: `${reason}`},{name: 'Moderator:', value: `${message.author.tag}`}).setFooter("© 2020: KingKarp's Dungeon", 'https://cdn.discordapp.com/avatars/756534705452613634/859c90f9183152e1f131d1ca60ddeaef.png?size=128').setTimestamp();
            if (user) {
                const member = message.guild.member(user)
                if (member.hasPermission('KICK_MEMBERS')) return message.reply('This user is a Staff member I cannot do that!')
                if (member) {
                    member.send(embed).then(() => {
                        member.kick(reason).then(() => {
                            message.channel.send(`✅ Successfully kicked ${user.tag} with reason: ${reason}`)
                            const logsembed = new Discord.MessageEmbed().setColor('#ff0000').setTitle('Member Kicked').addFields({name: 'User:', value: `${member}`},{name: 'Moderator:', value: `${message.author}`},{name: 'Reason:', value: `${reason}`}).setTimestamp().setFooter('KarpBot Moderation');
                            const logschannel = message.guild.channels.cache.find(channel => channel.id === `${channels.modlogs}`)
                            logschannel.send(logsembed)
                        }).catch(err => {
                            message.reply(':x: Something went wrong! Please try again later.')
                            console.log(err)
                        });
                    });
                } else message.reply('Cannot find that user!');
            } else message.reply('Please specify a user!');
        } else message.reply('This is a staff only command!')
    }
}