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

export default function AIIntelligencePage() {
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
                <div className="flex items-end justify-between h-48 mt-4 gap-1">
                  {focusTrends.map((day, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-indigo-100 rounded-t-sm hover:bg-indigo-200 transition-colors"
                        style={{ height: `${day.value}%` }}
                      />
                      <span className="text-xs mt-2 text-gray-500">
                        {day.day}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-600">Best Day</p>
                    <p className="text-xl font-bold text-indigo-800">Friday</p>
                    <p className="text-xs text-indigo-500">90% focus rating</p>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg">
                    <p className="text-sm text-rose-600">Needs Improvement</p>
                    <p className="text-xl font-bold text-rose-800">Saturday</p>
                    <p className="text-xs text-rose-500">30% focus rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Distraction Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-600" />
                  Distraction Analysis
                </CardTitle>
                <CardDescription>
                  What's pulling you away from focus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonDistractions.map((distraction, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{distraction.name}</span>
                        <span className="text-sm text-gray-500">
                          {distraction.count} times ({distraction.impact}{" "}
                          impact)
                        </span>
                      </div>
                      <Progress
                        value={(distraction.count / 12) * 100}
                        className="h-2 bg-gray-100"
                        indicatorColor={
                          distraction.impact === "High"
                            ? "bg-rose-500"
                            : distraction.impact === "Medium"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-indigo-600">
                  View detailed breakdown
                </Button>
              </CardFooter>
            </Card>
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
