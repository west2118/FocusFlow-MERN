import { create } from "zustand";

type User = {
  _id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  dailyTarget: string;
  weeklyTarget: string;
  distractions: string[];
  workCategories: string[];
  blockedSites: string[]; // likely a typo if you also have `blockedSite`
  blockedSite: string[];
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
  __v: number;
};

type UserStore = {
  userToken: string | null;
  user: User | null;
  setUserToken: (token: string | null) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  userToken: null,
  setUser: (user) => set({ user }),
  setUserToken: (token) => set({ userToken: token }),
  clearUser: () => set({ userToken: null, user: null }),
}));
