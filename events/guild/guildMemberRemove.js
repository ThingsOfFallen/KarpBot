const { MessageEmbed } = require('discord.js');
module.exports = async member => {
    const logschannel = member.guild.channels.cache.find(channel => channel.id === '772916033655799858');
    const memberchannel = member.guild.channels.cache.find(channel => channel.id === '759937850275528775');
    memberchannel.setName(`Members: ${member.guild.memberCount}`);
    var logsembed = new MessageEmbed()
        .setTitle('Member Removed')
        .setColor('ORANGE')
        .addFields(
            {name: 'Member:', value: `${member}`},
        )
        .setFooter('KarpBot Logging')
        .setTimestamp()
    logschannel.send(logsembed);
}