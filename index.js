const Discord = require('discord.js');
const ayarlar = require('./ayarlar.json'); 
const client = new Discord.Client()
var prefix = ayarlar.prefix;
const durum = true;
client.on('ready', () => {
    client.user.setPresence({ activity: { name: ayarlar.FERZAH }, status: "idle" });
    let kanal = client.channels.get("791746981508808725");
    if(kanal) kanal.join().catch(err => console.error("Bot Ses Kanalına Bağlanamadı!"));
})

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if(durum) {
        let kanal = client.channels.get("791746981508808725")
        if(!kanal) return;
        if (oldMember.selfMute && !newMember.selfMute) return;
        if (!oldMember.selfMute && newMember.selfMute) return;
        if (oldMember.selfDeaf && !newMember.selfDeaf) return;
        if (!oldMember.selfDeaf && newMember.selfDeaf) return;
        if (newMember.voiceChannel === kanal) {
            console.log(`ÇALIYOR`)
            kanal.join().then(connection =>{
                    const dispatcher = connection.playStream('eda-hg.mp3');
                    dispatcher.on('finish',() => {
                        dispatcher.pause();
                        return;
                    })
            }).catch(console.error);
    } 
}
}); 

client.on('message', message => {
    if (message.content.toLowerCase() ===`${prefix}seskapat`) {
        durum = false;
        message.channel.send('Sesli Hoşgeldin Kapatıldı!');
    } else if (message.content.toLowerCase() === `${prefix}sesaktif` && durum === false) {
        durum = true;
        message.channel.send('Sesli Hoşgeldin Aktif Edildi!');
    } else if (message.content.toLowerCase() === `${prefix}sesaktif` && durum === true){ 
        message.channel.send('Zaten Aktif!');
    }
})


client.login(ayarlar.token);