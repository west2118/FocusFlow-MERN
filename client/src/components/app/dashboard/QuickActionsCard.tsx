import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Timer, PlusCircle, CheckCircle2 } from "lucide-react";

const QuickActionsCard = () => {
  return (
    <Card className="shadow-xl bg-white border-none">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Get started with your focus session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link to="/focus-session">
            <Button className="border text-indigo-700 border-indigo-600 hover:bg-indigo-50 py-8 gap-2 w-full">
              <Timer className="h-5 w-5" />
              <span className="text-lg">Start Timer</span>
            </Button>
          </Link>
          <Link to="/log-distraction">
            <Button
              variant="outline"
              className="border-rose-300 text-rose-700 hover:bg-rose-50 py-8 w-full gap-2">
              <PlusCircle className="h-5 w-5" />
              <span className="text-lg">Log Distraction</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 py-8 gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-lg">Check-In</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
