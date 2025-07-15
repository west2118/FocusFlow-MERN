import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { convertMinsToHoursAndMins } from "@/constants/convertMinsToHoursAndMins";
import { convertSecToHrAndMin } from "@/constants/convertSecToHrAndMin";
import useFetchData from "@/hooks/useFetchData";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DistractionFrequencyProps = {
  token: string | null;
};
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const colors = [
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#f59e0b",
  "#10b981",
  "#f43f5e",
  "#10b981",
];

const DistractionFrequency = ({ token }: DistractionFrequencyProps) => {
  const { fetchData, items, error, loading } = useFetchData();

  useEffect(() => {
    if (!token) return;

    fetchData(
      "get",
      "http://localhost:8080/api/range-session?range=weekly",
      token
    );
  }, [token]);

  const getThisWeekDates = () => {
    const today = new Date();
    const day = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));

    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const formatted = date.toISOString().split("T")[0];
      weekDates.push(formatted);
    }

    return weekDates;
  };

  const weekThisDates = getThisWeekDates();

  const calculateMinutes = (date: string) => {
    const filteredItems = items.filter(
      (item) => item.createdAt.split("T")[0] === date
    );

    return filteredItems
      .flatMap((item) => item.distractions)
      .reduce((acc, curr) => acc + curr.minutes, 0);
  };

  const data = weekDays.map((day, index) => ({
    name: day,
    value: calculateMinutes(weekThisDates[index]),
    fill: colors[index],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Distraction Frequency</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => {
                const hours = value / 60;
                return hours % 1 === 0 ? `${hours}h` : `${hours.toFixed(1)}h`;
              }}
            />
            <Tooltip
              formatter={(value) => [
                `${convertMinsToHoursAndMins(Number(value))}`,
                "Count",
              ]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Bar
              dataKey="value"
              name="Distractions"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              fill="#8884d8">
              {data.map((entry, index) => (
                <rect
                  key={`bar-${index}`}
                  fill={entry.fill}
                  rx={4} // rounded corners
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DistractionFrequency;
