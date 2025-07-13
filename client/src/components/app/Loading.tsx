import { useEffect, useState } from "react";

export function Loading() {
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 3);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
      <div className="flex flex-col items-center">
        {/* EcoFlow Logo and Brand Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-16 w-16 text-blue-600 relative">
              <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold text-gray-800">FocusFlow</span>
          <p className="text-gray-500 mt-2">Your Personal Productivity Coach</p>
        </div>

        {/* Energy Flow Animation */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Line on top */}
              {index < 2 && (
                <div className="absolute top-0 left-full w-8 h-1 bg-gradient-to-r from-blue-300 to-blue-100 translate-y-2" />
              )}

              {/* Circle */}
              <div
                className={`h-4 w-4 rounded-full ${
                  activePulse === index
                    ? "bg-blue-600 scale-125"
                    : "bg-blue-300"
                } transition-all duration-500`}
              />
            </div>
          ))}
        </div>

        {/* Loading Status */}
        {/* <div className="text-center">
          <p className="text-gray-600 mb-2">Initializing power systems</p>
          <div className="w-64 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full animate-pulse"
              style={{ width: "45%" }}></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
