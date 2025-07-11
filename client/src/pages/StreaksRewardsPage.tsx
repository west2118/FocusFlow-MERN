import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  Flame,
  Trophy,
  Share2,
  Star,
  Zap,
  Calendar,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function StreaksRewardsPage() {
  // Sample data
  const currentStreak = 7;
  const longestStreak = 12;
  const badges = [
    { name: "3-Day Focus Streak", earned: true, icon: Flame },
    { name: "Distraction-Free Day", earned: true, icon: Zap },
    { name: "5-Day Streak", earned: true, icon: Trophy },
    { name: "Weekly Champion", earned: false, icon: Award },
    { name: "15-Day Streak", earned: false, icon: Calendar },
    { name: "Perfect Week", earned: false, icon: Star },
  ];

  const weeklyProgress = [
    { day: "Mon", checked: true },
    { day: "Tue", checked: true },
    { day: "Wed", checked: true },
    { day: "Thu", checked: true },
    { day: "Fri", checked: true },
    { day: "Sat", checked: false },
    { day: "Sun", checked: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6 pt-26">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Streaks & Rewards
          </h1>
          <p className="text-gray-600">
            Stay motivated with daily check-ins and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Check-In */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-indigo-600" />
                  Daily Check-In
                </CardTitle>
                <CardDescription>Did you stay focused today?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <p className="text-indigo-800 mb-4">
                    Mark today as focused to keep your streak going!
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                      <Check className="h-4 w-4" />
                      Yes, I stayed focused
                    </Button>
                    <Button
                      variant="outline"
                      className="border-rose-300 text-rose-700 hover:bg-rose-50">
                      I got distracted
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  Weekly Progress
                </CardTitle>
                <CardDescription>Your focus days this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center mb-1 ${
                          day.checked
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-100 text-gray-400"
                        }`}>
                        {day.checked ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          day.day[0]
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{day.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Weekly goal: 5/7 days
                  </p>
                  <Progress
                    value={71}
                    className="h-2 bg-gray-100"
                    indicatorColor="bg-indigo-600"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Current Streak */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-rose-600" />
                  Current Streak
                </CardTitle>
                <CardDescription>Don't break the chain!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-5xl font-bold text-rose-600 mb-2">
                    {currentStreak}
                  </p>
                  <p className="text-gray-600">days in a row</p>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Longest streak:{" "}
                    <span className="font-medium">{longestStreak} days</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="ghost" className="text-indigo-600 gap-2">
                  <Share2 className="h-4 w-4" />
                  Share your streak
                </Button>
              </CardFooter>
            </Card>

            {/* Badges & Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-indigo-600" />
                  Your Badges
                </CardTitle>
                <CardDescription>Earn rewards for your focus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {badges.map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border flex flex-col items-center text-center ${
                          badge.earned
                            ? "border-indigo-200 bg-indigo-50"
                            : "border-gray-200 bg-gray-50 opacity-50"
                        }`}>
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                            badge.earned
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-gray-100 text-gray-400"
                          }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <p
                          className={`text-sm font-medium ${
                            badge.earned ? "text-indigo-800" : "text-gray-400"
                          }`}>
                          {badge.name}
                        </p>
                        {badge.earned ? (
                          <Badge
                            variant="outline"
                            className="mt-2 border-emerald-200 text-emerald-700 text-xs">
                            Earned
                          </Badge>
                        ) : (
                          <p className="text-xs text-gray-400 mt-2">Locked</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
