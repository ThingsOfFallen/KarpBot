const Discord = require('discord.js');
const warns = require('../../sources/warns.js');
module.exports = {
    name: "warns",
    category: "moderation",
    run: async (client, message, args) => {
        let user = message.mentions.users.first();
        if (!user) return message.reply('Please specify a user!');
        warns.find({ Guild: message.guild.id, User: user.id }, async (err, data) => {
            if (err) console.log(err);
            if(!data.length) return message.channel.send(`${user.tag} has no warnings!`);
            let embed = new Discord.MessageEmbed().setTitle(`${user.tag}'s Warnings`).setDescription(data.map(d => {
                return d.Warns.map((w,i) => `${i} - Moderator: ${message.guild.members.cache.get(w.Moderator).user.tag} Reason: ${w.Reason}`).join('\n')
            }))
            message.channel.send(embed);
        })
    }
}