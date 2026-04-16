const mineflayer = require('mineflayer');
const http = require('http');

const botArgs = {
    host: 'mnsmp.mcsh.io',
    port: 25565,
    username: 'AFK_Bot_24_7',
    // إجبار البوت على قراءة بروتوكول 1.21.1 كأنه 1.21.11
    version: '1.21.1', 
    auth: 'offline'
};

let bot;

function createBot() {
    if (bot) bot.quit();
    
    // استخدام ميزة التوافق مع الإصدارات الحديثة
    bot = mineflayer.createBot({
        ...botArgs,
        onMinedata: (data) => {
            // تحديث بيانات الإصدار داخلياً لتخطي حماية السيرفر
            data.version.name = "1.21.11";
            data.version.protocol = 767; // بروتوكول إصدارات 1.21 الحديثة
        }
    });

    bot.on('login', () => {
        console.log('✅ تم اختراق حاجز الإصدار والدخول بنجاح!');
    });

    bot.on('spawn', () => {
        console.log('🚀 البوت بدأ القفز لمنع السبات (Hibernation)');
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 3000); // يقفز كل 3 ثوانٍ ليبقى السيرفر مستيقظاً
    });

    bot.on('error', (err) => {
        // إذا استمر خطأ الإصدار، سنحاول الدخول بدون تحديد نسخة
        if (err.message.includes('version')) {
            console.log('⚠️ محاولة الدخول بنمط التوافق التلقائي...');
            botArgs.version = false;
        }
    });

    bot.on('end', () => setTimeout(createBot, 10000));
}

http.createServer((req, res) => { res.end('Jumping Bot 1.21.11'); }).listen(8080);
createBot();
