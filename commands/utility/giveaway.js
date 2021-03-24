const {MessageEmbed, CategoryChannel} = require('discord.js');
const ms = require('ms');
const roles = require('../../configs/roles.json');
module.exports = {
    name: "giveaway",
    category: "utility",
    run: async (client, message, args) => {
        if (!message.member.roles.cache.some(role => role.id === roles.staff)) return message.reply('This is a staff only command!')
        let time = args[0];
        if (!time) return message.reply('Please provide a time!');
        let prize = message.content.split(`${time}`).join("").split(`${client.prefix}giveaway `).join("");
        if (!prize) return message.reply('Please provide a prize!');
        const embed = new MessageEmbed().setTitle('New Giveaway!').setColor('RANDOM').setDescription(prize).addField('Duration:', `${ms(ms(time), { long: true })}`).setFooter(`Giveaway By: ${message.author.tag} • Karpclient Utility`, `${message.author.avatarURL()}`).setTimestamp();
        let msg = await message.channel.send(embed);
        await msg.react('🎉');
        setTimeout(() => {
            let winner = msg.reactions.cache.get('🎉').users.cache.random().id;
            message.channel.send(`<@${winner}> has won${prize}!`)
        }, ms(time));
        if (args[0] === 'reroll') {
            let reroll_winner = msg.reactions.cache.get('🎉').users.cache.random().id;
            message.channel.send(`<@${reroll_winner}> has won${prize}!`)
        }

        
    }
};