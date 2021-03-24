const roles = require('../../configs/roles.json');
const GuildConfig = require('../../database/schemas/GuildConfig');
const timeout = new Set();
const db = require('quick.db');
const ms = require('ms');
const { MessageEmbed, MessageAttachment } = require('discord.js');
module.exports = async (client, message) => {
    const prefix = '!'
    if (message.channel.type === 'dm') {
        if (message.author.bot) return;
        const guild = client.guilds.cache.get('725420481192132631');
        const table = new db.table('tickets');
        let user = await table.get(`isBlocked${message.author.id}`);
        if (user === true || user === "true") return message.channel.send('You are blocked from KarpBot ModMail!');
        const active = table.get(`active${message.author.id}`);
        if (!active) {
            let supportUser = message.author;
            var channel = await guild.channels.create(`${supportUser.username}-${supportUser.discriminator}`, {
                type: 'text',
                parent: '769762200910823468',
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone,
                        deny: "VIEW_CHANNEL"
                    },
                    {
                        id: roles.staff,
                        allow: "VIEW_CHANNEL",
                    }
                ]
            })
            let openEmbed = new MessageEmbed().setColor('RANDOM').setTitle('Incoming ModMail!').setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`).setDescription(`${message.content}`).setFooter('KarpBot ModMail').setTimestamp();
            const supportChannel = client.channels.cache.get(channel.id);
            supportChannel.send(`<@&${roles.staff}>`);
            supportChannel.send(openEmbed);
            supportUser.send('Welcome to KarpBot ModMail! Your message has been delivered to the staff team! They will get back to you shortly.');
            table.set(`active${supportChannel.id}`, `${supportUser.id}`);
            table.set(`active${supportUser.id}`, `${supportChannel.id}`);
        } else if (active) {
            let ch = table.get(`active${message.author.id}`);
            message.react('✅');
            let supportUser = message.author;
            const supportChannel = client.channels.cache.get(ch);
            const supportEmbed = new MessageEmbed().setColor('RANDOM').setAuthor(`${supportUser.tag}`, `${supportUser.avatarURL()}`).setDescription(`${message.content}`).setFooter('KarpBot ModMail').setTimestamp();
            supportChannel.send(supportEmbed);
            if(message.attachments.size > 0) {
                let attachment = new MessageAttachment(message.attachments.first().url)
                supportChannel.send(attachment);
            }
        }
    }
    if (message.author.bot || !message.content.startsWith(prefix) || !message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    const command = client.commands.get(cmd);
    if (command) {
        if (command.timeout) {
            if (timeout.has(`${message.author.id}${command.name}`)) {
                return message.reply(`You can only use that command every ${ms(command.timeout)}!`);
            } else {
                timeout.add(`${message.author.id}`);
                setTimeout(() => {
                    timeout.delete(`${message.author.delete}${command.name}`)
                }, message.timeout)
            }
        }
        const table = new db.table('blacklist');
        const status = table.get(`${message.author.id}`);
        if (status === `{blacklist_status: true}`) return message.reply('**ERROR:** You are blacklisted!');
        command.run(client, message, args);
    }
}