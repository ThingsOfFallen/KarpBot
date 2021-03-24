const {MessageEmbed, ReactionEmoji} = require('discord.js');
const master = require('../../configs/bot.json');
const roles = require('../../configs/roles.json');
module.exports = {
    name: "role",
    category: "admin",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === `${roles.admin}`) || message.member.roles.cache.some(role => role.id === `${roles.developer}`) || message.member.roles.cache.some(role => role.id === `${roles.manager}`)) {
            if (args[0] === 'create') {
                let rName = message.content.split(`${client.prefix}role create `).join("");
                let rColor;
                args.forEach(arg => {
                    if (arg.startsWith('#')) {
                        rColor=arg;
                    }
                })
                if (!rName) return message.reply('Please supply a role name!');
                if (!rColor) return message.reply('Please supply a role color!');
                if (rColor>=16777215) return message.reply('Invalid Hex Code');
                rName=rName.replace(`${rColor}`, ``);
                let rNew = await message.guild.roles.create({
                    data: {
                        name: rName,
                        color: rColor
                    }
                })
                message.channel.send(`Sucessfully created role! ID: ${rNew.id}`)
            } else if (args[0] === 'delete') {
                const admin = message.author;
                let roleDelete = message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(role => role.name === args[1]) || message.mentions.roles.first();
                if (!roleDelete) return message.reply('Please spectify a role!');
                message.channel.send(`Are you sure you want to delete role with id: **${roleDelete.id}**?`).then(message => {
                    message.react('✅')
                    message.react('❌')
                    message.awaitReactions((reaction, user) => user.id == admin && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
                    {max: 1, time: 30000 }).then(collected => {
                        if (collected.first().emoji.name == '✅') {
                                roleDelete.delete().then(a => {
                                    message.reactions.removeAll()
                                    message.edit(`Role with id: **${roleDelete.id}** was deleted!`)
                                })
                        } else message.channel.send('Operation canceled.');
                }).catch(() => {
                        message.reply('No reaction after 30 seconds, operation canceled');
                });
    
                })
            }
        } else message.reply('This is an admin only command!')
    } 
}