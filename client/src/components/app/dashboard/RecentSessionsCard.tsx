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
import useFetchData from "@/hooks/useFetchData";
import { useEffect } from "react";
import type { Session } from "@/types/sessions";
import { useUserStore } from "@/store/useUserStore";
import { formatDate } from "@/constants/formatDate";
import { convertSecToHrAndMin } from "@/constants/convertSecToHrAndMin";

const RecentSessionsCard = () => {
  const token = useUserStore((state) => state.userToken);
  const { fetchData, items, loading, error } = useFetchData<Session>();

  useEffect(() => {
    if (!token) return;

    fetchData("get", "http://localhost:8080/api/three-session", token);
  }, [token]);

  console.log(items);

  return (
    <Card className="shadow-xl bg-white border-none">
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
        <CardDescription>Your last 3 focus sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items?.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg shadow-xl border-gray-200 bg-white">
              <div>
                <p className="font-medium">{session.sessionCategory}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(session.createdAt)} •{" "}
                  {convertSecToHrAndMin(session.duration)}
                </p>
              </div>
              {session?.distractions.length > 0 ? (
                <Badge className="gap-1 border-red-500 text-red-500">
                  <AlertTriangle className="h-3 w-3" />
                  Distracted
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-emerald-200 text-emerald-700 gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Focus
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
