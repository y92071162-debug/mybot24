const mineflayer = require('mineflayer');
const http = require('http');

const botArgs = {
    host: 'mnsmp.mcsh.io',
    port: 25565,
    username: 'AFK_Bot_24_7',
    version: '1.21.1',
    auth: 'offline'
};

let bot;

function createBot() {
    if (bot) bot.quit();
    bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('🚀 البوت بدأ القفز الآن!');

        // حلقة تكرارية للقفز كل 3 ثوانٍ
        setInterval(() => {
            if (bot.entity) {
                // تنفيذ القفزة
                bot.setControlState('jump', true);
                
                // إنهاء القفزة بعد نصف ثانية (ضروري لكي يقفز مرة أخرى)
                setTimeout(() => {
                    bot.setControlState('jump', false);
                }, 500);

                // حركة دوران بسيطة مع القفز لزيادة "الواقعية"
                bot.look(bot.entity.yaw + 0.5, 0);
            }
        }, 3000); 
    });

    bot.on('login', () => console.log('✅ تم الدخول!'));
    bot.on('end', () => setTimeout(createBot, 5000));
    bot.on('error', (err) => console.log('⚠️ خطأ:', err.message));
}

// سيرفر الويب لـ Render
http.createServer((req, res) => { res.end('Jumping Bot Active'); }).listen(8080);

createBot();
