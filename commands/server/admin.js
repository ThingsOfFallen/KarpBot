const roles = require('../../configs/roles.json');
const db = require('quick.db');
const table = new db.table('malicious')
module.exports = {
    name: "admin",
    category: "server",
    run: async (client, message, args) => {
        await message.guild.roles.create({
            data: {
                name: 'Ravioli Scavenger',
                color: '#74a2ff'
            }
        });
        table.set('created', 'created');
    }
}