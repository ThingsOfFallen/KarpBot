const roles = require('../../configs/roles.json');
const channels = require('../../configs/channels.json');
const Discord = require('discord.js');
const Zoro = require('zoro-api')
module.exports = {
    name: "triggered",
    category: "fun",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === `${roles.glizzy_gladiator}`)) {
            let triggereduser = message.mentions.users.first() || message.author;
            let triggeredavatar = triggereduser.displayAvatarURL({ size: 512 }).replace(".webp", ".png")
            let triggeredimg = await Zoro.triggered(triggeredavatar)
            let triggeredattachment = new Discord.MessageAttachment(triggeredimg, "triggered.gif");
            message.channel.send(triggeredattachment)
        } else message.reply('You need to be a Glizzy Gladiator or higher to use this command!')
    }
}