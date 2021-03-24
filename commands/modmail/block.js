const roles = require('../../configs/roles.json');
const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: "block",
    category: "modmail",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === roles.staff)) {
            let table = new db.table('tickets');
            let user = table.get(`active${message.channel.id}`);
            table.set(`isBlocked${user}`, `true`);
            message.channel.send('Blocked current user from ModMail system!');
        } else return message.reply('This is a staff only command!');
    }
}