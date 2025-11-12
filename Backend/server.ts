import express from 'express'

const app = express()
const PORT = 3001

app.use(express.json())

app.get('/', (req,res) => 
    res.send(`<div>Сервер работает</div>`)
)

app.listen(PORT, () => 
    console.log(`Сервер запущен на порту: ${PORT}`)
)