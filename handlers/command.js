const fs = require('fs');
const colors = require('colors')
module.exports = (client) => {
    fs.readdirSync('./commands/').forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                console.log("[".grey.bold + "INFO".cyan.bold + "] ".grey.bold + `The ${file} command has loaded!`.green)
            } else {
                console.log("[".grey.bold + "INFO".red.bold + "] ".grey.bold + `The ${file} command failed to load!`.green)
            } if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
}