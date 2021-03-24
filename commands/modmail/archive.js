const db = require('quick.db');
const roles = require('../../configs/roles.json');
module.exports = {
    name: "archive",
    category: "modmail",
    run: async (client, message, args) => {
        let table = new db.table('tickets');
        const channel = table.get(`active${message.channel.id}`);
        if (!channel) return message.reply('**ERROR:** Cannot verify that this is a ModMail thread!');
        const user = table.get(`active${channel}`);
        const supportUser = message.guild.members.cache.get(channel)
        supportUser.send(`Your ModMail thread was archived by: ${message.author.tag}`);
        const fetchedChannel = message.guild.channels.cache.get(user);
        fetchedChannel.setParent('771887541300363295');
        table.delete(`active${message.channel.id}`);
        table.delete(`active${channel}`);
        fetchedChannel.send('This ModMail thread has been archived!');
    }
}