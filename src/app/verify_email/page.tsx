import { useState } from "react";
import { clerkClient, auth } from "@clerk/nextjs/server";

export default async function VerifyEmail() {
  const { userId } = await auth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = await clerkClient();


    return (
      <div>
        <h1>Email Verification Required</h1>
        <p>
          Your email address is not verified yet. Please verify it to access the
          full application.
        </p>

        <button>
          {loading ? "Sending..." : "Resend Verification Email"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  };

