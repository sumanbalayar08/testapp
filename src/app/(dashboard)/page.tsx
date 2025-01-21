import { SignedOut } from '@clerk/nextjs';
import React from 'react'
import { SignOutButton } from '@clerk/nextjs';
import { useUser } from "@clerk/clerk-react";


const page = () => {
  
  return (
    <div>
      Hello this is page after successful authentication
      <SignOutButton/>
    </div>
  );
}

export default page