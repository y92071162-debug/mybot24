=const mineflayer = require('mineflayer');
const axios = require('axios');
const http = require('http');

// --- إعدادات السيرفر ---
const botArgs = {
    host: 'yunx88908.mcsh.io',
    port: 25565,
    username: 'AFK_Bot_24_7',
    version: '1.21.1',
    auth: 'offline',
    checkTimeoutInterval: 90000 // رفعنا وقت الانتظار لـ 90 ثانية لحل مشكلة الـ Timed Out
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botArgs);

    // عند دخول البوت بنجاح
    bot.on('login', () => {
        console.log('✅ تم الاتصال بنجاح! البوت الآن في السيرفر.');
    });

    // حركة بسيطة كل 40 ثانية لمنع طرد البوت (AFK Kick)
    bot.on('spawn', () => {
        setInterval(() => {
            if (bot.entity) {
                const yaw = Math.random() * Math.PI * 2;
                const pitch = (Math.random() - 0.5) * Math.PI;
                bot.look(yaw, pitch);
            }
        }, 40000);
    });

    // إعادة الاتصال التلقائي في حال الفصل
    bot.on('end', () => {
        console.log('❌ فصل البوت.. جاري إعادة الاتصال خلال 10 ثوانٍ.');
        setTimeout(createBot, 10000);
    });

    // تسجيل الأخطاء في الـ Logs (عشان نشوف الصور اللي ترسلها)
    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log('⚠️ السيرفر مغلق أو الـ IP خطأ.');
        } else {
            console.log('⚠️ خطأ تقني:', err.message);
        }
    });
}

// --- الطريقة الأسطورية (Self-Ping) ---
// إنشاء سيرفر ويب داخلي لـ Render
const server = http.createServer((req, res) => {
    res.write('<h1>Bot is 24/7 Active!</h1>');
    res.end();
}).listen(8080);

// نداء ذاتي (Self-Ping) كل 5 دقائق
// استبدل الرابط أدناه برابط Render الخاص بك
const RENDER_URL = 'https://mc-bot-xxxx.onrender.com'; 

setInterval(() => {
    axios.get(RENDER_URL)
        .then(() => console.log('🔔 تم إرسال إشارة الحياة للبقاء حياً (Self-Ping)'))
