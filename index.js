const Discord = require("discord.js");
const client = new Discord.Client();
let date = new Date();
let string = date.toTimeString();
var prefix = "%"
var mysql = require('mysql');
const ms = require('ms');

client.on('guildCreate', guild => {
  var ServerID = guild.id;
  var query = 'INSERT INTO `ourtest`.`date` (`server id`) VALUES ('+ServerID+')';
  con.query(query, function (err, result) {
    if (err) throw err;
  });
});


client.on('guildDelete', guild => {
  var ServerID = guild.id;
  var query = "DELETE FROM `ourtest`.`date`  WHERE `server id` ="+ServerID+"";
  con.query(query, function (err, result) {
    if (err) throw err;
  });
});


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

  client.on('guildCreate', guild => {
    var ownername = guild.owner.user.id;
    var query = 'INSERT INTO `ourtest`.`owner` (`owner`) VALUES ('+ownername+')';
    con.query(query, function (err, result) {
      if (err) throw err;
    });
  });


ll
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



client.on('ready', () => {
console.log('am here', client.user.username)
});




// client.on("message", message => {
//   if (message.author.id == client.user.id) return;
//   if (message.guild == null) return;
//   var serverid = message.guild.id;
//   var args = message.content.split(" ");
//   con.query("SELECT * FROM `ourtest`.`date` WHERE `server id` = '"+serverid+"';", async (err, result) => {
//     if (result.length < 1) return;
//     let prefix = result[0].prefix;
//     if (args[0].startsWith(prefix)) { 
//   let command = args[0].substring(prefix.length).toLowerCase();
//   let serverinfo = result[0].serverinfo;
//     if(command == serverinfo){
//         let embed = new Discord.MessageEmbed()
//         .setAuthor(message.guild.name)
//         .setTitle(`${date}`)
//         .setThumbnail(message.guild.iconURL())  
//         .addField('Members', message.guild.memberCount)
//         .addField('Owner', message.guild.owner)
//         .addField('Roles', message.guild.roles.cache.size)
//         .addField('Channels', message.guild.channels.cache.size)
//         .addField('Booster', message.guild.premiumSubscriptionCount)
//         .setFooter('3rb bot', client.user.avatarURL())
//         .timestamp('');
//      message.channel.send({embed:embed})
//     }
//     }
//   });
// });

client.on('message', message => {
  if (message.author.id == client.user.id) return;
  if (message.guild == null) return;
  var serverid = message.guild.id;  

  let args = message.content.split(" ");
  con.query(" SELECT * FROM `ourtest`.`date` WHERE `server id` = '"+serverid+"';", (err, result) => {
    if (err) throw err;
    if (result.length < 1) return;
    let prefix = result[0].prefix;
    if (args[0].startsWith(prefix)) {
      let command = args[0].substring(prefix.length).toLowerCase();
      if (command == 'test') {
        message.channel.send('tasty!')
      }
    }
  
    });
}); 

client.on('message', async message => {
  if (message.author.id == client.user.id) return;
  if (message.guild == null) return;
  var serverid = message.guild.id;
  var args = message.content.split(" ");
  con.query("SELECT * FROM `ourtest`.`date` WHERE `server id` = '"+serverid+"';", async (err, result) => {
    if (err) throw err;
    if (result.length < 1) return;
    let prefix = result[0].prefix;
    if (args[0].startsWith(prefix)) { 
      let command = args[0].substring(prefix.length).toLowerCase();
      let bancommand = result[0].bancommand;
      if(command == bancommand){
        if(!args[1]) return message.channel.send('please ban someone');
      if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('u dont have BAN_MEMBERS to ban this person');
      if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('i dont have BAN_MEMBER to ban this person');
      var member = message.mentions.members.first();
      if(!member) return;
      if(member.user.id === message.author.id) return message.channel.send(`**${message.author.username}**, you can not ban yourself`);
      if(member.user.id === client.user.id) return message.channel.send(`**${message.author.username}**, I can not ban myself`);
      if(member.ban()){
        message.channel.send(`**You have been banned** ${args[1]}`)
       };
      
      }

      let mutecommand = result[0].mute; 
      if(command == mutecommand)
      
      

      if (command == 'changeprefix') {
      if(!args[1]) return message.channel.send(prefix+'changeprefix <prefix> ');
      if(!message.member.hasPermission('MANAGE_GUILD')) return;
        con.query(" UPDATE `ourtest`.`date` SET `prefix` = '"+args[1]+"' WHERE `server id` = '"+serverid+"';", (err, date) => {
          if (err) throw err;
          message.channel.send('Changing to '+args[1]);
      });
      }
    }
    });
});


