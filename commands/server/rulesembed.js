const { MessageEmbed } = require('discord.js');
const roles = require('../../configs/roles.json');
module.exports = {
    name: "rulesembed",
    category: "server",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.id === roles.admin) || message.member.roles.cache.some(role => role.id === roles.manager)) {
            let embed = new MessageEmbed()
            .setColor('#00C3FF')
            .setTitle("KingKarp's Dungeon Server Rules")
            .setDescription('These are the Server Rules, If you break them you will be punished!')
            .setURL('https://discord.kingkarps.com')
            .setThumbnail("https://images-ext-1.discordapp.net/external/Bxwe3TVhYny-GehWaIlc5F0xc_Xrs78KIob4Qe5E8ik/%3Fwidth%3D1527%26height%3D1315%26cropmode%3Dnone/https/qlz0qw.bn.files.1drv.com/y4m0ljFl22eu9RcwcT4Jyxn7iU8DTvSz7FXd2umv3rZyyTCCG9_DM-IhuaC-xvK7qXBn81pGdbiqW5RdJSkaPoi_H4gh1w4exGCYdS48uMD80-q45MMfz8QSCL4X83jbbKun3EXnHJdkRKB7Je9_EEyfbl2ZAeYQhanv2CXtv56N5jXlCEQf22x-fRLaxpSjj11nVOJuFZFNb55juZYNQ6Tjw?width=551&height=474")
            .addFields(
                {name: "(1) No hate speech/racism/sexist/toxic/homophobic behavior:", value: "This includes saying **ANYTHING** against another member to make them upset or hurt their feelings, This also includes saying any racial slurs or racist terms to another member or saying them about anyone, This also includes no homophobic behavior, This also includes no sexist behavior."},
                {name: "(2) There should be no NSFW or related content:", value: "This includes any sort of NSFW content or anything of an NSFW nature, This also includes any non-child-friendly content, You are allowed to swear... Refer to rule 1 for more info. Any violation of this rule will not be taken lightly!"},
                {name: "(3) No chat flood or spam:", value: "This includes saying 5+ messages at once, This also includes saying the same phrase or text multiple times, This also includes sending 5+ messages when no one else is chatting."},
                {name: "(4) Listening to the Staff Team:", value: "There will be situations where things get out of hand, whenever a staff team tells you to stop, or tell you something, you **HAVE** to follow it.  If you feel a warning/mute/kick/ban is unjust please contact that staff member for a better description of why you were punished. If you feel a staff member is not doing his/her job or abusing contact <@762931157498331157> or <@244783899194949632>."},
                {name: "(5) No Drama:", value: "If anyone decides to bring any sort of issues/problems, from another server, this will not be taken lightly, and will be punished, we want a toxic-free zone and should be taken to DMs."},
                {name: "(6) Keep all chats in their respected channels:", value: "Refer to <#742888398305361950> for more info. Failure to follow the channel list will result in a punishment!"},
                {name: "(7) Threats are NOT acceptable:", value: "This includes saying you will **DOX**/**DDOS** someone as a joke or being serious. This also includes any other type of threat whether you are joking or not."},
                {name: "(8) No personal information:", value: "This includes asking for personal information, releasing the personal information of yours, or releasing the personal information of others."},
                {name: "(9) No other languages then English are allowed:", value: "This includes using any other type of language than English."},
                {name: "(10) No impersonation:", value: "This includes changing your username/nickname to KingKarps or any of the Staff Members."},
                {name: "(11)  No advertising or self promotion:", value: "This includes sending any type of Self-Promotion, Invite links, Social Media links, or advertisements of any kind."},
                {name: "The Discord Guidelines and TOS apply at all times!", value: "Discord Guidelines: https://discord.com/new/guidelines\nDiscord TOS: https://discord.com/new/terms"}
                )
            .setFooter("© 2020: KingKarp's Dungeon | Updated: 31/10/2020")
            .setTimestamp()
            message.channel.send(embed)
        } else message.reply('This is an Admin only command!');
    }
}