"use client";
import React, { useState, useEffect } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import Button from "@/lib/utils/Button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/Store";
import { ensureString } from "@/lib/validation";




const Authentication:React.FC = () => {
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  // Function to handle authentication process
  const handleAuthentication = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!username) {
      setErrorMessage("Please enter a username.");
      return;
    }

    setLoading(true);

    // Fetching authentication options from the server
    try {
      const response = await fetch(`/api/login/start/${username}`, {
        method: "POST",
        credentials: "include",
      });

      const options = await response.json();
      const authOptions = {
        challenge: options.publicKey.challenge,
        timeout: options.publicKey.timeout,
        rpId: options.publicKey.rpId,
        allowCredentials: options.publicKey.allowCredentials.map((cred) => ({
          id: ensureString(cred.id),
          type: cred.type,
          transports: cred.transports || [],
        })),
        userVerification: options.publicKey.userVerification,
      };

      // Starting the authentication process
      let authResponse;
      try {
        authResponse = await startAuthentication({
          optionsJSON: authOptions,
          useBrowserAutofill: false,
          verifyBrowserAutofillInput: true,
        });
      } catch (error) {
        setErrorMessage(`Authentication failed: ${error}`);
        return;
      }

      // Verifying the authentication response
      const verificationResponse = await fetch('/api/login/finish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authResponse),
        credentials: 'include',
      });

      // Checking if the verification response is successful
      if (verificationResponse.status === 200) {
        login(username);
        setSuccessMessage("Authentication successful!");
        router.push("/");
        return;
      }
    } catch (error) {
      setErrorMessage(`${error}`);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <a
        className="ml-10 absolute mt-2 font-mono text-white font-semibold bg-pink-500 px-3 py-2 rounded-full"
        href="/"
      >
        Back to Dashboard
      </a>
      <div className="font-mono flex flex-col gap-2 justify-center items-center h-screen">
        <div className="flex flex-col gap-3 border-2 border-pink-300 px-8 py-11 rounded-md bg-pink-300">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 rounded-md"
          />
          <Button
            onClick={handleAuthentication}
            label={loading ? 'Authenticating...' : 'Begin Authentication'}
            className="rounded-md bg-pink-950"
          />
        </div>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Authentication;
