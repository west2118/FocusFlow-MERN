import type { User } from "@/types/user";
import { create } from "zustand";

type UserStore = {
  userToken: string | null;
  user: User | null;
  setUserToken: (token: string | null) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  updatedBlockSite: (site: string[]) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  userToken: null,
  setUser: (user) => set({ user }),
  setUserToken: (token) => set({ userToken: token }),
  clearUser: () => set({ userToken: null, user: null }),
  updatedBlockSite: (sites) =>
    set((state) => ({
      user: state.user ? { ...state.user, blockedSite: sites } : null,
    })),
}));
