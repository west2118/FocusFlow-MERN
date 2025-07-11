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
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, ChevronDown, Lightbulb, X, Clock } from "lucide-react";

export default function LogDistractionPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
            Log Distraction
          </CardTitle>
          <CardDescription>
            Track what pulled you away from focus
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Distraction Type */}
          <div className="space-y-2">
            <Label htmlFor="distraction-type">Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select distraction type" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Social Media",
                  "YouTube/Video",
                  "News/Browsing",
                  "Phone/Message",
                  "Gaming",
                  "Daydreaming",
                  "Other",
                ].map((type) => (
                  <SelectItem
                    key={type}
                    value={type.toLowerCase().replace(/\s+/g, "-")}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <div className="relative">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="How long were you distracted?" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Less than 1 minute",
                    "1-5 minutes",
                    "5-10 minutes",
                    "10-20 minutes",
                    "20-30 minutes",
                    "30+ minutes",
                  ].map((duration) => (
                    <SelectItem
                      key={duration}
                      value={duration.toLowerCase().replace(/\s+/g, "-")}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 opacity-50" />
                        {duration}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Why did this distraction happen? (e.g. 'Felt bored', 'Got a notification')"
              rows={3}
            />
          </div>

          {/* AI Response (Hidden by default) */}
          <div className="hidden bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-indigo-800 mb-1">
                  AI Suggestion
                </p>
                <p className="text-indigo-700">
                  "I notice you got distracted when feeling bored. Try the
                  5-minute rule: commit to just 5 more minutes of focused work.
                  Often, momentum builds and you'll want to continue!"
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" className="border-gray-300">
            Cancel
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Log & Get AI Tip
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
