import { Button } from "@/components/ui/button";
import { convertMinsToHoursAndMins } from "@/constants/convertMinsToHoursAndMins";
import { convertSecToHrAndMin } from "@/constants/convertSecToHrAndMin";
import { getDistractionColor } from "@/constants/getDistractionColor";
import { Globe, Trash2 } from "lucide-react";

const DistractionListCard = ({
  category,
  minutes,
}: {
  category: string;
  minutes: number;
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${getDistractionColor(category)}`}>
          <Globe className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">{category}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">{convertMinsToHoursAndMins(minutes)}</p>
        </div>
      </div>
    </div>
  );
};

export default DistractionListCard;
