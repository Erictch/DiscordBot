const fs = require('fs');
const env = require('../config.json');

var prefixChar = env.prefixChar;

consoleLog('Initilizing tag.js',1);

module.exports = exports = function(message){
    var command = message.content.split(" ");
    if(command [1] == ''){
        message.channel.sendMessage(' ` Refer to '+ prefixChar +'help tag `');
    }else{
        switch(command[1]){
            case 'create':
                consoleLog('EVENT CALLED : tag create', 2);
                create(message , command);
                break;
            case 'edit':
                consoleLog('EVENT CALLED : tag edit', 2);
                break;
            case 'delete':
                consoleLog('EVENT CALLED : tag delete', 2);
                del(message,command);
                break;
            case 'info':
                consoleLog('EVENT CALLED : tag info', 2);
                info(message , command);
                break;
            default:
                consoleLog('EVENT DEFAULTED : tag', 2);
                call(message,command);
        }
    }
}

//tag create wao
/**
 * @param {message} message 
 * @param {char} prefixChar 
 */
function create(message , command){
    //To make spaced name tags possible with quotation marks (eg tag what the f)
    //Feature hasn't been implemented, the whole program need to be rewrote in writeStream() instead.
    //This is because using the command as the name of the file means symbols like !@#$%^ are not possible.
    var tagname = message.content.split("\"");
    var tagdescription = '';
    //Syntax check
    if(command[2] == undefined || command[3] == undefined){
        message.channel.sendMessage('` Please use "'+ prefixChar+ 'help tag" `');
    }else{
        for(i=3;i<command.length;i++){
            tagdescription = tagdescription + ' ' + command[i];
        }
        tagdescription = tagdescription + '\n' + message.author.username + '\n' + message.author.id + '\n' + message.createdAt;
        fs.stat(('./discordbot/tag/' + command[2] + '.txt'), (err, stat)=>{
            if (err == null){
                message.channel.sendMessage('Tag name already used.');
            }else if (err.code == 'ENOENT'){
                fs.writeFile(('./discordbot/tag/' + command[2] + '.txt'), tagdescription ,(err)=>{
                    if (err) throw err;
                    console.log(tagdescription);
                    message.channel.sendMessage('Tag sucessfully created.');
                })
            }else{
                message.channel.sendMessage('Failed to create tag, try again later.');
                throw err;
            }
        });

    }
}

//tag edit wao
function edit(){
    
}

//tag delete wao
function del(message,command){
    fs.unlink(('./discordbot/tag/' + command[2] + '.txt'), (err)=>{
        message.channel.sendMessage('Tag sucessfully deleted.');
    });
}

//tag info wao
function info(message,command){
    if(command[2] == undefined){
        message.channel.sendMessage('Please enter tag name.');
        //return;
    }else{}
    fs.readFile(('./discordbot/tag/' + command[2] + '.txt'),"utf-8",(err,data)=>{
        if(err == null){
            var info = data.split("\n").map(val => String(val));
            //console.log(info);
            message.channel.sendMessage(' \`\`\`\nTag Description : '+ info[0] +'\nAuthor : ' + info[1] + '\nAuthor ID : ' + info[2] + '\nTime Created :'+ info[3] + ' \`\`\`');
        }else if(err.code == 'ENOENT'){
            message.channel.sendMessage('Tag does not exist.');
        }else{
            throw err;
        } 

    });
}

//tag wao
function call(message,command){
    fs.readFile(('./discordbot/tag/' + command[1] + '.txt'),"utf-8",(err,data)=>{
        if(err == null){
            var info = data.split("\n").map(val => String(val));
            message.channel.sendMessage(info[0]);
        }else if(err.code == 'ENOENT'){
            message.channel.sendMessage('Tag does not exist.');
        }else{
            throw err;
        } 

    });
}

/*
HOW INFO IS ARRANGED :
0 - name of tag
1 - description of tag
2 - Author of tag
3 - author id of tag
4 - date created
*/

module.exports.create = create;

/**
 * @param {string} message 
 * @param {number} severity 
 */
function consoleLog(message, severity){
    if(env.debugmode >= severity){
        console.log(message);
    }else{

    }
}

//Ignore this part for now
/**
 * @param {number} eventType 
 * @param {string} message 
 * @param {number} severity 
 */
function consoleLog(eventType, message, severity){
    var eventMessage;
    switch(eventType){
        case 1:
            eventMessage = 'INITIALIZING : '
            break;
        case 2:
            eventMessage = 'EVENT CALLED : ';
            break;
        case 3:
            eventMessage = 'EVENT EXCEPTED : ';
            break;
        default:
            eventMessage= 'UNKNOWN EVENT : ';
            break;
    }
    if(env.debugmode >= severity){
        console.log(eventMessage + message);
    }else{

    }
}