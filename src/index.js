const { Collection, Client } = require('discord.js');
const fs = require('fs');
const client = new Client({ disableMentions: "everyone" });
const master = require('../configs/bot.json');
const mongoose = require('mongoose');

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('../commands/');
client.prefix = master.prefix;
client.queue = new Map();

["command"].forEach(handler => {
    require(`../handlers/${handler}`) (client);
});

client.once('ready', () => {
    require('../events/client/ready') (client);
});

client.on('message', async message => {
    require('../events/guild/message') (client, message);
    if (message.content.startsWith('!play')) return;
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    require('../events/guild/messageUpdate') (oldMessage, newMessage);
});

client.on('messageDelete', async message => {
    require('../events/guild/messageDelete') (message);
});

client.on('guildUpdate', async guild => {
    require('../events/guild/guildUpdate') (guild);
});

client.on('guildMemberAdd', async member => {
    require('../events/guild/guildMemberAdd') (member);
});

client.on('guildMemberRemove', async member => {
    require('../events/guild/guildMemberRemove') (member);
})

client.login(master.token);
