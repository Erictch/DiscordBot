const env = require('../config.json');
const fs = require('fs');
const tag = require('./Tag.js');

if (env.debugmode >= "1" ){console.log('Initializing replyCommands.js');} 
const shrugs = ['╮(╯∀╰)╭','ლ(•ω •ლ)','╮(╯_╰)╭','┐(´ー｀)┌','¯\\_(ツ)_/¯','ヽ(~～~ )ノ','乁〳 ❛ д ❛ 〵ㄏ','╮(─▽─)╭','http://i.imgur.com/yowrSLF.png'];

/**
 * @param {mesasge} message 
 * @param {char} prefixChar 
 */
module.exports = exports = 
function (message, prefixChar){
    var command = message.content.split(" ");
     //pingMe
    if(message.content == prefixChar + 'ping'){
        message.reply('pong');
    }

    if(message.content == prefixChar + 'intro'){
        message.channel.sendMessage('I\'m a bot and I love to tpyo');
    }

    if(message.content == prefixChar + 'commands'){
        message.channel.sendMessage(
            "```hello there"
            +
            "\n" + prefixChar + "ping -- returns pong"
            +
            "\n" + prefixChar + "timeCreated -- returns time created"
            +
            "\n" + prefixChar + "async [miliseconds] -- Node.js Asynchronous Reply test. You should be able to have more than 1 of this command running at the same time."
            +
            "\n <not functional> " + prefixChar + "tag [name] [content] -- Allows one to store content, image links, and such. Recall with tag [name]"
            +
            "```"
        );
    }
    

    //tag
    if(command[0] == prefixChar + 'tag'){
        tag(message);
        
    }

    //say
    
    if(command[0] == prefixChar + 'say'){
        //message.channel.sendMessage('splittext command');
        //intention is to test the ability to "hack into the system"
        var replyText = "";
        function compressMessage(){
            for(i = 1; i < command.length;i++){
                replyText = replyText + command[i] + " " ;
            }
        }
        compressMessage();
        message.channel.sendMessage(replyText);
    }

    //asyncrhonousTest
    if(command[0] == prefixChar + 'async'){
        var miliseconds;
        if (env.debugmode == "2" ){console.log('async typeof : ' + typeof command[1] + ' value : ' + command[1] + ' --- ' + typeof (parseInt(command[1])) + " --- " +  (parseInt(command[1])) );} 

        if(typeof command[1] === "undefined") {
            message.channel.sendMessage('`Usage :' + prefixChar + 'async [miliseconds]`');
        }else if(isNaN((parseInt(command[1]))) == true){
            message.channel.sendMessage('Please enter an integer instead. \n\`Usage :' + prefixChar + 'async [miliseconds]\`');
        }else{
            miliseconds = (parseInt(command[1]));
            message.channel.sendMessage('Async reply in ' + miliseconds + ' miliseconds');
            setTimeout(function(){
                message.channel.sendMessage("Asynchronous reply.");
            },miliseconds);
        }
    }

    //exit
    if(message.content == prefixChar + 'exit'){
        if (message.author.hasRole == 'Seiyuu Lover'){
            message.channel.sendMessage('Stopping in 3 seconds.');
            setTimeout(()=>{
                process.exit(1);
            },3000);
        }else{
            message.channel.sendMessage('Permission not granted. Doesn\'t have the role of an admin');
        }
    }

    //timeCreated;
    if(message.content == prefixChar + 'timeCreated'){
        console.log('timeCreated');
        var date = new Date();
        date = message.channel.createdAt;
        message.reply
        (
            " the channel is created on " + date.toString()
            //"Channel created at " + date.getDate() +"/" + date.getMonth() + "/" +  date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        );
    }

    if (command[0] == prefixChar + 'profilepic') {
        // send the user's avatar URL
        var msgobj = message.mentions;
        Map.prototype.get(msgobj.id);
        console.log(msgobj.user = (user) => {
            console.log(user.id);
        });
        message.reply('asdf');
    }

    if (message.content == 'what is my avatar') {
        // send the user's avatar URL
        message.reply(message.author.avatarURL);
    }

    if (message.content == prefixChar + 'shrug') {
        // send the user's avatar URL
        if (env.debugmode >= "2" ){console.log('shrug')};
        var roll = Math.floor(Math.random() * shrugs.length);
        message.channel.sendMessage(shrugs[roll]);
    }

};

//module.exports.content = content;