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
import { AlertTriangle } from "lucide-react";

type DistractionAnalysisProps = {
  commonDistractions: Record<string, number>;
};

const getImpact = (times: number) => {
  switch (true) {
    case times <= 3:
      return "Low";
    case times <= 5:
      return "Medium";
    default:
      return "High";
  }
};

const DistractionAnalysis = ({
  commonDistractions,
}: DistractionAnalysisProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
          Distraction Analysis
        </CardTitle>
        <CardDescription>What's pulling you away from focus</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(commonDistractions).map(([category, times]) => (
            <div key={category} className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">{category}</span>
                <span className="text-sm text-gray-500">
                  {times} times ({getImpact(times)} impact)
                </span>
              </div>
              <Progress
                value={(Number(times) / 10) * 100}
                impact={getImpact(times)}
                className="bg-gray-200"
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
  );
};

export default DistractionAnalysis;
