import { clerkMiddleware, createRouteMatcher, auth, clerkClient} from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()
  const client = await clerkClient()

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn()
  }

  if (userId) {
    const user = await client.users.getUser(userId)

    console.log(user)

    // Check if user is verified
    const isVerified = user?.publicMetadata?.verified ?? false

    console.log("Verification Status",isVerified)
  }
    return NextResponse.next()

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}