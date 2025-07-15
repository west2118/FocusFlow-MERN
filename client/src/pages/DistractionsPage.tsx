import { Button } from "@/components/ui/button";
import { AlertTriangle, Zap } from "lucide-react";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import type { Session } from "@/types/sessions";
import useFetchData from "@/hooks/useFetchData";
import LogAndListDistraction from "@/components/app/distraction/LogAndListDistraction";
import StatsCards from "@/components/app/distraction/StatsCards";
import DistractionList from "@/components/app/distraction/DistractionList";
import DistractionFrequency from "@/components/app/distraction/DistractionFrequency";
import BackToDashboard from "@/components/app/backToDashboard";

export default function DistractionDashboard() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.userToken);
  const { fetchData, items, error, loading } = useFetchData<Session>();

  useEffect(() => {
    if (!token) return;

    fetchData("get", "http://localhost:8080/api/session", token);
  }, [token]);

  const allDistractions = items.flatMap((item) => item.distractions);

  const grouped =
    allDistractions?.reduce((acc, curr) => {
      acc[curr.distraction] = (acc[curr.distraction] || 0) + curr.minutes;
      return acc;
    }, {} as Record<string, number>) || {};

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 ">
      <div className="max-w-6xl mx-auto space-y-6 pt-26">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-rose-600" />
              Distraction Tracker
            </h1>
            <p className="text-gray-600">
              Identify and conquer your focus breakers
            </p>
          </div>

          <BackToDashboard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Log New Distraction */}
          <LogAndListDistraction token={token} user={user} />

          {/* Right Column - Distraction Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <StatsCards allDistractions={allDistractions} user={user} />

            {/* Distraction List */}
            <DistractionList grouped={grouped} />

            {/* Distraction Frequency */}
            <DistractionFrequency token={token} />
          </div>
        </div>
      </div>
    </div>
  );
}
