import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import DistractionListCard from "./DistractionListCard";

type DistractionListProps = {
  grouped: Record<string, number>;
};

const DistractionList = ({ grouped }: DistractionListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-indigo-600" />
          Your Distraction Patterns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, minutes]) => (
            <DistractionListCard
              key={category}
              category={category}
              minutes={minutes}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DistractionList;
