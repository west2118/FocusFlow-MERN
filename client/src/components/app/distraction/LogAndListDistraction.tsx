import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { AlertTriangle, Globe, Trash2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "react-toastify";
import axios from "axios";
import type { User } from "@/types/user";
import useFetchData from "@/hooks/useFetchData";

type LogAndListDistractionProps = {
  token: string | null;
  user: User | null;
};

const LogAndListDistraction = ({ token, user }: LogAndListDistractionProps) => {
  const updateBlockSites = useUserStore((state) => state.updatedBlockSite);
  const [siteText, setSiteText] = useState("");
  const { fetchData } = useFetchData();

  const handleAddBlockSite = async () => {
    if (!token) return;

    if (siteText.trim().length === 0) {
      return toast.error("Missing Required Field");
    }

    try {
      const response = await fetchData(
        "put",
        "http://localhost:8080/api/block-sites",
        token,
        { site: siteText.trim() }
      );

      updateBlockSites(response?.updatedUser.blockedSite);
      toast.success(response?.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleUnblockSite = async (site: string) => {
    if (!token) return;

    try {
      const response = await fetchData(
        "put",
        "http://localhost:8080/api/unblock-sites",
        token,
        { site }
      );

      updateBlockSites(response?.updatedUser.blockedSite);
      toast.success(response?.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Log New Distraction</CardTitle>
          <CardDescription>What pulled you away?</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <Lock className="h-4 w-4 text-indigo-600" />
                Blocked During Focus
              </h3>
            </div>

            <div className="space-y-2">
              {user?.blockedSite.map((site, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{site}</span>
                  </div>
                  <Button
                    onClick={() => handleUnblockSite(site)}
                    variant="ghost"
                    size="sm"
                    className="text-rose-600 hover:bg-rose-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Input
                name="siteText"
                value={siteText}
                onChange={(e) => setSiteText(e.target.value)}
                placeholder="Add website to block (e.g. reddit.com)"
                className="flex-1"
              />
              <Button
                onClick={handleAddBlockSite}
                className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Block
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogAndListDistraction;
