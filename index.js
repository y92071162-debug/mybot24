const mineflayer = require('mineflayer')
const axios = require('axios'); // أضفنا هذه المكتبة

function createBot() {
    const bot = mineflayer.createBot({
        host: 'yunx88908.mcsh.io',
        port: 25565,
        username: 'AFK_Bot_24_7',
        version: '1.21.1',
        auth: 'offline'
    })

    bot.on('login', () => console.log('✅ البوت متصل باللعبة!'))
    bot.on('end', () => setTimeout(createBot, 10000))
    bot.on('error', (err) => console.log(err))
}

createBot()

// --- الجزء الأسطوري لمنع النوم (Self-Ping) ---
const http = require('http')
const server = http.createServer((req, res) => {
    res.write('Bot is Running!');
    res.end();
}).listen(8080)

// استبدل الرابط بالأسفل برابط الـ Render الخاص بك
const RENDER_URL = 'https://mc-bot-xxxx.onrender.com'; 

setInterval(() => {
    axios.get(RENDER_URL)
        .then(() => console.log('🔔 تم عمل Self-Ping بنجاح'))
        .catch(err => console.log('⚠️ خطأ في البينج'));
}, 600000); // كل 10 دقائق
