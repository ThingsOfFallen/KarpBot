const roles = require('../../configs/roles.json');
const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: "areply",
    category: "modmail",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === roles.staff)) {
            let table = new db.table('tickets');
            let chid = message.channel.id;
            let data = table.get(`active${chid}`);
            let supportUser = message.guild.members.cache.get(data);
            let supportEmbed = new Discord.MessageEmbed().setColor('RANDOM').setAuthor(`Staff Team`).setDescription(message.content.split(" ").slice(1).join(' ')).setFooter('Karpclient ModMail').setTimestamp();
            supportUser.send(supportEmbed);
            message.react('✅');
        } else return message.reply(`This is a staff only command!`)
    }
}