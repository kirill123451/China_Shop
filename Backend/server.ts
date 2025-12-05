import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()

console.log('=== ПРОВЕРКА .env ПОСЛЕ ЗАГРУЗКИ ===')
console.log('DB_USER:', process.env.DB_USER || '❌ НЕ НАЙДЕНО')
console.log('DB_HOST:', process.env.DB_HOST || '❌ НЕ НАЙДЕНО')
console.log('DB_NAME:', process.env.DB_NAME || '❌ НЕ НАЙДЕНО')
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : '❌ НЕ НАЙДЕНО')
console.log('DB_PORT:', process.env.DB_PORT || '❌ НЕ НАЙДЕНО')
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Есть' : '❌ НЕТ!')
console.log('====================================')

import {phoneCheck, codeCheck} from './src/authorization/authController'

const app = express()
const PORT = 3000

app.use(cors({
    origin: [
        'http://localhost:5173',
    ],
    credentials: true
}))

app.use(express.json())

app.get('/', (req,res) => 
    res.send(`
        <div style="font-family: Arial; padding: 20px;">
            <h1>Сервер работает ✅</h1>
            <p>Порт: ${PORT}</p>
            <h3>Проверка .env:</h3>
            <ul>
                <li>DB_USER: ${process.env.DB_USER || '❌ НЕ НАЙДЕНО'}</li>
                <li>DB_NAME: ${process.env.DB_NAME || '❌ НЕ НАЙДЕНО'}</li>
                <li>JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Есть' : '❌ НЕТ!'}</li>
            </ul>
            <p><a href="/test-db">Тест БД</a></p>
        </div>
    `)
)

app.get('/test-db', async (req, res) => {
    try {
        const pool = (await import('./src/config/db')).default
        const result = await pool.query('SELECT NOW() as time')
        res.json({ success: true, time: result.rows[0].time })
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message })
    }
})

app.post('/phoneCheck', phoneCheck)
app.post('/codeCheck', codeCheck)

app.listen(PORT, () => {
    console.log(`\n🚀 Сервер запущен на порту: ${PORT}`)
    console.log(`📡 Откройте: http://localhost:${PORT}`)
})