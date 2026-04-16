const mineflayer = require('mineflayer');
const http = require('http');

// إعدادات الدخول
const botArgs = {
    host: 'nmsmp.enderman.cloud',
    port: 25565,
    username: 'AFK_Bot_24_7',
    version: '1.21.1', // ثبتنا النسخة هنا يدوياً
    auth: 'offline',
    checkTimeoutInterval: 60000
};

let bot;

function createBot() {
    if (bot) bot.quit();

    bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('✅ تم الاتصال بنجاح بسيرفر Enderman Cloud!');
    });

    bot.on('spawn', () => {
        console.log('🎮 البوت رسبن الآن داخل العالم.');
    });

    bot.on('kicked', (reason) => {
        console.log('❌ البوت انطرد بسبب: ' + reason);
    });

    bot.on('end', () => {
        console.log('🔄 فصل الاتصال.. محاولة إعادة دخول بعد 10 ثوانٍ');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('⚠️ خطأ:', err.message));
}

// سيرفر الويب للبقاء حياً
http.createServer((req, res) => {
    res.end('Bot is running');
}).listen(8080);

createBot();
