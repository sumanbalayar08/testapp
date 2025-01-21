import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'

export async function fetchUserData() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in"); // Redirect to sign-in if not authenticated
  }

  const client = await clerkClient();

  // Use Clerk's server-side API to get user data
  const user = await client.users.getUser(userId);
   if (!user) {
    redirect('/login');
  }

  console.log("User Details",user)

  const isVerified = user?.publicMetadata?.verified ?? false;

  console.log("Verification Status",isVerified)

  if (!isVerified) {
    console.log("fUCK OFF")
    redirect("/verify_email")
  }

  return user;
}
