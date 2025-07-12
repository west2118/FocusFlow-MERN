import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Progress } from "../../ui/progress";

const TodaySummaryCard = () => {
  return (
    <Card className="shadow-xl bg-white border-none">
      <CardHeader>
        <CardTitle>Today's Focus Summary</CardTitle>
        <CardDescription>Your productivity at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-indigo-600">
              <Clock className="h-4 w-4" />
              <p className="text-sm">Total Focus Time</p>
            </div>
            <p className="text-2xl font-bold text-indigo-800 mt-1">1h 45m</p>
            <p className="text-xs text-indigo-500">+25m from yesterday</p>
          </div>
          <div className="bg-rose-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-sm">Distractions Logged</p>
            </div>
            <p className="text-2xl font-bold text-rose-800 mt-1">3</p>
            <p className="text-xs text-rose-500">-2 from yesterday</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              <p className="text-sm">Goal Progress</p>
            </div>
            <div className="mt-2">
              <Progress value={58} className="h-2 bg-emerald-100" />
            </div>
            <p className="text-xs text-emerald-500 mt-1">58% of 3h goal</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaySummaryCard;
