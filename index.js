const mineflayer = require('mineflayer');
const axios = require('axios');
const http = require('http');

// --- إعدادات السيرفر الجديد ---
const botArgs = {
    host: 'mnsmp.mcsh.io', // تم التحديث للـ IP الجديد
    port: 25565,
    username: 'AFK_Bot_24_7',
    version: '1.21.1',
    auth: 'offline',
    checkTimeoutInterval: 90000 
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('✅ تم الاتصال بالسيرفر الجديد: mnsmp.mcsh.io');
    });

    bot.on('spawn', () => {
        // حركة رأس عشوائية لمنع الطرد
        setInterval(() => {
            if (bot.entity) {
                bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * Math.PI);
            }
        }, 30000);
    });

    bot.on('end', () => {
        console.log('❌ فصل البوت.. جاري إعادة المحاولة');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('⚠️ خطأ:', err.message));
}

// --- سيرفر الويب للبقاء حياً 24/7 ---
http.createServer((req, res) => {
    res.write('<h1>MN-SMP Bot is Online</h1>');
    res.end();
}).listen(8080);

// استبدل الرابط بالأسفل برابط الـ Render الخاص بك ليعمل الـ Self-Ping
const RENDER_URL = 'https://mc-bot-xxxx.onrender.com'; 

setInterval(() => {
    axios.get(RENDER_URL)
        .then(() => console.log('🔔 Self-Ping Success'))
        .catch(() => console.log('🔔 Bot is awake'));
}, 300000); 

createBot();
