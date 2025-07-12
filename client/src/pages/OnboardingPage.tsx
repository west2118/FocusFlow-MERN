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
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@/hooks/useForm";
import { weeklyTargets } from "@/constants/weeklyTarget";
import { dailyTargets } from "@/constants/dailyTarget";
import { workCategories } from "@/constants/workCategories";
import { useState } from "react";
import { distractions } from "@/constants/distractions";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "@/firebase";
import { Loader } from "lucide-react";

type FormData = {
  dailyTarget: string;
  weeklyTarget: string;
};

export default function OnboardingPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [workCategoriesData, setWorkCategoriesData] = useState<string[]>([]);
  const [distractionsData, setDistractionsData] = useState<string[]>([]);

  const { formData, handleChange } = useForm<FormData>({
    dailyTarget: "",
    weeklyTarget: "",
  });

  const handleSubmit = async () => {
    if (
      Object.values(formData).some((value) => value.trim() === "") ||
      distractionsData.length === 0 ||
      workCategoriesData.length === 0
    ) {
      return toast.error("Missing Required Field");
    }

    setIsLoading(true);

    const token = await auth.currentUser?.getIdToken();

    const addedData = {
      dailyTarget: formData.dailyTarget,
      weeklyTarget: formData.weeklyTarget,
      workCategories: workCategoriesData,
      distractions: distractionsData,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user",
        {
          ...addedData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response?.data);

      toast.success("Account info updated successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

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

          {/* <div className="mt-6">
            <Progress value={33} className="h-2 bg-indigo-100" />
            <p className="text-sm text-indigo-600 mt-2">Step 1 of 3</p>
          </div> */}
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
                        name="dailyTarget"
                        value={formData.dailyTarget}
                        onChange={handleChange}
                        id="daily-hours"
                        className="block w-full px-4 py-2 border border-indigo-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option disabled value="">
                          Select daily target
                        </option>
                        {dailyTargets.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
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
                        name="weeklyTarget"
                        value={formData.weeklyTarget}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-indigo-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option disabled value="">
                          Select weekly target
                        </option>
                        {weeklyTargets.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
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
                {workCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-3">
                    <Checkbox
                      id={`category-${category}`}
                      checked={workCategoriesData.includes(category)}
                      onCheckedChange={(checked) => {
                        setWorkCategoriesData((prev) =>
                          checked
                            ? [...prev, category]
                            : prev.filter((item) => item !== category)
                        );
                      }}
                      className="h-5 w-5 border-indigo-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 text-white"
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
                {distractions.map((distraction) => (
                  <div
                    key={distraction}
                    className="flex items-center space-x-3">
                    <Checkbox
                      id={`distraction-${distraction}`}
                      checked={distractionsData.includes(distraction)}
                      onCheckedChange={(checked) => {
                        setDistractionsData((prev) =>
                          checked
                            ? [...prev, distraction]
                            : prev.filter((item) => item !== distraction)
                        );
                      }}
                      className="h-5 w-5 border-indigo-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 text-white"
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
              disabled={isLoading}
              variant="outline"
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
              Back
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {isLoading ? <Loader className="animate-spin h-5 w-5" /> : ""}
              Continue Setup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
