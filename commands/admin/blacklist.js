const db = require('quick.db');
const master = require('../../configs/bot.json');
module.exports = {
    name: "blacklist",
    category: "admin",
    run: async (client, message, args) => {
        if (message.author.id != master["dev-ids"]) return message.reply('**ERROR:** This is a developer only command!');
        const table = new db.table('blacklist')
        if (!args[0]) return message.reply('Please specify a server!');
        if (args[1] === 'true') {
            table.set(`${args[0]}`, `{blacklist_status: true}`);
            message.reply(`Blacklist updated to: **true** in: ${client.ws.ping}ms!`);
            console.log("[".grey.bold + "BLACKLIST".red.bold + "] ".grey.bold + `${message.author.tag} updated the blacklist status for ${args[0]} to: true`);
        } else if (args[1] === 'false') {
                table.set(`${args[0]}`, `{blacklist_status: false}`);
                message.reply(`Blacklist updated to: **false** in: ${client.ws.ping}ms!`);
                console.log("[".grey.bold + "BLACKLIST".red.bold + "] ".grey.bold + `${message.author.tag} updated the blacklist status for ${args[0]} to: false`);
        } else message.channel.send(`Blacklist status for: ${args[0]} is: ${table.get(`${args[0]}`)}`);
    }
}