import { Card, CardContent } from "@/components/ui/card";
import { convertMinsToHoursAndMins } from "@/constants/convertMinsToHoursAndMins";
import { convertSecToHrAndMin } from "@/constants/convertSecToHrAndMin";
import type { User } from "@/types/user";
import { AlertTriangle, Clock, Flame } from "lucide-react";

type Distraction = {
  _id: string;
  distraction: string;
  minutes: number;
};

type StatsCardsProps = {
  allDistractions: Distraction[];
  user: User | null;
};

const StatsCards = ({ allDistractions, user }: StatsCardsProps) => {
  const totalDistractions = allDistractions.length;
  const timeLost = allDistractions.reduce((a, b) => a + b.minutes, 0);
  const totalBlockedSite = user?.blockedSite.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Distractions</p>
              <p className="text-2xl font-bold">{totalDistractions}</p>
            </div>
            <div className="bg-rose-100 p-3 rounded-full">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Time Lost</p>
              <p className="text-2xl font-bold">
                {convertMinsToHoursAndMins(timeLost)}
              </p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Blocked Site</p>
              <p className="text-2xl font-bold">{totalBlockedSite}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full">
              <Flame className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
