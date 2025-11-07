import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function proxy(request: NextRequest) {
  try {
    // Get the auth cookie
    const authCookie = request.cookies.get('auth')
    if (!authCookie?.value) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Call our validate endpoint with the cookie
    const validateUrl = new URL('/api/auth/validate', request.url)
    const validateReq = fetch(validateUrl, {
      method: 'POST',
      headers: {
        'Cookie': `auth=${authCookie.value}`
      }
    })

    const validateRes = await validateReq
    const result = await validateRes.json()

    if (!validateRes.ok || !result.valid) {
      // Clear invalid cookie and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth')
      return response
    }

    // Valid token, allow request to proceed
    return NextResponse.next()
  } catch (err) {
    console.error('Auth middleware error:', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  // Protect all admin routes
  matcher: ['/admin/:path*']
}