import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import AuthGuard from './components/AuthGuard';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <SignedIn>
            {/* Use AuthGuard to check verification */}
            <AuthGuard>{children}</AuthGuard>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
