import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Lightbulb, ChevronRight } from "lucide-react";

const AITipCard = () => {
  return (
    <Card className="shadow-xl bg-white border-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-indigo-600" />
          <CardTitle>AI Tip of the Day</CardTitle>
        </div>
        <CardDescription>Powered by OpenAI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-indigo-800">
            "When working on complex tasks, try the '20-minute rule' - commit to
            working for just 20 minutes. Often, getting started is the hardest
            part, and you'll likely continue past the 20 minutes."
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" className="text-indigo-600 gap-1">
          Another tip
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AITipCard;
