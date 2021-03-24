const Discord = require('discord.js');
const channels = require('../../configs/channels.json');
const roles = require('../../configs/roles.json');
module.exports = {
    name: "lockdown",
    category: "moderation",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === `${roles.head_mod}`) || message.member.roles.cache.some(role => role.id === `${roles.admin}`) || message.member.roles.cache.some(role => role.id === `${roles.developer}`) || message.member.roles.cache.some(role => role.id === `${roles.manager}`)) {
            const general = message.guild.channels.cache.find(channel => channel.id === `${channels.general}`)
            const commands = message.guild.channels.cache.find(channel => channel.id === `${channels.commands}`)
            const media = message.guild.channels.cache.find(channel => channel.id === `${channels.media}`)
            const drip_kids_chat = message.guild.channels.cache.find(channel => channel.id === `${channels.only_drip_kids}`)
            const dank_memer = message.guild.channels.cache.find(channel => channel.id === `${channels.dank_memer}`)
            const dank_memer_2 = message.guild.channels.cache.find(channel => channel.id === `${channels.dank_memer_2}`)
            const yggdrasil = message.guild.channels.cache.find(channel => channel.id === `${channels.yggdrasil}`)
            const owo = message.guild.channels.cache.find(channel => channel.id === `${channels.owo}`)
            const game_chat = message.guild.channels.cache.find(channel => channel.id === `${channels.game_chat}`)
            const tiktok = message.guild.channels.cache.find(channel => channel.id === `${channels.tiktoks}`)
            const tiktok_suggestions = message.guild.channels.cache.find(channel => channel.id === `${channels.tiktok_suggestions}`)
            const og_general = message.guild.channels.cache.find(channel => channel.id === `${channels.og_general}`)
            const og_commands = message.guild.channels.cache.find(channel => channel.id === `${channels.og_commands}`)
            if (args[0] === 'start') {
                const reason = message.content.split(" ").slice(2).join(' ');
                if (!reason) return message.reply('Please specify a reason!')
                general.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                commands.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                media.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                drip_kids_chat.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                dank_memer.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                dank_memer_2.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                yggdrasil.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                owo.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                game_chat.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                tiktok.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                tiktok_suggestions.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                og_general.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                og_commands.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
                message.reply('Lockdown Started')
                const embed = new Discord.MessageEmbed().setColor('#ff0000').setTitle('KarpBot Moderation').setDescription("KingKarp's Dungeon is now in Lockdown!").addFields({name: 'Moderator:', value: `${message.author}`},{name: 'Reason:', value: `${reason}`});
                const logsembed = new Discord.MessageEmbed().setColor('#ff0000').setTitle('Server Lockdown Started').addFields({name: 'Moderator:', value: `${message.author}`},{name: 'Reason:', value: `${reason}`}).setTimestamp();
                const logschannel = message.guild.channels.cache.find(channel => channel.id === `${channels.modlogs}`)
                message.channel.send(embed);
                logschannel.send(logsembed);
            } else if (args[0] === 'end') {
                general.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                commands.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                media.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                drip_kids_chat.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                dank_memer.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                dank_memer_2.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                yggdrasil.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                owo.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                game_chat.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                tiktok.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                tiktok_suggestions.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                og_general.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                og_commands.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
                message.reply('Lockdown Ended')
                const embed = new Discord.MessageEmbed().setColor('#ff0000').setTitle('KarpBot Moderation').setDescription("KingKarp's Dungeon is no longer in Lockdown!").addFields({name: 'Moderator:', value: `${message.author}`});
                const logsembed = new Discord.MessageEmbed().setColor('#ff0000').setTitle('Server Lockdown Ended').addFields({name: 'Moderator:', value: `${message.author}`}).setTimestamp();
                const logschannel = message.guild.channels.cache.find(channel => channel.id === `${channels.modlogs}`)
                message.channel.send(embed);
                logschannel.send(logsembed);
            } else message.reply('Please specify start or end!')
        }
    }
}