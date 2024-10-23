"use client";
import React, { useState } from 'react';
import { startRegistration } from '@simplewebauthn/browser';
import Button from '@/lib/utils/Button';
import { useRouter } from 'next/navigation';


const Registration = () => {
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    if (!username) {
      setErrorMessage('Please enter a username.');
      return;
    }

    try {
      // Use the Next.js proxied API
      const response = await fetch(`/api/register/start/${username}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        let parsedError = errorText.includes('JSON') ? JSON.parse(errorText) : errorText;
        try {
          parsedError = JSON.parse(errorText);
          setErrorMessage(`Registeration failed: ${parsedError.message || JSON.stringify(parsedError)}`);
      } catch (parseError) {
          setErrorMessage(`Registeration failed: ${errorText}`);
      }
        return;
    }
      const options = await response.json();
      const optionsJSON = options.publicKey;

      const attResponse = await startRegistration({ optionsJSON });

      const verificationResponse = await fetch('/api/register/finish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attResponse),
        credentials: 'include',
      });

      if (verificationResponse.status === 200) {
        setSuccessMessage('Registration successful!');
        router.push('/');
        return; 
      }
    } catch (error) {
      setErrorMessage(`Error during registration: ${error}`)
    }
  };

  return (
    <div >
      <a className='ml-10 absolute mt-2 font-mono text-white font-semibold bg-pink-500 px-3 py-2 rounded-full' href='/'>  Back to Dashboard</a>
      <div className='font-mono flex flex-col gap-2 justify-center items-center h-screen  '>
      <div className='flex flex-col gap-3 border-2 border-pink-300 px-8 py-11 rounded-md bg-pink-300 '>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='px-3 py-2 rounded-md'
      />
      <Button onClick={handleRegister} label='Begin Registration' className='rounded-md bg-pink-950'/>
      </div>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
    </div>
  );
};

export default Registration;
