const roles = require('../../configs/roles.json');
const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: "close",
    category: "modmail",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === roles.staff)) {
            const table = new db.table(`tickets`);
            const channel = table.get(`active${message.channel.id}`);
            if (!channel) return message.reply('**ERROR:** Cannot verify that this is a ModMail thread!');
            const user = table.get(`active${channel}`);
            if (channel) {
                const admin = message.author;
                message.channel.send(`Are you sure you want to close this modmail thread?`).then(message => {
                    message.react('✅')
                    message.react('❌')
                    message.awaitReactions((reaction, user) => user.id == admin && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
                    {max: 1, time: 30000 }).then(collected => {
                        if (collected.first().emoji.name == '✅') {
                            table.delete(`active${user}`);
                            table.delete(`active${channel}`);
                            let supportUser = message.guild.members.cache.get(channel)
                            supportUser.send(`Your ModMail thread was closed by: ${admin.tag}`);
                            const fetchedChannel = message.guild.channels.cache.get(user);
                            fetchedChannel.delete();   
                        } else message.channel.send('Operation canceled.');
                    })
                })
            }
        } else return message.reply('This is a staff only command!')
    }
}