const colors = require('colors')
module.exports = (client) => {
    setInterval(() => {
        client.user.setActivity("Astro Development", {type: 'PLAYING'});
    }, 15000);
    client.user.setStatus("online");
    console.log("[".grey.bold + "STARTUP".yellow.bold + "]".grey.bold + ' KarpBot sucessfully started!'.green);
}