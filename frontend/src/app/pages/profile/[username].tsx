import { useAuthStore } from '@/lib/Store';
import { useRouter } from 'next/router';
import React from 'react';

const Profile = () => {
  const { username } = useAuthStore(); // Access username from the store
  const router = useRouter();
  const { username: paramUsername } = router.query; // Get the dynamic route parameter

  return (
    <div>
      Hello, {username || paramUsername || 'Guest'}!
    </div>
  );
};

export default Profile;
