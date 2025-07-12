import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const RecentSessionsCard = () => {
  return (
    <Card className="shadow-xl bg-white border-none">
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
        <CardDescription>Your last 3 focus sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              type: "Coding",
              duration: "45m",
              time: "9:30 AM",
              distractionCount: 1,
            },
            {
              type: "Study",
              duration: "30m",
              time: "2:15 PM",
              distractionCount: 2,
            },
            {
              type: "Reading",
              duration: "30m",
              time: "4:45 PM",
              distractionCount: 0,
            },
          ].map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg shadow-xl border-gray-200 bg-white">
              <div>
                <p className="font-medium">{session.type}</p>
                <p className="text-sm text-gray-500">
                  {session.time} • {session.duration}
                </p>
              </div>
              {session.distractionCount > 0 ? (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {session.distractionCount}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-emerald-200 text-emerald-700 gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Clean
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSessionsCard;
