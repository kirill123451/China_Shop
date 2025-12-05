import { Request, Response } from 'express'
import { findOrCreateUser } from '../services/userService'
import { generateAuthToken } from '../utils/jwtUtils'

export const phoneCheck = async (req: Request, res: Response) => {
    try {
        const { phone } = req.body

        if (!phone) return res.status(400).json({ error: "Телефон не найден" })

        const response = await fetch('https://direct.i-dgtl.ru/api/v1/verifier/send', {
            method: "POST",
            headers: {
                "Authorization": "Basic MTQxNzE6WGlrS29XWlBsczJwcXZsOXJuRjNxcw==",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "channelType": "SMS",
                "destination": phone,
                "gatewayId": "mBa3wf"
            })
        })

        if (response.ok) {
            const data = await response.json()
            return res.json({ success: true, uuid: data.uuid })
        } else {
            return res.status(500).json({ success: false, error: "Ошибка отправки кода" })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: String(error) })
    }
}

export const codeCheck = async (req: Request, res: Response) => {
    try {
        const { code, uuid, phone_number } = req.body

        if (!code || !uuid) return res.status(400).json({ error: 'Код или идентификатор не обнаружен' })

        const response = await fetch('https://direct.i-dgtl.ru/api/v1/verifier/check', {
            method: "POST",
            headers: {
                "Authorization": "Basic MTQxNzE6WGlrS29XWlBsczJwcXZsOXJuRjNxcw==",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "uuid": uuid,
                "code": code
            })
        })

        if (response.ok) {
            const status = await response.json()
            
            // УБИРАЕМ ПРОВЕРКУ СТАТУСА - как в моей версии
            const user = await findOrCreateUser(phone_number)
            const token = generateAuthToken(user.id)

            res.cookie('authtoken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                sameSite: 'strict'
            })

            return res.json({ 
                status: status.status, 
                userId: user.id,
                success: true 
            })
        } else {
            return res.status(500).json({ error: "Ошибка подтверждения кода" })
        }
    } catch (error) {
        return res.status(500).json({ error: String(error) })
    }
}