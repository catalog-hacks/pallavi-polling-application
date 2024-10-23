"use client"
import { useRouter } from 'next/navigation';

import CreatePollForm from '../../components/CreatePollForm';
import { useAuthStore } from '@/lib/Store';

const CreatePollPage = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isLoggedIn);

  if (!isAuthenticated) {
    router.push('/pages/login');
    return null; 
  }

  return (
    <div className='flex justify-center'>
      <CreatePollForm />
    </div>
  );
};

export default CreatePollPage;
