var fs = require('fs');

var data = JSON.parse(fs.readFileSync('./data.json'));

var roleName = data.roleName;

const { Client } = require('discord.js');
const Discord = require('discord.js');
const client = new Client();

client.on('ready', () => {
    console.log('Started !');
});

client.on('message', message => {
    //Séparateur de message
    const args = message.content.split(/ +/g);
    const cmd = args.shift().toLowerCase();
    arg = args.toString();

    let userRole = message.guild.roles.cache.find(role => role.name === roleName);

    //Mise en place du changement de couleur du grade indiqué
    if(message.content === '!rgb') {
        const rgbEmbed = new Discord.MessageEmbed()
            .setTitle("RGB STARTED !!!")

        message.channel.send(rgbEmbed);
        for(i=0;i<500;i++) {
            userRole.setColor('#ff0000');
            userRole.setColor('#fbff00');
            userRole.setColor('#32ff00');
            userRole.setColor('#00fbff');
            userRole.setColor('#0400ff');
            userRole.setColor('#ff00fb');
        }
    }

    //Récupération du role sur lequel mettre en place le changement de couleur
    if(message.content.startsWith('!roleName')) {
        if(arg === '' || arg === ' ') {
            const emptyRoleEmbed = new Discord.MessageEmbed()
                .setTitle("Empty role !")
                .setDescription("To start the animation, you must type the name of your role after *!roleName* ! \n For example : *!roleName RGBMASTER* !")
            
            message.channel.send(emptyRoleEmbed);
        }
        else {
            let JSONdata ={
                "token": data.token,
                "roleName": arg.replace(',', ' ')
            }
            fs.writeFileSync('./data.json', JSON.stringify(JSONdata));
            roleName = arg.replace(',', ' ');
            const roleNameEmbed = new Discord.MessageEmbed()
                .setTitle("Role RGB")
                .setDescription("Nouveau role RGB : " + roleName)
            
            message.channel.send(roleNameEmbed);
        }
    }

    //Commande permettant de vérifier le nom du role
    if(message.content === '!checkName') {
        const checkNameEmbed = new Discord.MessageEmbed()
            .setTitle("RoleName")
            .setDescription("The actual roleName is : " + roleName)

        message.channel.send(checkNameEmbed);
    }

    //Affichage d'un message d'aide pour comprendre l'utilisation du bot
    if(message.content === '!help') {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("RGBBBBBOT HELP")
            .setDescription("The **RGBBBBBOT** role must be higher than the role you want to animate !\n Then, type *!roleName* with the name of the role you want to animate ! \n And, just type *!rgb* !")

        message.channel.send(helpEmbed);
    }

    //Affichage des images submarine / dagouille / guidouille
    if(message.content === '!submarine') {
        message.channel.send("",{files: ["./images/submarine.png"]});
    }

    if(message.content === '!dagouille') {
        message.channel.send("",{files: ["./images/dagouille.gif"]});
    }

    if(message.content === '!guidouille') {
        message.channel.send("",{files: ["./images/guidouille.gif"]});
    }
});

client.login(data.token);