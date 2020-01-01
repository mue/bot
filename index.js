/**
 * @name mue-discord-bot
 * @description The general-purpose bot for the Mue Discord server.
 * @author eartharoid (Mue)
 * @license MIT
 */
const Discord = require("discord.js");
const client = new Discord.Client({
    autoReconnect: true,
    disableEveryone: true
});
const package = require("./package.json");
const config = require("./config.js");
const log = require("leeksLazyLogger");

log.init({
    name: "Mue"
});
log.info(`Mue v${package.version}`, 'magentaBright');
log.info("Starting up...");

client.on('ready', () => {
    log.success("Connected to Discord API")
    log.success(`Logged in as ${client.user.tag}`)
});

client.on('guildMemberAdd', (member) => {
    log.console(`${member.user.tag} has joined`)
    if (member.manageable) {
        member.addRole(member.addRole(member.guild.roles.find(r => r.name === config.autorole_name).id))
        .then(log.console(`Giving ${member.user.tag} the ${config.autorole_name} role`))
        .catch(log.error(`Couldn't give ${member.user.tag} the ${config.autorole_name} role - an error occured.`));
    }
});

client.login(config.token);
