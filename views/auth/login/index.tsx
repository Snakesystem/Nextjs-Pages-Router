import Link from 'next/link'
import React, { useState } from 'react'
import styles from './Login.module.scss'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

export default function LoginView() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { push, query } = useRouter()

    const callbackUrl: any = query.callbackUrl || '/'
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('')
        setIsLoading(true)

        try {
          const result = await signIn('credentials', {
            redirect: false,
            email: e.target.email.value,
            password: e.target.password.value,
            callbackUrl
          })

          if(!result?.error) {
            setIsLoading(false);
            push(callbackUrl)
          } else {
            setIsLoading(false)
            setError("Email dan password tidak benar")
          }
        } catch (error: any) {
          setIsLoading(false)
          setError("Email dan password tidak benar")
        }
    }

  return (
    <div className={styles.login}>
        <h1 className={styles.login__title}>Login</h1>
        {error && <p className={styles.login__error}>{error}</p>}
        <div className={styles.login__form}>
            <form onSubmit={handleSubmit}>
                <div className={styles.login__form__item}>
                    <label className={styles.login__form__item__label} htmlFor="email">Email</label>
                    <input className={styles.login__form__item__input} type="email" name='email' placeholder='Email' id='email' />
                </div>
                <div className={styles.login__form__item}>
                    <label className={styles.login__form__item__label} htmlFor="password">Password</label>
                    <input className={styles.login__form__item__input} type="password" name='password' placeholder='password' id='password' />
                </div>
            <button disabled={isLoading} type='submit' className={styles.login__form__item__button}>{isLoading ? 'Loading...' : 'Login'}</button>
            </form>
            <button onClick={() => signIn('google', { callbackUrl, redirect: false })} className={styles.login__form__item__google}>Login with Google</button>
        </div>
        <p className={styles.login__link}>Tidak punya akun? daftar lah <Link href={'/auth/register'}>Klik Disini</Link></p>
    </div>
  )
}
