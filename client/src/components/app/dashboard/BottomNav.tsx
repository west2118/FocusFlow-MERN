import {
  Home,
  Clock,
  AlertTriangle,
  BarChart2,
  Flame,
  Settings,
} from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex justify-around">
          {[
            { name: "Dashboard", icon: Home, active: true },
            { name: "Sessions", icon: Clock },
            { name: "Distractions", icon: AlertTriangle },
            { name: "Insights", icon: BarChart2 },
            { name: "Streaks", icon: Flame },
            { name: "Settings", icon: Settings },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`flex flex-col items-center px-2 py-1 text-sm font-medium rounded-md ${
                  item.active
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                <Icon className="h-5 w-5" />
                <span className="mt-1">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
