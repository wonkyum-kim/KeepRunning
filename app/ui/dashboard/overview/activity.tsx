'use client';

import { useSession } from 'next-auth/react';

export default function Activity() {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return 'Loading or not authenticated...';
  }
  if (status === 'authenticated') {
    return <p>Signed in as {session?.user?.email}</p>;
  }
  return <div></div>;
}