client.on('message', message =>{
  if (message.author.id == client.user.id) return;
  if (message.guild == null) return;
  var serverid = message.guild.id;
  var args = message.content.split(" ");
  con.query("SELECT * FROM `ourtest`.`date` WHERE `server id` = '"+serverid+"';", async (err, result) => {
    if (err) throw err;
    if (result.length < 1) return;
    let prefix = result[0].prefix;
    if (args[0].startsWith(prefix)) { 
      let command = args[0].substring(prefix.length).toLowerCase();

      
      let kickcommand = result[0].kickcommand;
      if(command == kickcommand){
        if(!args[1]) return message.channel.send('please kick someone');
      if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('u dont have BAN_MEMBERS to kick this person');
      if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('i dont have BAN_MEMBER to kick this person');
      var member = message.mentions.members.first();
      if(!member) return;
      if(member.user.id === message.author.id) return message.channel.send(`**${message.author.username}**, you can not kick yourself`);
      if(member.user.id === client.user.id) return message.channel.send(`**${message.author.username}**, I can not kick myself`);
      if(member.kick()){
        message.channel.send(`**You have been kicked** ${args[1]}`)
       }
      }


    }
  });
});



// client.on('message', message =>{
 
//   if(message.guild == null || message.author.id == client.user.id) return;
//   if(message.author.bot) return;
//   var serverid = message.guild.id;
//   con.query("SELECT * FROM `ourtest`.`date` WHERE `server id` = '"+serverid+"';", (err, result) => {
//     var prefix = result[0].prefix;
//     var args = message.content.split(" ");
//     var command = args[0].substring(prefix.length).toLowerCase();
//     if(err)
//     console.log(err);
//     let role = result[0].randomcolor;
//     if(command == role){
//       if(args[1]) return;
//       var roless = message.guild.roles.cache.get(role);
//       if(!message.member.hasPermission('MANAGE_ROLES')) return;
//       if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('I dont have permission');
//       message.guild.roles.create({
//         data: {
//           name: args.slice(1).join(' ')
//         }
//       })
//       var colors = ['#8585ff','#fff681','#a073fd','#fd73b9'];
//       var random = Math.floor(Math.random() * colors.length);
//       setInterval(() => {
//         roless.setColor(colors[random])
//     }, 1000);

//     message.channel.send(`done`)
      
//     }
//   });
// });


// client.on('guildMemberAdd',  member =>{
//   var serverid = member.guild.id;
//   con.query("SELECT * FROM `ourtest`.`date` WHERE `server id` = '"+serverid+"';", (err, result) => {
//     if (err) throw err;
//     if (result.length < 1) return;
//     var prefix = result[0].prefix; 
//     var welcomemsg = result[0].welcome;
//     if(welcomemsg == null || welcomemsg == "") return;
//     var membername = member.user.username;
//     var servername = member.guild.name;
//     var msg = welcomemsg.replace("<prefix>", prefix)
//     .replace("<servername>", servername)
//     .replace("<serverid>", serverid)
//     .replace("<membername>", membername);
  
//     member.send(msg).catch(err1 =>{});
//   });
// });


