import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Progress } from "../../ui/progress";
import useFetchData from "@/hooks/useFetchData";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import type { Session } from "@/types/sessions";
import { convertMinsToHoursAndMins } from "@/constants/convertMinsToHoursAndMins";
import { convertSecToHrAndMin } from "@/constants/convertSecToHrAndMin";

const TodaySummaryCard = () => {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.userToken);
  const { fetchData: fetchToday, items: itemsToday } = useFetchData<Session>();
  const { fetchData: fetchYesterday, items: itemsYesterday } =
    useFetchData<Session>();

  useEffect(() => {
    if (!token) return;

    fetchToday(
      "get",
      "http://localhost:8080/api/range-session?range=today",
      token
    );
    fetchYesterday(
      "get",
      "http://localhost:8080/api/range-session?range=yesterday",
      token
    );
  }, [token]);

  const calculateMinutes = (sessions: Session[]) => {
    return sessions
      .flatMap((session) => session.duration)
      .reduce((a, b) => a + b, 0);
  };

  const getTotalDistraction = (sessions: Session[]) => {
    return sessions.flatMap((session) => session.distractions);
  };

  const userDailyTarget = Number(user?.dailyTarget.charAt(0)) * 60 * 60;

  const todayTime = calculateMinutes(itemsToday);
  const yesterdayTime = calculateMinutes(itemsYesterday);

  const todayDistraction = getTotalDistraction(itemsToday);
  const yesterdayDistraction = getTotalDistraction(itemsYesterday);

  const differenceTime = todayTime - yesterdayTime;
  const differenceDistraction =
    todayDistraction.length - yesterdayDistraction.length;

  const goalProgress = Math.min((todayTime / userDailyTarget) * 100, 100);

  return (
    <Card className="shadow-xl bg-white border-none">
      <CardHeader>
        <CardTitle>Today's Focus Summary</CardTitle>
        <CardDescription>Your productivity at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-indigo-600">
              <Clock className="h-4 w-4" />
              <p className="text-sm">Total Focus Time</p>
            </div>
            <p className="text-2xl font-bold text-indigo-800 mt-1">
              {convertSecToHrAndMin(todayTime)}
            </p>
            <p className="text-xs text-indigo-500">
              {Number(differenceTime) > 0
                ? `↑ ${convertSecToHrAndMin(differenceTime)} `
                : `↓ ${convertSecToHrAndMin(Math.abs(differenceTime))} `}
              from yesterday
            </p>
          </div>
          <div className="bg-rose-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-sm">Distractions Logged</p>
            </div>
            <p className="text-2xl font-bold text-rose-800 mt-1">
              {todayDistraction.length}
            </p>
            <p className="text-xs text-rose-500">
              {Number(differenceDistraction) > 0
                ? `↑ ${differenceDistraction} `
                : `↓ ${Math.abs(differenceDistraction)} `}
              from yesterday
            </p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              <p className="text-sm">Daily Goal Progress</p>
            </div>
            <p className="text-2xl font-bold text-emerald-800 mt-1">
              {Math.round(goalProgress)}%
            </p>
            <div className="mt-2">
              <Progress value={goalProgress} className="h-2 bg-emerald-100" />
            </div>
            <p className="text-xs text-emerald-500 mt-1">
              {user?.dailyTarget.slice(0, 1)}hrs goal
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaySummaryCard;
