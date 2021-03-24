const Discord = require('discord.js');
const roles = require('../../configs/roles.json');
const channels = require('../../configs/channels.json');
module.exports = {
    name: "say",
    categoty: "fun",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === `${roles.poop_consumer}`)) {
            message.delete();
            const user = message.author;
            const member = message.guild.member(user)
            const logschannel = member.guild.channels.cache.find(channel => channel.id == `${channels.karplogs}`)
            const responce = args.join(' ');
            if (args[0]) {
                const embed = new Discord.MessageEmbed().setColor('#40ff00').addFields({name: 'KarpBot Says:', value: `${responce}`})
                const logsembed = new Discord.MessageEmbed().setColor('#40ff00').setTitle('Say Command Executed').addFields({name: 'User', value: `${member}`},{name: 'Message:', value: `${responce}`})
                message.channel.send(embed);
                logschannel.send(logsembed);
            }
        } else message.reply('You need to be a Poop Consumer or higher to use this command!')
    }
}