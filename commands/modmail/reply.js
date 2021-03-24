const roles = require('../../configs/roles.json');
const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: "reply",
    category: "modmail",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === roles.trial_mod)) var supportUserRole = '(Trial-Moderator)';
        if (message.member.roles.cache.some(role => role.id === roles.moderator)) var supportUserRole = '(Moderator)';
        if (message.member.roles.cache.some(role => role.id === roles.head_mod)) var supportUserRole = '(Head-Moderator)';
        if (message.member.roles.cache.some(role => role.id === roles.developer)) var supportUserRole = '(Developer)';
        if (message.member.roles.cache.some(role => role.id === roles.admin)) var supportUserRole = '(Administrator)';
        if (message.member.roles.cache.some(role => role.id === roles.manager)) var supportUserRole = '(Manager)';
        if (message.member.roles.cache.some(role => role.id === roles.staff)) {
            let table = new db.table('tickets');
            let chid = message.channel.id;
            let data = table.get(`active${chid}`);
            if (!data) return message.reply('**ERROR:** Cannot verify that this is a ModMail thread!');
            let supportUser = message.guild.members.cache.get(data);
            let supportEmbed = new Discord.MessageEmbed().setColor('RANDOM').setAuthor(`${supportUserRole} ${message.author.tag}`, `${message.author.avatarURL()}`).setDescription(message.content.split(" ").slice(1).join(' ')).setFooter('KarpBot ModMail').setTimestamp();
            supportUser.send(supportEmbed);
            message.react('✅');
        } else message.reply('This is a staff only command!');
    }
}