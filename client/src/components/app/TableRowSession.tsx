import { TableCell, TableRow } from "../ui/table";
import { AlertTriangle, Check, Edit, Trash2, X } from "lucide-react";
import { formatDate } from "@/constants/formatDate";
import { convertSecToHrAndMin } from "@/constants/convertSecToHrAndMin";
import { Button } from "../ui/button";
import type { Session } from "@/types/sessions";
import { Badge } from "../ui/badge";

const TableRowSession = ({ item }: { item: Session }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {formatDate(item.createdAt)}
      </TableCell>
      <TableCell>{item.goal}</TableCell>
      <TableCell>
        <Badge variant="outline" className="border-gray-300">
          {item.sessionCategory}
        </Badge>
      </TableCell>
      <TableCell>{convertSecToHrAndMin(item.duration)}</TableCell>
      <TableCell>
        {item.status === "focused" ? (
          <Badge className="bg-emerald-100 text-emerald-800 gap-1">
            <Check className="h-3 w-3" />
            Focused
          </Badge>
        ) : (
          <Badge className="bg-rose-100 text-rose-800 gap-1">
            <X className="h-3 w-3" />
            Interrupted
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {item.distractions.length > 0 ? (
          <Badge
            variant="destructive"
            className="flex items-center gap-1 px-2 py-1 text-sm text-red-700">
            <AlertTriangle className="h-4 w-4" />
            {item.distractions.slice(0, 1).map((dis) => (
              <span key={dis._id}>{dis.distraction}</span>
            ))}
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="border-emerald-200 text-emerald-700 gap-1">
            <Check className="h-3 w-3" />
            None
          </Badge>
        )}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Trash2 className="h-4 w-4 text-rose-600" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableRowSession;
