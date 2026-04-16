const mineflayer = require('mineflayer');
const axios = require('axios');
const http = require('http');

const botArgs = {
    host: 'mnsmp.mcsh.io',
    port: 25565,
    username: 'AFK_Bot_24_7',
    version: '1.21.1', // جرب هذا أولاً، وإذا لم يعمل سأعطيك حلاً آخر بالأسفل
    auth: 'offline',
    checkTimeoutInterval: 120000
};

let bot;

function createBot() {
    // هذه المرة سنترك mineflayer يحاول التعرف على الإصدار تلقائياً
    bot = mineflayer.createBot({
        ...botArgs,
        version: false // وضعناها false لكي يكتشف البوت إصدار السيرفر بنفسه
    });

    bot.on('login', () => {
        console.log('✅ تم الدخول بنجاح للإصدار 1.21.11!');
    });

    bot.on('spawn', () => {
        setInterval(() => {
            if (bot.entity) {
                bot.look(Math.random() * 6, (Math.random() - 0.5) * 1);
            }
        }, 30000);
    });

    bot.on('end', (reason) => {
        console.log('❌ فصل بسبب: ' + reason + ' .. إعادة اتصال خلال 10 ثوانٍ');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('⚠️ خطأ تقني:', err.message));
}

// سيرفر الويب
http.createServer((req, res) => {
    res.end('Bot is Active');
}).listen(8080);

createBot();
