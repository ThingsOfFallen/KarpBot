const mongoose = require('mongoose');

const GuildConfigSchema = new mongoose.Schema({
    guildID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: '!',
    },
})

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);
