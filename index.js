const package = require('./package.json');
console.log("Initializing - " + package.version);

const Discord = require('discord.js');
const bot = new Discord.Client();
const replyCommands = require('./discordbot/ReplyCommands.js');
const env = require('./config.json');

var prefixChar = env.prefixChar;
//var prefixChar = '!';
if (env.debugmode >= "1" ){console.log('Prefix Character : \" ' + prefixChar + " \"");} 

bot.on('ready', () => {
    console.log("Initialization Complete");
});

bot.on('message',function(message) {
    replyCommands(message, prefixChar);
});

bot.login('');