const { MessageEmbed } = require('discord.js');
const roles = require('../../configs/roles.json');
module.exports = {
    name: "channellistenbed",
    category: "server",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === roles.admin) || message.member.roles.cache.some(role => role.id === roles.manager)) {
            let embed = new MessageEmbed()
            .setColor('#FFFF00')
            .setTitle('Channel List')
            .setDescription('Here all the channels of the server are listed and there appropriate uses are listed!')
            .addFields(
                {name: "General", value: "For general chatting, No commands allowed!"},
                {name: "Commands", value: "For all types of commands!"},
                {name: "Media", value: "For all types of images or gifs"},
                {name: "Dank Member or Dank Memer 2", value: "For any <@270904126974590976> commands!"},
                {name: "Yggdrasil", value: "For any <@247283454440374274> commands!"},
                {name: "OwO", value: "For any <@408785106942164992> commands!"},
                {name: "Game Chat", value: "For talking about games!"},
                {name: "TikTok's", value: "For posting TikTok's!"},
                {name: "TikTok Suggesions", value: "For putting TikTok ideas!"}
            )
            .setFooter("© 2020: KingKarp's Dungeon | Updated: 31/10/2020")
            .setTimestamp()
            message.channel.send(embed);
        }
    }
}