import React from 'react'
import styles from '@/styles/404.module.scss'
import Image from 'next/image'

export default function Custom404() {
  return (
    <div className={styles.error}>
        {/* <img className={styles.error__image} src="/notfound.svg" alt="tidak ditemukan" /> */}
        <Image src="/notfound.svg" alt="tidak ditemukan" width={100} height={100} className={styles.error__image} />
        <div>404 | Halam tidak ditemukan</div>
    </div>
  )
}
