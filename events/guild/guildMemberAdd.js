const { MessageEmbed } = require('discord.js')
module.exports = async member => {
    const welcomechannel = member.guild.channels.cache.find(channel => channel.id === '759986729368551424');
    const logschannel = member.guild.channels.cache.find(channel => channel.id === '772916033655799858');
    const role = member.guild.roles.cache.find(role => role.id === '725421773499400343');
    const memberchannel = member.guild.channels.cache.find(channel => channel.id === '759937850275528775');
    memberchannel.setName(`Members: ${member.guild.memberCount}`);
    var welcomeembed = new MessageEmbed()
        .setColor('YELLOW')
        .addFields(
            {name: 'KarpBot Welcomer', value: `Welcome to KingKarp's Dungeon ${member} **__nyeheh__**`},
            {name: "Please enjoy your time in KingKarp's Dungeon!", value: `Don't forget to read <#725559519148507158>!`}
        )
        .setFooter('KarpBot Welcomer', "https://images-ext-1.discordapp.net/external/iub4IlmdQ14VGOkHgeyxL6IZmrFVAGVW3-c_3LXoEDo/%3Fsize%3D128/https/cdn.discordapp.com/avatars/756534705452613634/859c90f9183152e1f131d1ca60ddeaef.png")
        .setTimestamp()
    var logsembed = new MessageEmbed()
        .setTitle('Member Join')
        .setColor('GREEN')
        .addFields(
            {name: 'Member:', value: `${member}`},
        )
        .setFooter('KarpBot Logging')
        .setTimestamp()
    welcomechannel.send(`${member},`)
    welcomechannel.send(welcomeembed);
    member.roles.add(role)
    logschannel.send(logsembed);
}