const Discord = require('discord.js');
module.exports = {
    name: "info",
    category: "info",
    run: async (client, message, args) => {
        const guild = message.guild
        const embed = new Discord.MessageEmbed().setColor('RANDOM').setTitle("KingKarp's Dungeon Information:").addFields({name: 'Member Count:', value: `${guild.memberCount}`},{name: 'Owner:', value: `${guild.owner}`},{name: 'Reigon:', value: `${guild.region}`},{name: 'Default Notifications:', value: `${guild.defaultMessageNotifications}`},{name: 'Features:', value: `${guild.features}`},{name: 'Tier:', value: `${guild.premiumTier}`},{name: `Boost Count:`, value: `${guild.premiumSubscriptionCount}`});
        message.channel.send(embed)
    }
}