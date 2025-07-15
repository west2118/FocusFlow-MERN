export type User = {
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
