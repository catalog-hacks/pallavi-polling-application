/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback, useEffect } from 'react';

export const useBase64ToBytes = (publicKey: string | undefined) => {
  const [byteArray, setByteArray] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Conversion function to handle base64 to Uint8Array conversion
  const convertBase64ToBytes = useCallback((base64Key: string) => {
    try {
      console.log("Starting base64 to byte conversion with:", base64Key); // Debug log
      const base64 = base64Key.replace(/_/g, '/').replace(/-/g, '+');

      const padding = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
      const paddedBase64 = base64 + padding;

      const binaryStr = atob(paddedBase64);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      setByteArray(bytes);
      setError(null);
      console.log("Conversion successful, byte array:", bytes); // Debug log
      return bytes;
    } catch (e) {
      console.error("Conversion error:", e);
      setError("Invalid Base64 string or decoding error");
      return null;
    }
  }, []);

  // Effect to trigger conversion when publicKey changes
  useEffect(() => {
    if (publicKey && publicKey.trim() !== "") {
      console.log("Public key received for conversion:", publicKey); // Debug log
      convertBase64ToBytes(publicKey);
    } else {
      console.error("Public key is undefined or empty."); // Debug log
      setError("Public key is undefined or empty.");
      setByteArray(null);
    }
  }, [publicKey, convertBase64ToBytes]);

  return { byteArray, error, convertBase64ToBytes };
};

export default useBase64ToBytes;
