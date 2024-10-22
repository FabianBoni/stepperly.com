import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/verification-sent(.*)', '/sign-in(.*)', '/sign-up(.*)'])

function handleEmailVerification(request: NextRequest) {
  if (request.nextUrl.pathname === '/sign-up/verify-email-address') {
    return NextResponse.redirect(new URL('/verification-sent', request.url))
  }
}

export default clerkMiddleware((auth, request) => {
  const emailVerificationResponse = handleEmailVerification(request)
  if (emailVerificationResponse) return emailVerificationResponse
  
  if (!isPublicRoute(request)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}