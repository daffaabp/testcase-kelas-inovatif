import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Auth routes yang tidak memerlukan session
    const publicAuthRoutes = ['/login', '/register', '/forgot-password', '/reset-password']
    
    // Protected routes yang memerlukan session
    const protectedRoutes = ['/dashboard', '/home']

    const isAuthRoute = publicAuthRoutes.some(route => 
        request.nextUrl.pathname.startsWith(route)
    )
    
    const isProtectedRoute = protectedRoutes.some(route => 
        request.nextUrl.pathname.startsWith(route)
    )

    // Redirect ke login jika mencoba akses protected route tanpa session
    if (!session && isProtectedRoute) {
        const redirectUrl = new URL('/login', request.url)
        redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }

    // Redirect ke dashboard jika sudah login tapi mencoba akses auth routes
    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return res
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/home/:path*',
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
        '/auth/callback'
    ]
}