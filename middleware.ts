// Middleware adalah function yang dijalankan untuk pertama kali sebelum halaman/aplikasi dijalankan
import { NextResponse, type NextRequest } from 'next/server'
import withAuth from './middlewares/withAuth';

// export function middleware(request: NextRequest) {
//     const isLogin = true;

//     if(isLogin) {
//         return NextResponse.next()
//     } else {
//         return NextResponse.redirect(new URL('/auth/login', request.url)) // kondisi ini untuk menjaga suatu halaman
//     }
// }

// export const config = {
//     matcher: [`/product`, `/about`],
// }

export function mainMiddleware(request: NextRequest) {
    const response = NextResponse.next(); //jika ada yaudah login
    return response;
}

export default withAuth(mainMiddleware, ['/profile', '/admin']) // membatasi halaman yang hanya boleh diakses jika user login