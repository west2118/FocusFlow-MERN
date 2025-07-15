import { Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { toast } from "react-toastify";
import { Loading } from "./Loading";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { initials } from "@/constants/initials";

type User = {
  _id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  dailyTarget: string;
  weeklyTarget: string;
  distractions: string[];
  workCategories: string[];
  blockedSites: string[]; // likely a typo if you also have `blockedSite`
  blockedSite: string[];
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
  __v: number;
};

const Navbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const token = useUserStore((state) => state.userToken);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get("http://localhost:8080/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserInfo(response?.data);
      } catch (error) {
        toast.error("Failed to get token");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (!token || loading) return <Loading />;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-bold text-indigo-800">FocusFlow</span>
        </div>
        {!userInfo ? (
          <div className="flex gap-4">
            <Button variant="ghost" className="text-indigo-700">
              Features
            </Button>
            <Button variant="ghost" className="text-indigo-700">
              Pricing
            </Button>
            <Button variant="ghost" className="text-indigo-700">
              About
            </Button>
            <Link to="/login">
              <Button
                variant="outline"
                className="border-indigo-300 text-indigo-700">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        ) : (
          <Avatar>
            <AvatarImage />
            <AvatarFallback className="bg-indigo-600 text-white">
              {initials(userInfo.firstName, userInfo.lastName)}
            </AvatarFallback>
          </Avatar>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
