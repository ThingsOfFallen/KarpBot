const { MessageEmbed } = require('discord.js');
const roles = require('../../configs/roles.json');
module.exports = {
    name: "poll",
    category: "utility",
    run: async (client, message, args) => {
        if (!message.member.roles.cache.some(role => role.id === roles.staff)) return message.reply('This is a staff only command!')
        let question = message.content.slice(client.prefix.length+5);
        if (!question) return message.reply('Please specify a question for your poll!')
        const embed = new MessageEmbed().setTitle('New Poll!').setColor('RANDOM').setDescription(question).setFooter(`Poll By: ${message.author.tag} • Karpclient Utility`, `${message.author.avatarURL()}`).setTimestamp();
        let msg = await message.channel.send(embed);
        await msg.react('👍');
        await msg.react('👎');
    }
}