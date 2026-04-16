const mineflayer = require('mineflayer')
function createBot() {
    const bot = mineflayer.createBot({
        host: 'yunx88908.mcsh.io',
        port: 25565,
        username: 'AFK_Bot_24_7',
        version: '1.21.1',
        auth: 'offline'
    })
    bot.on('login', () => console.log('✅ البوت دخل!'))
    bot.on('spawn', () => {
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 30000)
    })
    bot.on('end', () => setTimeout(createBot, 10000))
    bot.on('error', (err) => console.log(err))
}
createBot()
const http = require('http')
http.createServer((req, res) => { res.write('Online'); res.end() }).listen(8080)
