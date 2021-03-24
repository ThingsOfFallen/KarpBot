const channels = require('../../configs/channels.json');
const roles = require('../../configs/roles.json');
const Discord = require('discord.js');
module.exports = {
    name: "psay",
    category: "fun",
    run: async (client, message, args) => {
    message.delete();
    if (message.member.roles.cache.some(role => role.id === `${roles.glizzy_gladiator}`)) {
        const user = message.author;
        const member = message.guild.member(user);
        const logschannel = member.guild.channels.cache.find(channel => channel.id === `${channels.karplogs}`);
        const responce = args.join(' ');
        if (args[0]) {
            const logsembed = new Discord.MessageEmbed().setColor('#00fff2').setTitle('Plain-Say Command Executed').addFields({name: 'User:', value: `${member}`},{name: 'Message:', value: `${responce}`});
            message.channel.send(`${responce}`);
            logschannel.send(logsembed);
        }
    } else message.reply('You need to be a Glizzy Gladiator or higher to use this command!');
    }
}