import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,} from '@clerk/nextjs';
  import { auth, clerkClient } from '@clerk/nextjs/server'

import './globals.css';

async function fetchUserData() {

  const { userId } = await auth()

  if (!userId) {
    return <RedirectToSignIn />;
  }

  const client = await clerkClient()

  // Use Clerk's server-side API to get user data
  const user = await client.users.getUser(userId);

  console.log("User Data:",user)

  // Check for the 'verified' flag in the public metadata
  const isVerified = user?.publicMetadata?.verified ?? false;
  return isVerified;
}

function AuthGuard({ children }: { children: React.ReactNode }) {

  // Fetch user verification status
  const isVerified = fetchUserData();

  if (isVerified === null) {
    return <div>Loading...</div>;
  }

  console.log('IS VERIFIED',isVerified)

  if (!isVerified) {
    return (
      <div>
        <h1>Account Pending Verification</h1>
        <p>Your account is awaiting verification. Please contact support or wait for an administrator to approve your account.</p>
      </div>
    );
  }

  // Render the app if verified
  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <SignedIn>
            {/* Show the user button for managing their account */}
            <UserButton />
            {/* Use AuthGuard to check verification */}
            <AuthGuard>{children}</AuthGuard>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
