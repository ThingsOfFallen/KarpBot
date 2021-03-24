const colors = require('colors');
const master = require('../../configs/bot.json');
const pm2 = require('pm2')
module.exports = {
    name: "restart",
    category: "admin",
    timeout: 0,
    run: async (client, message, args) => {
        if (message.author.id != master["dev-ids"]) return message.reply('**ERROR:** This is a developer only command!');
        const msg = message.channel.send('Connecting to PM2 Deamon...').then(msg => {
            const connection = pm2.connect(function(err) {if (err) {console.error(err);process.exit(2)}})
            msg.edit('Sending restart protocol...').then(msg => {
                msg.edit('Restart Complete!').then(() => {
                    pm2.restart('KarpBot', (err, proc) => {});
                    pm2.disconnect()
                    console.log("[".grey.bold + "ADMIN".red.bold + "] ".grey.bold + "[".grey.bold + "RESTART".blue.bold + "] ".grey.bold + `${message.author.tag} has restarted karpbot!`);
                });
            })
        })
    }
}