const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'yunx88908.mcsh.io',
        port: 25565,
        username: 'AFK_Bot_24_7',
        version: '1.21.1',
        auth: 'offline',
        checkTimeoutInterval: 60000 // رفع وقت الانتظار لـ 60 ثانية لتجنب الـ Timeout
    })

    bot.on('login', () => console.log('✅ البوت متصل الآن!'))

    bot.on('spawn', () => {
        console.log('🎮 البوت رسبن في السيرفر')
        // حركة مستمرة بسيطة
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 20000) 
    })

    // إعادة اتصال ذكية عند الطرد
    bot.on('end', (reason) => {
        console.log('❌ انفصل البوت بسبب: ' + reason + ' جاري العودة...')
        setTimeout(createBot, 10000)
    })

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log('⚠️ السيرفر مغلق حالياً، سأحاول لاحقاً')
        } else {
            console.log('⚠️ خطأ: ' + err.message)
        }
    })
}

createBot()

// كود إبقاء الاستضافة حية
const http = require('http')
http.createServer((req, res) => {
    res.write('I am Alive!')
    res.end()
}).listen(8080)
