import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: "", 
  login: (username) => set({ isLoggedIn: true, username }), 
  logout: () => set({ isLoggedIn: false, username: "" }), 
}));

interface PollResults {
  [key: string]: {
    votes: number;
    optionText: string;
    closed?: boolean;
  };
}


interface Store {
  pollResults: PollResults;
  updatePollResults: (pollId: string | number, optionText: string, newVoteCount: number) => void;
  closedPolls: Set<number>;
  setClosedPoll: (pollId: number) => void;
}


export const useStore = create<Store>((set) => ({
  pollResults: {},
  closedPolls: new Set<number>(),
  updatePollResults: (pollId: string | number, optionText: string, newVoteCount: number) =>
    set((state) => ({
      pollResults: {
        ...state.pollResults,
        [pollId]: {
          ...(state.pollResults[pollId] || {}), 
          votes: newVoteCount,
          optionText, 
        },
      },
    })),
    setClosedPoll: (pollId: number) => 
      set((state : Store) => ({
        closedPolls: new Set(state.closedPolls).add(pollId), 
      })),
}));
