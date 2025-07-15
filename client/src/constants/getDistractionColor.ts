export function getDistractionColor(type: string) {
  switch (type) {
    case "Social Media":
      return "bg-blue-100 text-blue-600";
    case "Video Streaming":
      return "bg-rose-100 text-rose-600";
    case "Gaming":
      return "bg-indigo-100 text-indigo-600";
    case "Online Shopping":
      return "bg-amber-100 text-amber-600";
    case "Messaging/Chatting":
      return "bg-green-100 text-green-600";
    case "Music & Podcasts":
      return "bg-yellow-100 text-yellow-600";
    case "Food & Snacking":
      return "bg-pink-100 text-pink-600";
    case "Email & Notifications":
      return "bg-cyan-100 text-cyan-600";
    case "Unrelated Tabs/Web Browsing":
      return "bg-violet-100 text-violet-600";
    case "Physical Environment":
      return "bg-lime-100 text-lime-600";
    case "Multitasking":
      return "bg-teal-100 text-teal-600";
    case "Procrastination":
      return "bg-orange-100 text-orange-600";
    case "Mental Wandering":
      return "bg-neutral-100 text-neutral-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
