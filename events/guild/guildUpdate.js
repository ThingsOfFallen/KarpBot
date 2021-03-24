const GuildConfig = require('../../database/schemas/GuildConfig');
module.exports = async guild => {
    const guildConfig = await GuildConfig.create({
        guildID: guild.id,
    });
}