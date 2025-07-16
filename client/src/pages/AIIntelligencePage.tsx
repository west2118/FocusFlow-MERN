import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  AlertTriangle,
  Trophy,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import DistractionAnalysis from "@/components/app/insights/DistractionAnalysis";
import type { Session } from "@/types/sessions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { convertSecToHrAndMin } from "@/constants/convertSecToHrAndMin";

const daysName = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const colors = [
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#f59e0b",
  "#10b981",
  "#f43f5e",
  "#10b981",
];

// Sample data
const focusTrends = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 70 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 30 },
  { day: "Sun", value: 20 },
];

const commonDistractions = [
  { name: "Social Media", count: 12, impact: "High" },
  { name: "Phone Notifications", count: 8, impact: "Medium" },
  { name: "Email Checking", count: 5, impact: "Medium" },
  { name: "Web Browsing", count: 4, impact: "Low" },
];

export default function AIIntelligencePage() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.userToken);
  const { fetchData, items, error, loading } = useFetchData<Session>();

  useEffect(() => {
    if (!token) return;

    fetchData(
      "get",
      "http://localhost:8080/api/range-session?range=lastWeek",
      token
    );
  }, [token]);

  const getLastWeekDates = () => {
    const today = new Date();
    const day = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - 7 - (day === 0 ? 6 : day - 1));

    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const formatted = date.toISOString().split("T")[0];
      weekDates.push(formatted);
    }

    return weekDates;
  };

  const weekLastWeekDates = getLastWeekDates();

  const calculateSeconds = (date: string) => {
    const filteredItems = items.filter(
      (item) => item.createdAt.split("T")[0] === date
    );

    return filteredItems
      .flatMap((item) => item.duration)
      .reduce((acc, curr) => acc + curr, 0);
  };

  const allDistractions = items.flatMap((item) => item.distractions);

  const commonDistractions =
    allDistractions?.reduce((acc, curr) => {
      acc[curr.distraction] = (acc[curr.distraction] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

  const data = weekDays.map((day, index) => ({
    name: day,
    value: calculateSeconds(weekLastWeekDates[index]),
    fill: colors[index],
  }));

  const days = daysName.map((day, index) => ({
    day,
    value: calculateSeconds(weekLastWeekDates[index]),
  }));

  const getHighOrLowDay = (category: string) => {
    if (category === "high") {
      return days.reduce((max, curr) => (curr.value > max.value ? curr : max));
    } else if (category === "low") {
      return days.reduce((max, curr) => (curr.value < max.value ? curr : max));
    }
  };

  const bestDay = getHighOrLowDay("high");
  const badDay = getHighOrLowDay("low");

  const dailyTarget = Number(user?.dailyTarget.charAt(0)) * 60 * 60;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 pt-26">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
            <p className="text-gray-600">
              Your personalized productivity analysis
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Last updated: Today at 9:42 AM</span>
            <Button variant="ghost" size="sm" className="text-indigo-600">
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Weekly Performance
                </CardTitle>
                <CardDescription>
                  Your focus patterns over the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-58 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis
                        tickFormatter={(value) => {
                          const hours = value / 3600;
                          return hours % 1 === 0
                            ? `${hours}h`
                            : `${hours.toFixed(1)}h`;
                        }}
                      />
                      <Tooltip
                        formatter={(value) => [
                          `${convertSecToHrAndMin(Number(value))}`,
                          "Duration",
                        ]}
                        labelFormatter={(label) => `Day: ${label}`}
                      />
                      <Bar
                        dataKey="value"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-600">Best Day</p>
                    <p className="text-xl font-bold text-indigo-800">
                      {bestDay?.day}
                    </p>
                    <p className="text-xs text-indigo-500">
                      {Math.min(
                        (Number(bestDay?.value) / dailyTarget) * 100,
                        100
                      )}
                      % focus rating
                    </p>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg">
                    <p className="text-sm text-rose-600">Needs Improvement</p>
                    <p className="text-xl font-bold text-rose-800">
                      {badDay?.day}
                    </p>
                    <p className="text-xs text-rose-500">
                      {Math.min(
                        (Number(badDay?.value) / dailyTarget) * 100,
                        100
                      )}
                      % focus rating
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Distraction Analysis */}
            <DistractionAnalysis commonDistractions={commonDistractions} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-indigo-600" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized tips to improve your focus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-indigo-800 mb-1">
                        Try 10-minute micro goals
                      </p>
                      <p className="text-indigo-700 text-sm">
                        Break your work into ultra-small chunks. Commit to just
                        10 minutes at a time. You'll often continue past the 10
                        minutes once you get started.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-indigo-800 mb-1">
                        Schedule social media time
                      </p>
                      <p className="text-indigo-700 text-sm">
                        You check social media most around 2-4 PM. Try
                        scheduling 15-minute "allowed" social media breaks to
                        satisfy the urge without losing focus.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Motivation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-indigo-600" />
                  Weekly Motivation
                </CardTitle>
                <CardDescription>You're making great progress!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-indigo-100 to-blue-100 p-4 rounded-lg">
                  <p className="text-indigo-800">
                    "This week you increased your focus time by 15% compared to
                    last week! The consistency you're building will compound
                    into remarkable productivity. Keep going - you've got this!"
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-indigo-600">
                  Share achievement
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
