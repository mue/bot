/**
 * @name mue-discord-bot
 * @description The general-purpose bot for the Mue Discord server.
 * @author eartharoid (Mue)
 * @license MIT
 */
const { Client: DiscordClient } = require('eris');
const { token, autorole } = require('./config');
const pkg = require('./package.json');

const client = new DiscordClient(token, {
  autoreconnect: true,
  disableEveryone: true,
  disableEvents: {
    PRESENCE_UPDATE: true
  }
});

const logger = require('leekslazylogger');
logger.init({ name: 'MueBot' });

logger.info(`Mue v${pkg.version}`, 'magentaBright');
logger.info('Starting...');

client.on('ready', () => logger.success(`Connected to the API as "${client.user.username}#${client.user.discriminator}"`));
client.on('guildMemberAdd', (guild, member) => {
  logger.console(`Member ${member.user.username}#${member.user.discriminator} has joined ${guild.name}`);
  
  const role = guild.roles.find(r => r.name === autorole);
  if (!role) logger.warn(`Unable to find role by name "${autorole}"`);

  member.addRole(role.id)
    .then(() => logger.console(`Gave user ${member.user.username}#${member.user.discriminator} the "${autorole}" role!`))
    .catch(ex => logger.error(`Cannot give role ${autorole} to ${member.user.username}:\n${ex}`));
});

client.connect();