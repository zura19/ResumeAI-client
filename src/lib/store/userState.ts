import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/User";

interface State {
  user: User | null;
}

interface Actions {
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export type UserStore = State & Actions;

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
    },
  ),
);
