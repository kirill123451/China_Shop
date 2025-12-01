import express from 'express'
import {phoneCheck, codeCheck} from './src/authorization/authController'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors({
    origin: [
        'http://localhost:5173'
    ]
}))

app.use(express.json())

app.get('/', (req,res) => 
    res.send(`<div>Сервер работает</div>`)
)

app.post('/phoneCheck', phoneCheck )
app.post('/codeCheck', codeCheck )

app.listen(PORT, () => 
    console.log(`Сервер запущен на порту: ${PORT}`)
)