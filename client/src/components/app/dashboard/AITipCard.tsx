import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { Lightbulb, ChevronRight, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AITipCard = () => {
  const token = useUserStore((state) => state.userToken);
  const [tipAi, setTipAi] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  let called = false;

  const getSuggestion = async () => {
    if (called) return;
    called = true;

    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8080/api/suggestion");

      console.log("Tip: ", response?.data);
      setTipAi(response?.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    getSuggestion();
  }, [token]);

  return (
    <Card className="shadow-xl bg-white border-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-indigo-600" />
          <CardTitle>AI Tip of the Day</CardTitle>
        </div>
        <CardDescription>Powered by OpenAI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-indigo-50 p-4 rounded-lg">
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <Loader className="animate-spin h-5 w-5 text-indigo-600" />
            </div>
          ) : (
            <p className="text-indigo-800">{tipAi || "Loading..."}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={getSuggestion}
          variant="ghost"
          className="text-indigo-600 gap-1">
          Another tip
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AITipCard;
