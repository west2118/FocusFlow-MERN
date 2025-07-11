import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-3xl mx-auto ">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">
            Welcome to FocusFlow
          </h1>
          <p className="text-lg text-indigo-700">
            Your personal productivity coach
          </p>

          <div className="mt-6">
            <Progress value={33} className="h-2 bg-indigo-100" />
            <p className="text-sm text-indigo-600 mt-2">Step 1 of 3</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Focus Goals Card */}
          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-800">
                Set Your Focus Goals
              </CardTitle>
              <CardDescription>
                What targets would you like to set for your focused work?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="daily-hours" className="text-indigo-700">
                      Daily Focus Target
                    </Label>
                    <div className="relative">
                      <select
                        id="daily-hours"
                        className="block w-full px-4 py-2 border border-indigo-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>1 hour/day</option>
                        <option>2 hours/day</option>
                        <option selected>3 hours/day</option>
                        <option>4 hours/day</option>
                        <option>5+ hours/day</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weekly-days" className="text-indigo-700">
                      Weekly Target
                    </Label>
                    <div className="relative">
                      <select
                        id="weekly-days"
                        className="block w-full px-4 py-2 border border-indigo-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>3 days/week</option>
                        <option>4 days/week</option>
                        <option selected>5 days/week</option>
                        <option>6 days/week</option>
                        <option>7 days/week</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Categories Card */}
          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-800">
                Choose Work Categories
              </CardTitle>
              <CardDescription>
                What types of focused work do you want to track?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Study",
                  "Coding",
                  "Reading",
                  "Creative Work",
                  "Writing",
                  "Research",
                  "Planning",
                  "Other",
                ].map((category) => (
                  <div key={category} className="flex items-center space-x-3">
                    <Checkbox
                      id={`category-${category}`}
                      defaultChecked={[
                        "Study",
                        "Coding",
                        "Reading",
                        "Creative Work",
                      ].includes(category)}
                      className="h-5 w-5 border-indigo-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-indigo-700">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distractions Card */}
          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-800">
                Monitor Your Distractions
              </CardTitle>
              <CardDescription>
                What typically pulls you away from focused work?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "YouTube",
                  "TikTok",
                  "Gaming",
                  "News Sites",
                  "Social Media",
                  "Email",
                  "Phone",
                  "Other",
                ].map((distraction) => (
                  <div
                    key={distraction}
                    className="flex items-center space-x-3">
                    <Checkbox
                      id={`distraction-${distraction}`}
                      defaultChecked={[
                        "YouTube",
                        "TikTok",
                        "Gaming",
                        "News Sites",
                      ].includes(distraction)}
                      className="h-5 w-5 border-indigo-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                    <Label
                      htmlFor={`distraction-${distraction}`}
                      className="text-indigo-700">
                      {distraction}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
              Back
            </Button>
            <Link to="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Continue Setup
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
