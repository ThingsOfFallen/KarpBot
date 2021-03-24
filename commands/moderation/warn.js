const channels = require('../../configs/channels.json');
const roles = require('../../configs/roles.json');
const Discord = require('discord.js');
const warns = require('../../sources/warns.js');
module.exports = {
    name: "warn",
    category: "moderation",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === roles.staff)) {
            let user = message.mentions.users.first();
            if (!user) return message.reply('Please specify a user!');
            if (!args.slice(1).join(" ")) return message.reply("Please provide a reason!");
            warns.findOne({ Guild: message.guild.id, User: user.id }, async (err, data) => {
                if (err) console.log(err);
                if (!data) {
                    let newWarns = new warns({
                        User: user.id,
                        Guild: message.guild.id,
                        Warns:[
                            {
                                Moderator: message.author.id,
                                Reason: args.slice(1).join(" ")
                            }
                        ]
                    })
                    newWarns.save();
                    message.channel.send(`✅ Successfully warned ${user.tag} with reason: ${args.slice(1).join(" ")}`);
                    const embed = new Discord.MessageEmbed().setColor('RED').setTitle('KarpBot Moderation').setDescription("You have been warned in KingKarp's Dungeon!").addFields({name: 'Reason:', value: `${args.slice(1).join(" ")}`},{name: 'Moderator:', value: `${message.author.tag}`});
                    user.send(embed)
                } else {
                    data.Warns.unshift({
                        Moderator: message.author.id,
                        Reason: args.slice(1).join(" ")
                    })
                    data.save()
                    message.channel.send(`✅ Successfully warned ${user.tag} with reason: ${args.slice(1).join(" ")}`);
                    const embed = new Discord.MessageEmbed().setColor('RED').setTitle('KarpBot Moderation').setDescription("You have been warned in KingKarp's Dungeon!").addFields({name: 'Reason:', value: `${args.slice(1).join(" ")}`},{name: 'Moderator:', value: `${message.author.tag}`});
                    user.send(embed)
                }
            })
        } else message.reply('This is a staff only command!');
    }
}