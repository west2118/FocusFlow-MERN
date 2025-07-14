import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackToDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-4">
      {/* Left Arrow Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="text-indigo-600 hover:text-indigo-800 transition">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </div>
  );
};

export default BackToDashboard;
