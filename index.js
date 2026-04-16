const mineflayer = require('mineflayer');
const http = require('http');

const botArgs = {
    host: 'mnsmp.mcsh.io', // العودة للعنوان المطلوب
    port: 25565,
    username: 'AFK_Bot_24_7',
    version: false, // تركتها false لكي يكتشف الإصدار بنفسه ويتجنب خطأ versionError
    auth: 'offline',
    checkTimeoutInterval: 90000
};

let bot;

function createBot() {
    if (bot) bot.quit();
    bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('✅ تم الاتصال بـ mnsmp.mcsh.io بنجاح!');
    });

    bot.on('spawn', () => {
        console.log('🎮 البوت رسبن الآن داخل العالم وجاهز.');
    });

    bot.on('kicked', (reason) => {
        // هذا السطر سيخبرنا بالسبب الحقيقي للطرد (مثل: Whitelist أو Ban أو Version)
        console.log('❌ طرد من السيرفر! السبب: ' + reason);
    });

    bot.on('error', (err) => {
        console.log('⚠️ خطأ اتصال: ' + err.message);
    });

    bot.on('end', () => {
        setTimeout(createBot, 10000);
    });
}

// سيرفر ويب بسيط للبقاء حياً
http.createServer((req, res) => { res.end('Bot Active'); }).listen(8080);

createBot();
