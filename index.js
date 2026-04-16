const mineflayer = require('mineflayer');
const axios = require('axios');
const http = require('http');

const botArgs = {
    host: 'mnsmp.mcsh.io',
    port: 25565,
    username: 'AFK_Bot_24_7',
    version: '1.21.1',
    auth: 'offline',
    // --- الحل الجذري هنا ---
    checkTimeoutInterval: 120000, // رفعنا الوقت لـ دقيقتين كاملتين
    connectTimeout: 60000,
    keepAlive: true // الحفاظ على الجلسة حية
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('✅ البوت متصل ومستقر في mnsmp.mcsh.io');
    });

    bot.on('spawn', () => {
        // حركات بسيطة عشوائية لضمان عدم الطرد
        setInterval(() => {
            if (bot.entity) {
                bot.look(Math.random() * 6.28, (Math.random() - 0.5) * 1.5);
                bot.swingArm('right'); // حركة يد إضافية لإثبات الوجود
            }
        }, 25000);
    });

    bot.on('end', (reason) => {
        console.log('❌ فصل بسبب: ' + reason + ' .. إعادة اتصال خلال 5 ثوانٍ');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        if (err.message.includes('timeout')) return; // تجاهل رسائل التايم آوت في اللوجز
        console.log('⚠️ خطأ تقني:', err.message);
    });
}

// سيرفر الويب للبقاء حياً
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Status: ACTIVE 24/7');
}).listen(8080);

// Self-Ping
const RENDER_URL = 'https://mc-bot-xxxx.onrender.com'; // تأكد من وضع رابطك هنا
setInterval(() => {
    axios.get(RENDER_URL).catch(() => {});
}, 280000);

createBot();
