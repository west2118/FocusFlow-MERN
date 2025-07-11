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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Timer, X, Check, Plus, AlertTriangle, Clock } from "lucide-react";

export default function FocusSessionPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-indigo-600" />
            Start Focus Session
          </CardTitle>
          <CardDescription>
            Set your intention and begin your focused work
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Session Goal Input */}
          <div className="space-y-2">
            <Label htmlFor="session-goal">Session Goal</Label>
            <Input
              id="session-goal"
              placeholder="What are you focusing on? (e.g. 'Write blog post')"
            />
          </div>

          {/* Timer Selection */}
          <div className="space-y-2">
            <Label>Timer Duration</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "25 min", value: "25", desc: "Pomodoro" },
                { label: "50 min", value: "50", desc: "Double" },
                { label: "Custom", value: "custom" },
              ].map((option) => (
                <div key={option.value} className="h-full">
                  <input
                    type="radio"
                    id={`duration-${option.value}`}
                    name="duration"
                    value={option.value}
                    className="hidden peer"
                    defaultChecked={option.value === "25"}
                  />
                  <Label
                    htmlFor={`duration-${option.value}`}
                    className="h-full flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-600">
                    <span className="font-medium">{option.label}</span>
                    {option.desc && (
                      <span className="text-xs text-muted-foreground">
                        {option.desc}
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Timer Display (Static) */}
          <div className="flex flex-col items-center py-6">
            <div className="text-5xl font-mono font-bold text-indigo-800 mb-2">
              25:00
            </div>
            <div className="flex gap-2">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Start Session
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>

          {/* Session Completion (Hidden by default) */}
          <div className="hidden space-y-4">
            <div className="space-y-2">
              <Label>Session Status</Label>
              <RadioGroup
                defaultValue="completed"
                className="grid grid-cols-2 gap-2">
                <div>
                  <RadioGroupItem
                    value="completed"
                    id="completed"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="completed"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 peer-data-[state=checked]:bg-emerald-50">
                    <Check className="h-6 w-6 text-emerald-600 mb-1" />
                    <span className="font-medium">Completed</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="interrupted"
                    id="interrupted"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="interrupted"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-rose-600 peer-data-[state=checked]:bg-rose-50">
                    <X className="h-6 w-6 text-rose-600 mb-1" />
                    <span className="font-medium">Interrupted</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Distraction Log */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  Distractions
                </Label>
                <Button variant="ghost" size="sm" className="text-indigo-600">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                {[
                  { id: "1", label: "Checked phone", time: "2 min" },
                  { id: "2", label: "Went on Twitter", time: "5 min" },
                ].map((distraction) => (
                  <div
                    key={distraction.id}
                    className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Checkbox id={`distraction-${distraction.id}`} />
                      <Label htmlFor={`distraction-${distraction.id}`}>
                        {distraction.label}
                      </Label>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {distraction.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full mt-4">Finish Session</Button>
          </div>
        </CardContent>

        <CardFooter className="text-xs text-gray-500">
          Tip: Close other tabs and put your phone away for maximum focus.
        </CardFooter>
      </Card>
    </div>
  );
}
