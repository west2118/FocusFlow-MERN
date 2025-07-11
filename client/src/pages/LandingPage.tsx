import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Check,
  Zap,
  BarChart2,
  Clock,
  AlertTriangle,
  Users,
  Star,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pt-28">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Your Personal{" "}
          <span className="text-indigo-600">Productivity Coach</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          FocusFlow helps you build better work habits by tracking your focus,
          minimizing distractions, and providing AI-powered insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Input placeholder="Enter your email" className="flex-1" />
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Start Free Trial
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          No credit card required. 14-day free trial.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How FocusFlow Helps You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our science-backed approach helps you build sustainable focus habits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock className="h-8 w-8 text-indigo-600 mb-4" />,
              title: "Focus Timer",
              description:
                "Pomodoro-style timer with customizable work/break intervals",
            },
            {
              icon: <AlertTriangle className="h-8 w-8 text-indigo-600 mb-4" />,
              title: "Distraction Tracking",
              description:
                "Identify and minimize your biggest focus disruptors",
            },
            {
              icon: <BarChart2 className="h-8 w-8 text-indigo-600 mb-4" />,
              title: "AI Insights",
              description:
                "Personalized recommendations to improve your productivity",
            },
          ].map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-indigo-50 rounded-3xl my-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join professionals who transformed their productivity with FocusFlow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "FocusFlow helped me double my productive output in just 2 weeks!",
              author: "Sarah K., Software Developer",
            },
            {
              quote:
                "The distraction tracking feature alone was worth the price.",
              author: "Michael T., Content Writer",
            },
            {
              quote:
                "Finally an app that actually helps me stay focused long-term.",
              author: "Jessica L., Graduate Student",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="text-gray-900 font-medium">
                  {testimonial.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-indigo-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who improved their focus with
            FocusFlow
          </p>
          <Button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-6 text-lg">
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-800">
                FocusFlow
              </span>
            </div>
            <p className="text-gray-600">Your personal productivity coach</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="text-gray-600">
                  Features
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="text-gray-600">
                  Pricing
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="text-gray-600">
                  Testimonials
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="text-gray-600">
                  Blog
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="text-gray-600">
                  Help Center
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="text-gray-600">
                  Contact
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="text-gray-600">
                  Privacy
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="text-gray-600">
                  Terms
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="text-gray-600">
                  Cookie Policy
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} FocusFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
