const Discord = require('discord.js');
const bot = new Discord.Client();

var env = require('./config.json');

var prefixChar = '!';

bot.on('ready', () => {
    console.log("Initialization Complete");
});

bot.on('message',function(message) {

    if(message.content == prefixChar + 'ping'){
        //message.reply('pong');
        message.channel.sendMessage('pong');
    }

    if(message.content == prefixChar + 'quit'){
        message.channel.sendMessage('ok');
        process.exit(1);
    }

    if(message.content == prefixChar + 'timeCreated'){
        console.log('arghhhhh');
        var date = new Date();
        date = message.channel.createdAt;

        message.reply
        (
            " the channel is created on " + date.toString()
            //"Channel created at " + date.getDate() +"/" + date.getMonth() + "/" +  date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        );
    }

    if (message.content === 'what is my avatar') {
        // send the user's avatar URL
        message.reply(message.author.avatarURL);
    }
});

bot.login('');

