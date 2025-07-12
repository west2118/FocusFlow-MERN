import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Flame } from "lucide-react";

const CurrentStreakCard = () => {
  return (
    <Card className="shadow-xl bg-white border-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-rose-600" />
          <CardTitle>Current Streak</CardTitle>
        </div>
        <CardDescription>Don't break the chain!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-800">7</p>
            <p className="text-indigo-600">days in a row</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentStreakCard;
