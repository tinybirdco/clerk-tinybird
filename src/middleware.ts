import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export default clerkMiddleware(async (auth) => {
  const authentication = await auth()
  const { userId, sessionId, getToken } = authentication

  // If user is not authenticated, continue without modification
  if (!userId || !sessionId) {
    console.log('No user or session found')
    const response = NextResponse.next()
    response.headers.set('x-tinybird-token', process.env.NEXT_PUBLIC_TINYBIRD_API_KEY || '')
    return response
  }

  const token = await getToken({ template: "tinybird" })

  try {
    const response = NextResponse.next()
    response.headers.set('x-tinybird-token', token || '')
    return response
  } catch (error) {
    console.error('Middleware error:', error)
    const response = NextResponse.next()
    response.headers.set('x-tinybird-token', process.env.NEXT_PUBLIC_TINYBIRD_API_KEY || '')
    return response
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
} 