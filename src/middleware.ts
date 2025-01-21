import { NextResponse } from 'next/server';
import { clerkClient, clerkMiddleware } from '@clerk/nextjs/server';

// This middleware will run before the page rendering
export default clerkMiddleware(async (req) => {
  const { auth } = req; // Safely extract `auth` from `req`

  if (auth && auth.userId) {
    try {
      // Fetch user data from Clerk's API
      const user = await clerkClient.users.getUser(auth.userId);

      // Check if the email is verified
      const emailVerified = user?.emailAddresses?.[0]?.verification?.verified ?? false;

      if (!emailVerified) {
        // Redirect to the verify-email page if not verified
        return NextResponse.redirect(new URL('/verify-email', req.url));
      }
    } catch (error) {
      // Handle any error that occurs while fetching user data
      console.error("Error fetching user data from Clerk:", error);
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  } else {
    // If no auth or userId is present, redirect to sign-in page
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // If the user is authenticated and email is verified, allow the request to continue
  return NextResponse.next();
});
