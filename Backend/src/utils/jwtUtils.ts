import jwt, { SignOptions } from "jsonwebtoken"
import * as dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const generateAuthToken = (userId: string): string => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET не настроен')
    }

    const payload = {
        userId: userId,
        timestamp: Date.now()
    }

    const options: SignOptions = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, JWT_SECRET, options)
}