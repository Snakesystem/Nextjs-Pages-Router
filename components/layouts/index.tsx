import React from 'react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Roboto } from 'next/font/google'

const Navbar = dynamic(() => import('./Navbar'), { ssr: false })

type AppShellProps = {
    children: React.ReactNode
}

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
})

const disabledNavbar = ["/auth/login", "/auth/register", "/404"]

export default function AppShell(props: AppShellProps) {

    const { children } = props;
    const { pathname } = useRouter();
  return (
    <main className={roboto.className}>
        { disabledNavbar.includes(pathname) ? null : <Navbar /> }
        {children}
    </main>
  )
}
