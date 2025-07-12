import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
import {
  AlertTriangle,
  Globe,
  Clock,
  Trash2,
  Flame,
  BarChart2,
  Zap,
  Lock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import axios from "axios";
import { auth } from "@/firebase";
import { toast } from "react-toastify";

// Sample distraction data
const distractions = [
  {
    id: 1,
    type: "Social Media",
    url: "twitter.com",
    duration: 12,
    date: "2023-11-15",
  },
  { id: 2, type: "News", url: "cnn.com", duration: 8, date: "2023-11-14" },
  {
    id: 3,
    type: "YouTube",
    url: "youtube.com",
    duration: 25,
    date: "2023-11-13",
  },
  {
    id: 4,
    type: "Shopping",
    url: "amazon.com",
    duration: 18,
    date: "2023-11-12",
  },
];

function getDistractionColor(type: any) {
  switch (type) {
    case "Social Media":
      return "bg-blue-100 text-blue-600";
    case "News":
      return "bg-purple-100 text-purple-600";
    case "YouTube":
      return "bg-red-100 text-red-600";
    case "Shopping":
      return "bg-amber-100 text-amber-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function DistractionDashboard() {
  const [siteText, setSiteText] = useState("");

  const handleAddBlockSite = async () => {
    if (siteText.trim().length === 0) {
      return toast.error("Missing Required Field");
    }

    const token = await auth.currentUser?.getIdToken();

    try {
      const response = await axios.put(
        "http://localhost:8080/api/block-sites",
        {
          site: siteText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 ">
      <div className="max-w-6xl mx-auto space-y-6 pt-26">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-rose-600" />
              Distraction Tracker
            </h1>
            <p className="text-gray-600">
              Identify and conquer your focus breakers
            </p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Zap className="h-4 w-4 mr-2" />
            New Distraction
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Log New Distraction */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Log New Distraction</CardTitle>
                <CardDescription>What pulled you away?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Distraction Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="news">News/Browsing</SelectItem>
                      <SelectItem value="youtube">YouTube/Video</SelectItem>
                      <SelectItem value="shopping">Online Shopping</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Website URL</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="https://" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Input type="number" placeholder="5" />
                </div>

                <Button className="w-full bg-rose-600 hover:bg-rose-700 mt-2">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Log Distraction
                </Button>

                {/* Blocked Websites Section */}
                <div className="pt-6 border-t mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-indigo-600" />
                      Blocked During Focus
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-indigo-600">
                      + Add Website
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {[
                      "twitter.com",
                      "youtube.com",
                      "facebook.com",
                      "instagram.com",
                    ].map((site, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{site}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-rose-600 hover:bg-rose-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Input
                      name="siteText"
                      value={siteText}
                      onChange={(e) => setSiteText(e.target.value)}
                      placeholder="Add website to block (e.g. reddit.com)"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleAddBlockSite}
                      className="bg-indigo-600 hover:bg-indigo-700">
                      Block
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Distraction Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Total Distractions
                      </p>
                      <p className="text-2xl font-bold">14</p>
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
                      <p className="text-2xl font-bold">2h 45m</p>
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
                      <p className="text-sm text-gray-500">Current Streak</p>
                      <p className="text-2xl font-bold">3 days</p>
                    </div>
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Flame className="h-5 w-5 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Distraction List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-indigo-600" />
                  Your Distraction Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {distractions.map((distraction) => (
                    <div
                      key={distraction.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full ${getDistractionColor(
                            distraction.type
                          )}`}>
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{distraction.type}</p>
                          <a
                            href={`https://${distraction.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:underline">
                            {distraction.url}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">
                            {distraction.duration} mins
                          </p>
                          <p className="text-sm text-gray-500">
                            {distraction.date}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-rose-600 hover:bg-rose-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Distraction Frequency */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Distraction Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-1">
                  {[5, 8, 12, 7, 3, 9, 4].map((value, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1">
                      <div
                        className={`w-full rounded-t-sm transition-all ${
                          value > 8
                            ? "bg-rose-500"
                            : value > 5
                            ? "bg-amber-400"
                            : "bg-emerald-500"
                        }`}
                        style={{ height: `${value * 10}%` }}
                      />
                      <span className="text-xs mt-2 text-gray-500">
                        {
                          ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                            index
                          ]
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
