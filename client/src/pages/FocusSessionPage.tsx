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
import { useEffect, useRef, useState } from "react";
import { formatTime } from "@/constants/formatTime";
import { timers } from "@/constants/timers";
import { useUserStore } from "@/store/useUserStore";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function FocusSessionPage() {
  const [selectedBreakTime, setSelectedBreakTime] =
    useState<number>(BREAK_TIME);
  const [selectedFocusTime, setSelectedFocusTime] =
    useState<number>(FOCUS_TIME);
  const [secondsLeft, setSecondsLeft] = useState<number>(FOCUS_TIME);
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const userBlockedSite = useUserStore((state) => state.user?.blockedSite);

  const sendBlockSitesToExtension = (sitesToBlock: string[]) => {
    if (
      typeof chrome !== "undefined" &&
      chrome.runtime &&
      chrome.runtime.sendMessage &&
      Array.isArray(sitesToBlock)
    ) {
      chrome.runtime.sendMessage(
        "pobbkcognmamcphilkbbhajgpbehakpe",
        {
          action: "updateBlockedSites",
          sites: sitesToBlock,
        },
        (response) => {
          console.log("Extension response:", response);
        }
      );
    } else {
      console.warn("Chrome extension not available");
    }
  };

  useEffect(() => {
    if (isRunning) {
      sendBlockSitesToExtension(userBlockedSite ?? []);

      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
            }

            const nextFocus = !isFocus;
            setIsFocus(nextFocus);
            setIsRunning(false);
            return nextFocus ? selectedFocusTime : selectedBreakTime;
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      sendBlockSitesToExtension([]);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    const handleExit = () => {
      if (isRunning) {
        sendBlockSitesToExtension([]);
      }
    };

    window.addEventListener("beforeunload", handleExit);
    return () => window.removeEventListener("beforeunload", handleExit);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);

  const handleReset = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    setIsRunning(false);
    setIsFocus(true);
    setSecondsLeft(selectedFocusTime);
    sendBlockSitesToExtension([]);
  };

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
              {timers.map((option: any) => (
                <div key={option.value} className="h-full">
                  <input
                    type="radio"
                    id={`duration-${option.value}`}
                    name="duration"
                    value={option.value}
                    onChange={(e) => {
                      if (option.value !== "custom") {
                        setSelectedBreakTime(option.breakTime);
                        setSelectedFocusTime(Number(e.target.value));
                        setSecondsLeft(Number(e.target.value));
                      }
                    }}
                    className="hidden peer"
                    defaultChecked={option.desc === "Pomodoro"}
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
              {formatTime(secondsLeft)}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
              <Button
                onClick={handleStart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Start Session
              </Button>
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
