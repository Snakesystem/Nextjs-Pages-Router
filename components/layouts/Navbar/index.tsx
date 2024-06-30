import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './Navbar.module.css'
import React from 'react'
import Script from 'next/script';
import Image from 'next/image';

export default function Navbar() {

  const { data }: any = useSession();

  return (
    <div className={styles.navbar}>
      <div className="big" id='title'></div>
      <Script id='script-title' strategy='lazyOnload'>
        {`document.getElementById('title').innerHTML = 'Navbar'`}
      </Script>
      <div className={styles.profile}>
        { data?.user?.image && <Image width={43} height={40} className={styles.avatar} src={data.user.image} alt={data.user.fullname} /> }
        { data && <p>{data.user.fullname}</p> }
        {data ? <button className={styles.button} onClick={() => signOut()}>Sign Out</button> : <button className={styles.button} onClick={() => signIn()}>Sign In</button>}
      </div>
    </div>
  )
}
