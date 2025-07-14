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
import {
  Timer,
  X,
  Check,
  Plus,
  AlertTriangle,
  Clock,
  Minus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "@/constants/formatTime";
import { timers } from "@/constants/timers";
import { useUserStore } from "@/store/useUserStore";
import { focusHours } from "@/constants/focusHours";
import { convertSecToHrAndMin } from "@/constants/convertSecToHrAndMin";
import { toast } from "react-toastify";
import { distractionCategories } from "@/constants/distractionsCategories";
import { useForm } from "@/hooks/useForm";
import { sessionCategories } from "@/constants/sessionCategories";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "@/components/app/backToDashboard";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

type FormData = {
  distraction: string;
  minutes: number;
};

export default function FocusSessionPage() {
  const navigate = useNavigate();
  const userBlockedSite = useUserStore((state) => state.user?.blockedSite);
  const token = useUserStore((state) => state.userToken);
  const [selectedBreakTime, setSelectedBreakTime] =
    useState<number>(BREAK_TIME);
  const [selectedFocusTime, setSelectedFocusTime] =
    useState<number>(FOCUS_TIME);
  const [secondsLeft, setSecondsLeft] = useState<number>(FOCUS_TIME);
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedHours, setSelectedHours] = useState("");
  const [totalSecondsAllowed, setTotalSecondsAllowed] = useState(
    Number(selectedHours) * 10
  );
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const [goal, setGoal] = useState("");
  const [sessionCategory, setSessionCategory] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [sessionStatus, setSessionState] = useState("focused");
  const [logDistractions, setLogDistractions] = useState<FormData[]>([]);

  const { formData, handleChange, setField } = useForm<FormData>({
    distraction: "",
    minutes: 0,
  });

  const intervalRef = useRef<number | null>(null);

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
    setTotalSecondsAllowed(Number(selectedHours) * 10);
  }, [selectedHours]);

  useEffect(() => {
    if (isRunning) {
      sendBlockSitesToExtension(userBlockedSite ?? []);

      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsFocus((prevFocus) => {
              const nextFocus = !prevFocus;
              const nextTime = nextFocus
                ? selectedFocusTime
                : selectedBreakTime;

              setSecondsLeft(nextTime);
              setIsRunning(true);

              return nextFocus;
            });

            return 0;
          }

          return prev - 1;
        });

        setSecondsElapsed((prev) => {
          const updated = prev + 1;

          if (updated >= totalSecondsAllowed) {
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
            }

            setIsRunning(false);
            setIsFinished(true);
            sendBlockSitesToExtension([]);
          }

          return updated;
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

  const handleStart = () => {
    if (!goal || !selectedHours) {
      return toast.error("Missing required fields!");
    }

    setSecondsElapsed(0);
    setIsRunning(true);
    setSecondsLeft(selectedFocusTime);
  };

  const handleReset = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    setSecondsElapsed(0);
    setIsRunning(false);
    setIsFocus(true);
    setSecondsLeft(selectedFocusTime);
    sendBlockSitesToExtension([]);
  };

  const handleAddDistraction = () => {
    if (!formData.distraction || formData.minutes <= 0) {
      return toast.error("Please fill in both fields.");
    }

    setLogDistractions((prev) => [
      ...prev,
      { distraction: formData.distraction, minutes: formData.minutes },
    ]);

    setField("distraction", "");
    setField("minutes", 0);
  };

  const handleRemoveDistraction = (index: number) => {
    setLogDistractions((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePostSession = async () => {
    const addedData = {
      goal,
      sessionCategory,
      duration: secondsElapsed,
      status: sessionStatus,
      distractions: logDistractions,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/session",
        {
          ...addedData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message);
      navigate("/sessions");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-30">
      <div className="flex flex-col gap-4">
        <div>
          <BackToDashboard />
        </div>
        <Card className="w-full max-w-lg bg-white border-none shadow-2xl">
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
                disabled={isRunning || isFinished}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="What are you focusing on? (e.g. 'Write blog post')"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-hours">Session Category</Label>
              <select
                id="session-hours"
                disabled={isRunning || isFinished}
                value={sessionCategory}
                onChange={(e) => setSessionCategory(e.target.value)}
                className={`w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 
                ${
                  isRunning || isFinished
                    ? "text-gray-400  cursor-not-allowed"
                    : "text-black"
                }
              `}>
                <option value="" disabled>
                  Select Session Category
                </option>
                {sessionCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-hours">Focus Duration (Hours)</Label>
              <select
                id="session-hours"
                disabled={isRunning || isFinished}
                value={selectedHours}
                onChange={(e) => setSelectedHours(e.target.value)}
                className={`w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 
                ${
                  isRunning || isFinished
                    ? "text-gray-400  cursor-not-allowed"
                    : "text-black"
                }
              `}>
                <option value="" disabled>
                  Select Focus Hours
                </option>
                {focusHours.map((hour) => (
                  <option key={hour.value} value={hour.value}>
                    {hour.label}
                  </option>
                ))}
              </select>
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
                      disabled={isRunning || isFinished}
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
              <div className="text-center">
                <div
                  className={`text-xl font-mono font-bold mb-2 transition-colors duration-300 ${
                    isFocus ? "text-indigo-800" : "text-green-600"
                  }`}>
                  {isFocus
                    ? isFinished
                      ? "Total Time"
                      : "Focus Time"
                    : "Break Time"}
                </div>
                {isFinished ? (
                  <div
                    className={`text-3xl font-mono font-extrabold text-indigo-900 `}>
                    {convertSecToHrAndMin(secondsElapsed)}
                  </div>
                ) : (
                  <div
                    className={`text-6xl font-mono font-extrabold ${
                      isFocus ? "text-indigo-900" : "text-green-800"
                    }`}>
                    {formatTime(secondsLeft)}
                  </div>
                )}
              </div>
              {!isFinished && (
                <div className="flex gap-2 mt-6">
                  {isRunning ? (
                    <Button onClick={handleReset} variant="outline">
                      Reset
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStart}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      Start Session
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Session Completion (Hidden by default) */}
            <div className={`space-y-4 ${isFinished ? "" : "hidden"}`}>
              <div className="space-y-2">
                <Label>Session Status</Label>
                <RadioGroup
                  value={sessionStatus}
                  onValueChange={(value) => setSessionState(value)}
                  className="grid grid-cols-2 gap-2">
                  <div>
                    <RadioGroupItem
                      value="focused"
                      id="focused"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="focused"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-600 peer-data-[state=checked]:bg-emerald-50">
                      <Check className="h-6 w-6 text-emerald-600 mb-1" />
                      <span className="font-medium">Focused</span>
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
              {sessionStatus === "interrupted" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      Distractions
                    </Label>
                    <Button
                      onClick={() => setShowAdd(!showAdd)}
                      variant="ghost"
                      size="sm"
                      className="text-indigo-600">
                      {showAdd ? (
                        <>
                          <Minus className="h-4 w-4 mr-1" />
                          Hide Add
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </div>

                  {showAdd && (
                    <div className="flex items-end gap-2">
                      <div className="flex flex-col w-1/2 gap-2">
                        <Label htmlFor="distraction-category">
                          Distraction
                        </Label>
                        <select
                          id="distraction-category"
                          name="distraction"
                          value={formData.distraction}
                          onChange={handleChange}
                          className="p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 h-10">
                          <option value="" disabled>
                            Choose...
                          </option>
                          {distractionCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col w-1/4 gap-2">
                        <Label htmlFor="distraction-minutes">Minutes</Label>
                        <Input
                          id="distraction-minutes"
                          type="number"
                          name="minutes"
                          value={formData.minutes}
                          onChange={handleChange}
                          placeholder="e.g. 5"
                          className="h-10"
                        />
                      </div>

                      <div className="w-1/4 flex flex-col gap-2">
                        <Label className="invisible">Add</Label>
                        <Button
                          onClick={handleAddDistraction}
                          className="h-10 w-full bg-indigo-600 text-white hover:bg-indigo-700">
                          Add
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {logDistractions.length > 0 ? (
                      logDistractions.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Label>{item.distraction}</Label>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.minutes} mins
                            </div>

                            <button
                              onClick={() => handleRemoveDistraction(index)}
                              className="text-gray-400 hover:text-red-600">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500 text-sm p-4 border rounded-md bg-gray-50">
                        <Clock className="w-5 h-5 mb-1" />
                        <p>No Distraction Log</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={handlePostSession}
                className="w-full mt-4 bg-indigo-600 text-white hover:bg-indigo-700">
                Finish Session
              </Button>
            </div>
          </CardContent>

          <CardFooter className="text-xs text-gray-500">
            Tip: Close other tabs and put your phone away for maximum focus.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
