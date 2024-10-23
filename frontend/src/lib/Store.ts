// store.ts
import { create } from "zustand";

// Define the types for your store's state
interface AuthState {
    isLoggedIn: boolean;
    username: string;
    login: (username: string) => void; // Add type to the parameter
    logout: () => void;
}

// Create the Zustand store
export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    username: '', // Change '=' to ':' for correct syntax
    login: (username) => set({ isLoggedIn: true, username }), // Correctly update the state
    logout: () => set({ isLoggedIn: false, username: '' }), // Reset username on logout
}));

