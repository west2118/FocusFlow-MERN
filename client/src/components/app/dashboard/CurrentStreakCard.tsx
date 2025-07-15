import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import useFetchData from "@/hooks/useFetchData";
import { useUserStore } from "@/store/useUserStore";
import type { Session } from "@/types/sessions";
import axios from "axios";
import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CurrentStreakCard = () => {
  const token = useUserStore((state) => state.userToken);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/streak", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStreak(response?.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchData();
  }, [token]);

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
            <p className="text-4xl font-bold text-indigo-800">{streak}</p>
            <p className="text-indigo-600">
              {streak <= 1 ? "day" : "days"} in a row
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentStreakCard;
