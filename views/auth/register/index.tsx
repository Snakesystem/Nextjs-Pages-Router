import Link from 'next/link'
import React, { useState } from 'react'
import styles from './Register.module.scss'
import { useRouter } from 'next/router'

export default function RegisterView() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { push } = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('')
        setIsLoading(true)
        const data = {
            fullname: e.target.fullname.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        const result = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(result.status === 200) {
            e.target.reset()
            setIsLoading(false)
            push('/auth/login')
        } else {
            setIsLoading(false)
            setError(result.status === 400 ? 'Email sudah terdaftar' : 'Terjadi kesalahan')
        }
    }

  return (
    <div className={styles.register}>
        <h1 className={styles.register__title}>Register</h1>
        {error && <p className={styles.register__error}>{error}</p>}
        <div className={styles.register__form}>
            <form onSubmit={handleSubmit}>
                <div className={styles.register__form__item}>
                    <label className={styles.register__form__item__label} htmlFor="fullname">Full Name</label>
                    <input className={styles.register__form__item__input} type="text" name='fullname' placeholder='fullname' id='fullname' />
                </div>
                <div className={styles.register__form__item}>
                    <label className={styles.register__form__item__label} htmlFor="email">Email</label>
                    <input className={styles.register__form__item__input} type="email" name='email' placeholder='Email' id='email' />
                </div>
                <div className={styles.register__form__item}>
                    <label className={styles.register__form__item__label} htmlFor="password">Password</label>
                    <input className={styles.register__form__item__input} type="password" name='password' placeholder='password' id='password' />
                </div>
                <button disabled={isLoading} type='submit' className={styles.register__form__item__button}>{isLoading ? 'Loading...' : 'Register'}</button>
            </form>
        </div>
        <p className={styles.register__link}>Sudah punya akun? login euy <Link href={'/auth/login'}>Disini</Link></p>
    </div>
  )
}
