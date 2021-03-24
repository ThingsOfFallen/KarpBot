const db = require('quick.db');
const master = require('../../configs/bot.json');
module.exports = {
    name: "db",
    category: "admin",
    run: async (client, message, args) => {
        if (message.author.id != master["dev-ids"]) return message.reply('**ERROR:** This is a developer only command!');
        let table = new db.table(`${args[0]}`);
        if (args[1] === 'delete') {
            table.delete(`${args[2]}`);
            message.channel.send('Completed!');
        } else if (args[1] === 'create') {
            table.set(`${args[2]}`, `${message.content.split(" ").slice(4).join(' ')}`);
            message.channel.send('Completed!');
        } else if (args[1] === 'output') {
            const data = table.get(`${args[2]}`)
            message.channel.send(data)
        }
    }
}