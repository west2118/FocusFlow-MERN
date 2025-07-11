import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Filter,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  Clock,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import { Label } from "@/components/ui/label";

export default function MySessionsPage() {
  // Sample session data
  const sessions = [
    {
      id: 1,
      date: "2023-11-15",
      goal: "Complete blog post",
      category: "Writing",
      duration: "45m",
      status: "completed",
      distractions: 0,
      notes: "Finished first draft",
    },
    {
      id: 2,
      date: "2023-11-14",
      goal: "Learn React hooks",
      category: "Study",
      duration: "30m",
      status: "interrupted",
      distractions: 2,
      notes: "Got distracted by phone calls",
    },
    {
      id: 3,
      date: "2023-11-13",
      goal: "Project planning",
      category: "Work",
      duration: "60m",
      status: "completed",
      distractions: 1,
      notes: "Created project roadmap",
    },
    {
      id: 4,
      date: "2023-11-12",
      goal: "Read documentation",
      category: "Study",
      duration: "25m",
      status: "completed",
      distractions: 0,
      notes: "Reviewed API docs",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto pt-26">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Sessions</h1>
            <p className="text-gray-600">Review your focus session history</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Export Data
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search sessions..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                    <SelectItem value="study">Study</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="coding">Coding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="interrupted">Interrupted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date Range</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Last 7 days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">Last 30 days</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sessions Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Session History</CardTitle>
                <CardDescription>Your recent focus sessions</CardDescription>
              </div>
              <Button variant="outline" className="border-gray-300">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Distractions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">
                      {new Date(session.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{session.goal}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-gray-300">
                        {session.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{session.duration}</TableCell>
                    <TableCell>
                      {session.status === "completed" ? (
                        <Badge className="bg-emerald-100 text-emerald-800 gap-1">
                          <Check className="h-3 w-3" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge className="bg-rose-100 text-rose-800 gap-1">
                          <X className="h-3 w-3" />
                          Interrupted
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {session.distractions > 0 ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {session.distractions}
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
