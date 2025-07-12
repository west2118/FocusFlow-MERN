import { Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-bold text-indigo-800">FocusFlow</span>
        </div>
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

        {/* <h1 className="text-xl font-bold text-indigo-800">FocusFlow</h1>
        <Avatar>
          <AvatarImage src="/user-avatar.jpg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar> */}
      </nav>
    </header>
  );
};

export default Navbar;
