export type Distraction = {
  _id: string;
  distraction: string;
  minutes: number;
};

export type Session = {
  _id: string;
  userUid: string;
  goal: string;
  sessionCategory: string;
  duration: number;
  status: "focused" | "interrupted";
  distractions: Distraction[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
};
