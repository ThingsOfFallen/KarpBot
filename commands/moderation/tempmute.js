const channels = require('../../configs/channels.json');
const roles = require('../../configs/roles.json');
const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
    name: "tempmute",
    category: "moderation",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === `${roles.staff}`)) {
            const muterole = message.guild.roles.cache.find(role => role.id === `${roles.muterole}`)
            const user = message.mentions.users.first()
            const reason = message.content.split(" ").slice(3).join(' ');
            if (!reason) return message.reply('Please provide a reason!')
            if (user) {
                const member = message.guild.member(user)
                if (member) {
                    if (member.roles.cache.some(role => role.id === `${roles.muterole}`)) return message.reply('Member is already muted!')
                    let time = args[1];
                    const embed = new Discord.MessageEmbed().setColor('ff0000').setTitle("KarpBot Moderation").setDescription("You have been temp-muted in KingKarp's Dungeon!").addFields({name: 'Reason:', value: `${reason}`},{name: 'Moderator:', value: `${message.author.tag}`},{name: 'Time:', value: `${ms(ms(time), {long: true})}`}).setFooter("© 2020: KingKarp's Dungeon", 'https://cdn.discordapp.com/avatars/756534705452613634/859c90f9183152e1f131d1ca60ddeaef.png?size=128').setTimestamp();
                    if(!time) return message.reply('Please specify a time!');
                    member.send(embed).then(() => {
                        member.roles.add(muterole).then(() => {
                            message.channel.send(`🔈 Successfully muted ${user.tag} for: ${ms(ms(time), {long: true})} with reason: ${reason}`);
                            const logsembed = new Discord.MessageEmbed().setColor('#fffb00').setTitle('Member Temp-Muted').addFields({name: 'User:', value: `${member}`},{name: 'Moderator:', value: `${message.author}`},{name: 'Reason:', value: `${reason}`},{name: 'Time:', value: `${ms(ms(time), {long: true})}`}).setTimestamp()
                            const logschannel = message.guild.channels.cache.find(channel => channel.id === `${channels.modlogs}`);
                            logschannel.send(logsembed)
                        }).catch(err => {
                            message.reply(':x: Something went wrong! Please try again later.');
                            console.log(err);
                        });
                        setTimeout(function() {
                            member.roles.remove(muterole);
                        }, ms(time));
                    });
                } else message.reply('Cannot find that user!');
            } else message.reply('Please specify a user!');
        } else message.reply('This is a staff only command!');
    }
}