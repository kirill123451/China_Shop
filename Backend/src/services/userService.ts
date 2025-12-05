import pool from '../config/db'

interface USER {
    id: string
    phone_number: string

}

export const findOrCreateUser = async(phoneNumber: string):Promise<USER> => {
    const query = `
        INSERT INTO users (phone_number, last_login)
        VALUES ($1, NOW())
        ON CONFLICT (phone_number)
        DO UPDATE SET last_login = NOW()
        RETURNING id, phone_number
    `
    const values = [phoneNumber]

    try {
        const result = await pool.query(query, values)
        return result.rows[0]
    }catch (error) {
        console.error('Ошибка при поиске или создания пользователя в БД:', error)
        throw new Error("Не удалось отобразить нового пользователя в БД")
    }
}