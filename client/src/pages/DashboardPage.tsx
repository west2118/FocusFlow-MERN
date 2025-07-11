import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Clock,
  AlertTriangle,
  BarChart2,
  Flame,
  Settings,
  Timer,
  PlusCircle,
  CheckCircle2,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-28">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Focus Summary */}
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
                      1h 45m
                    </p>
                    <p className="text-xs text-indigo-500">
                      +25m from yesterday
                    </p>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-rose-600">
                      <AlertTriangle className="h-4 w-4" />
                      <p className="text-sm">Distractions Logged</p>
                    </div>
                    <p className="text-2xl font-bold text-rose-800 mt-1">3</p>
                    <p className="text-xs text-rose-500">-2 from yesterday</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <p className="text-sm">Goal Progress</p>
                    </div>
                    <div className="mt-2">
                      <Progress value={58} className="h-2 bg-emerald-100" />
                    </div>
                    <p className="text-xs text-emerald-500 mt-1">
                      58% of 3h goal
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-xl bg-white border-none">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with your focus session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link to="/focus-session">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 py-8 gap-2 w-full">
                      <Timer className="h-5 w-5" />
                      <span className="text-lg">Start Timer</span>
                    </Button>
                  </Link>
                  <Link to="/log-distraction">
                    <Button
                      variant="outline"
                      className="border-rose-300 text-rose-700 hover:bg-rose-50 py-8 w-full gap-2">
                      <PlusCircle className="h-5 w-5" />
                      <span className="text-lg">Log Distraction</span>
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 py-8 gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-lg">Check-In</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card className="shadow-xl bg-white border-none">
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Your last 3 focus sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Coding",
                      duration: "45m",
                      time: "9:30 AM",
                      distractionCount: 1,
                    },
                    {
                      type: "Study",
                      duration: "30m",
                      time: "2:15 PM",
                      distractionCount: 2,
                    },
                    {
                      type: "Reading",
                      duration: "30m",
                      time: "4:45 PM",
                      distractionCount: 0,
                    },
                  ].map((session, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg shadow-xl border-gray-200 bg-white">
                      <div>
                        <p className="font-medium">{session.type}</p>
                        <p className="text-sm text-gray-500">
                          {session.time} • {session.duration}
                        </p>
                      </div>
                      {session.distractionCount > 0 ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {session.distractionCount}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-emerald-200 text-emerald-700 gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Clean
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Tip of the Day */}
            <Card className="shadow-xl bg-white border-none">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-indigo-600" />
                  <CardTitle>AI Tip of the Day</CardTitle>
                </div>
                <CardDescription>Powered by OpenAI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-indigo-800">
                    "When working on complex tasks, try the '20-minute rule' -
                    commit to working for just 20 minutes. Often, getting
                    started is the hardest part, and you'll likely continue past
                    the 20 minutes."
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="ghost" className="text-indigo-600 gap-1">
                  Another tip
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Current Streak */}
            <Card className="shadow-xl bg-white border-none">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-rose-600" />
                  <CardTitle>Current Streak</CardTitle>
                </div>
                <CardDescription>Don't break the chain!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-indigo-800">7</p>
                    <p className="text-indigo-600">days in a row</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex justify-around">
            {[
              { name: "Dashboard", icon: Home, active: true },
              { name: "Sessions", icon: Clock },
              { name: "Distractions", icon: AlertTriangle },
              { name: "Insights", icon: BarChart2 },
              { name: "Streaks", icon: Flame },
              { name: "Settings", icon: Settings },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`flex flex-col items-center px-2 py-1 text-sm font-medium rounded-md ${
                    item.active
                      ? "text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}>
                  <Icon className="h-5 w-5" />
                  <span className="mt-1">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
