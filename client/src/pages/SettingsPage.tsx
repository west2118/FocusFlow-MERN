import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Download,
  Trash2,
  Bell,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function SettingsPage() {
  // Sample data
  const distractionCategories = [
    { id: "social-media", name: "Social Media", active: true },
    { id: "youtube", name: "YouTube/Video", active: true },
    { id: "news", name: "News/Browsing", active: false },
    { id: "phone", name: "Phone/Message", active: true },
    { id: "gaming", name: "Gaming", active: false },
    { id: "daydreaming", name: "Daydreaming", active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6 pt-26">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings & Profile
          </h1>
          <p className="text-gray-600">Manage your FocusFlow preferences</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Focus Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                Focus Goals
              </CardTitle>
              <CardDescription>
                Set your daily and weekly targets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="daily-goal">Daily Focus Goal</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue placeholder="Select daily goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="5">5+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weekly-goal">Weekly Target Days</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue placeholder="Select weekly days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="4">4 days</SelectItem>
                      <SelectItem value="5">5 days</SelectItem>
                      <SelectItem value="6">6 days</SelectItem>
                      <SelectItem value="7">Every day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="goal-reminders" />
                <Label htmlFor="goal-reminders">
                  Send daily goal reminders
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Distraction Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-600" />
                Distraction Categories
              </CardTitle>
              <CardDescription>
                Select which distractions to track
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {distractionCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-3">
                    <Checkbox
                      id={`category-${category.id}`}
                      defaultChecked={category.active}
                      className="h-5 w-5 border-indigo-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-gray-700">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="text-indigo-600">
                + Add custom category
              </Button>
            </CardFooter>
          </Card>

          {/* Data & Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Data & Reports</CardTitle>
              <CardDescription>Export your productivity data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Productivity Summary</p>
                    <p className="text-sm text-gray-500">
                      Last 30 days of focus sessions
                    </p>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Raw Data Export</p>
                    <p className="text-sm text-gray-500">
                      All your data in CSV format
                    </p>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card className="border-rose-100">
            <CardHeader>
              <CardTitle className="text-rose-700">
                Account Management
              </CardTitle>
              <CardDescription>
                Danger zone - these actions are irreversible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-rose-100 rounded-lg bg-rose-50">
                <div>
                  <p className="font-medium text-rose-800">Reset All Data</p>
                  <p className="text-sm text-rose-600">
                    Clear your focus history and start fresh
                  </p>
                </div>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Reset Data
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-rose-100 rounded-lg bg-rose-50">
                <div>
                  <p className="font-medium text-rose-800">Delete Account</p>
                  <p className="text-sm text-rose-600">
                    Permanently remove your account and all data
                  </p>
                </div>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
