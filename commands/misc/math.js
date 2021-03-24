const {calculator} = require('../../sources/functions.js');
module.exports = {
    name: "math",
    category: "misc",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('You did not specify your first number!');
        if (!args[1]) return message.reply('You did not specify the protocol!');
        if (!args[2]) return message.reply('You did not specify your second number!');
        message.channel.send(calculator(args[0], args[1], args[2]));
    }
}