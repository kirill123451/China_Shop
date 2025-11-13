import { useState, useRef, useEffect, use } from 'react'  
import logo from '../photo/Logo.png'  
import './LoginButton.css'  

export default function LoginButton() {
    const [step, setStep] = useState<'phone' | 'code'>('phone')  
    const [phone, setPhone] = useState('')  
    const [code, setCode] = useState('')  
    const [isLoading, setIsLoading] = useState(false)  
    const [error, setError] = useState('')
    const [cleanPhoneNumber, setCleanPhoneNumber] = useState('')   
    const phoneInputRef = useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        if(cleanPhoneNumber) {
            console.log(cleanPhoneNumber)
        }
    },[cleanPhoneNumber])

    const formatPhoneDisplay = (value: string) => {
        const numbers = value.replace(/\D/g, '')  

        let formatted = numbers  
        if (numbers.startsWith('8') && numbers.length === 11) {
            formatted = '7' + numbers.slice(1)  
        }
        
        if (formatted.startsWith('7') && formatted.length === 11) {
            return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7, 9)}-${formatted.slice(9, 11)}`  
        }
        
        return value  
    }  

    const getCleanPhone = (value: string) => {
        let numbers = value.replace(/\D/g, '')  
        
        if (numbers.startsWith('8') && numbers.length === 11) {
            numbers = '7' + numbers.slice(1)  
        }
        
        if (numbers.length === 10 && !numbers.startsWith('7')) {
            numbers = '7' + numbers  
        }
        
        return numbers  
    }  

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value  
        const cleaned = value.replace(/[^\d+()\-\s]/g, '')  
        setPhone(cleaned)  
        setError('')  
    }  

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault()  
        const cleanPhone = getCleanPhone(phone)
        
        if (cleanPhone.length === 11 && cleanPhone.startsWith('7')) {
            setIsLoading(true)  
            setError('')  
            
            setCleanPhoneNumber(cleanPhone)

            setTimeout(() => {
                setIsLoading(false)  
                setStep('code')  
            }, 1500)  
        } else {
            setError('Введите корректный номер телефона')  
        }
    }  

    const handleCodeSubmit = (e: React.FormEvent) => {
        e.preventDefault()  
        if (code.length === 4) {
            setIsLoading(true)  
            setTimeout(() => {
                setIsLoading(false)  
                console.log('Успешная авторизация!')  
            }, 1500)  
        } else {
            setError('Введите 4-значный код')  
        }
    }  

    const handleBackToPhone = () => {
        setStep('phone')  
        setCode('')  
        setError('')  
    }  

    useEffect(() => {
        if (step === 'phone' && phoneInputRef.current) {
            phoneInputRef.current.focus()  
        }
    }, [step])  

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img className="login-logo" src={logo} alt="Логотип" />
                    <h2 className="login-title">Авторизация</h2>
                </div>

                {step === 'phone' ? (
                    <form onSubmit={handlePhoneSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">
                                Введите номер телефона
                            </label>
                            <input
                                ref={phoneInputRef}
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                                className="form-input"
                                placeholder="+7 (912) 777-77-77"
                                disabled={isLoading}
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button
                            type="submit"
                            className={`login-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                'Получить код'
                                
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleCodeSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="code" className="form-label">
                                Введите код из СМС
                            </label>
                            <div className="code-input-container">
                                <input
                                    type="text"
                                    id="code"
                                    value={code}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '')  
                                        if (value.length <= 4) {
                                            setCode(value)  
                                            setError('')  
                                        }
                                    }}
                                    required
                                    className="code-input"
                                    placeholder="1234"
                                    maxLength={4}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="form-hint">
                                Код отправлен на номер {formatPhoneDisplay(phone)}
                            </div>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <div className="code-actions">
                            <button
                                type="button"
                                className="back-button"
                                onClick={handleBackToPhone}
                                disabled={isLoading}
                            >
                                Изменить номер
                            </button>
                            <button
                                type="submit"
                                className={`login-button ${isLoading ? 'loading' : ''}`}
                                disabled={code.length !== 4 || isLoading}
                            >
                                {isLoading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    'Войти'
                                )}
                            </button>
                        </div>
                    </form>
                )}

                <div className="login-footer">
                    <p className="privacy-text">
                        Нажимая «Получить код», вы соглашаетесь с политикой конфиденциальности
                    </p>
                </div>
            </div>
        </div>
    )  
}