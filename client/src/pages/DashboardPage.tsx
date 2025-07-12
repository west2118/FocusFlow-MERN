import TodaySummaryCard from "@/components/app/dashboard/TodaySummaryCard";
import QuickActionsCard from "@/components/app/dashboard/QuickActionsCard";
import RecentSessionsCard from "@/components/app/dashboard/RecentSessionsCard";
import AITipCard from "@/components/app/dashboard/AITipCard";
import BottomNav from "@/components/app/dashboard/BottomNav";
import CurrentStreakCard from "@/components/app/dashboard/CurrentStreakCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-28">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Focus Summary */}
            <TodaySummaryCard />

            {/* Quick Actions */}
            <QuickActionsCard />

            {/* Recent Sessions */}
            <RecentSessionsCard />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Tip of the Day */}
            <AITipCard />

            {/* Current Streak */}
            <CurrentStreakCard />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