client.on('message', message =>{
  if(message.guild == null || message.author.id == client.user.id) return;
  var serverid = message.guild.id;
  con.query("SELECT * FROM `ourtest`.`date` WHERE `server id` = '"+serverid+"';", (err, result) => {
  if(err) throw err;
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  
  var prefix = result[0].prefix;
  var args = message.content.split(" ");
  var command = args[0].substring(prefix.length).toLowerCase();
  if(command == 'welcomemsg'){
   if(!args[1]) return;
   var welcome = "";
   welcome = args.slice(1).join(' ');
   
   con.query(" UPDATE `ourtest`.`date` SET `welcome` = '"+welcome+"' WHERE `server id` = '"+serverid+"';", (err, date) => {
    if (err) throw err;
     message.channel.send(`changing Wlecome message to ` + welcome)
  });
}

});
});


// client.on('message', message => {
//   if(message.guild == null || message.author.id == client.user.id) return;
//   var args = message.content.split(" ");
//   var command = args[0].substring(prefix.length).toLowerCase();
//   if(command == 'botname')
//   message.client.pla
// // })

  client.on('message', message =>{
    var serverid = message.guild.id;
    con.query("SELECT * FROM `ourtest`.`date` WHERE `server id` = '"+serverid+"';", (err, result) => {
    var prefix = result[0].prefix;
    var argss = message.content.split(' ');
    var command = argss[0].substring(prefix.length).toLowerCase();
    if(!message.guild) return;
    var args = message.content.split(' ').slice(1).join(" ");
    if(!args) return;
    if (args[0].startsWith(prefix)) { 
    if(command == 'roomname')
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return;
    message.channel.setName(args)
    message.channel.send('**Done changing to' + args)
    }
    });
  });

  client.on('message', message =>{ 
    var serverid = message.guild.id;
    con.query("SELECT * FROM `ourtest`.`date` WHERE `server id` = '"+serverid+"';", async (err, result) => {
      var args = message.content.split(" ");
      var prefix = result[0].prefix;
      var command = args[0].substring(prefix.length).toLowerCase();
      if (result.length < 1) return;
      let clear = result[0].clear;
      if (args[0].startsWith(prefix)) { 
      if(command == clear){

    const args = message.content.split(' ').slice(1);
    const amount = args.join(' ');
  if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!'); 
  if (isNaN(amount)) return message.reply('please type a number'); 
 
  if (amount > 100) return message.reply('error'); 
  if (amount < 1) return message.reply('error');
  await message.channel.messages.fetch({ limit: amount }).then(messages => { 
      message.channel.bulkDelete(messages
  )
});
      }
    }
    });
  });


client.on('message', message => {
  if(message.guild == null || message.author.id == client.user.id) return;
  if(message.author.bot) return;
  var serverid = message.guild.id;
  con.query("SELECT * FROM `ourtest`.`date` WHERE `server id` = '"+serverid+"';", (err, result) => {
    var args = message.content.split(" ");
    var prefix = result[0].prefix;
    var command = args[0].substring(prefix.length).toLowerCase();
    var role = message.guild.roles.cache.find(r => r.name === args[1]);
    var men = message.mentions.members.first();
  if(command == 'role'){
    const Role = require("discord.js").Role;
if (Role.comparePositions(message.member.roles.highest, message.guild.me.roles.highest) <= 0) return;
    if(!message.member.hasPermission('MANAGE_ROLES')) return;
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('I dont have permission');
    message.member.roles.add(role) 
    message.channel.send('done...')
    
  }
  });
});


client.login("NzA3MTg2MjkxODkyMDI3NDcy.XrGiJA.gvSIcY-5w9ipaXxERm4TU9OA57I");





client.on('message', message=>{
  let args = message.content.split(' ');
  const webhook = new Discord.WebhookClient("722135213492404305", "qBq0Clgj-gkAOjfqp5CXSyiI8-DMtIsVRMl5viu6g0MoEJ7Odd7emTJN_LjdOhCIJIaQ");
  if(message.content.startsWith('senpai')){
    message.delete();
      if (!args[1]) return;
    webhook.send(args.slice(1).join(' '), {
      username: message.author.username,
      avatarURL: message.author.avatarURL(),
    });
  }


 
});
