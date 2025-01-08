import React from "react";
import {
  Search,
  Home,
  Users,
  MapPin,
  MessageSquare,
  Bell,
  Settings,
  Download,
  Sun,
  Moon,
} from "lucide-react";

const Sidebar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col h-full bg-[#222222]">
      <div className="p-4 space-y-6">
        <img src="/footballshuru.png" alt="Main Logo" />

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#303030] pl-10 pr-4 py-2 rounded-lg text-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#C3CC5A]/50"
          />
        </div>
      </div>

      <nav className="px-2 mt-2">
        <div className="space-y-1">
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-[#C3CC5A] rounded-lg bg-[#303030] hover:bg-[#303030]/80"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </a>
          {[
            { icon: Users, label: "Leader Board" },
            { icon: MapPin, label: "Ground" },
            { icon: MessageSquare, label: "Chat" },
            { icon: Bell, label: "Notification" },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#303030] rounded-lg transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="px-6 my-4">
        <div className="h-px bg-[#ffffff]"></div>
      </div>

      <div className="px-2">
        <div className="space-y-1">
          {[
            { icon: Users, label: "Followed Team", count: "3" },
            { icon: Users, label: "Followed Players", count: "12" },
            { icon: MapPin, label: "Followed Ground", count: "2" },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-[#303030] rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
              <span className="text-xs bg-[#303030] px-2 py-1 rounded-full">
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 my-4">
        <div className="h-px bg-[#ffffff]"></div>
      </div>

      <div className="px-2 space-y-1">
        <a
          href="#"
          className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#303030] rounded-lg transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#303030] rounded-lg transition-colors"
        >
          <Download className="h-5 w-5" />
          <span>Download The App</span>
        </a>
      </div>

      <div className="mt-auto">
        <div className="px-4 py-2 mx-2 bg-[#303030] rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5 text-gray-300" />
            <span className="text-gray-300 text-sm">Light</span>
          </div>
          <div className="flex space-x-2 bg-[#222222] rounded-lg flex items-center justify-between p-4">
            <Moon className="h-5 w-5 text-gray-300" />
            <span className="text-gray-300 text-sm">Dark</span>
          </div>
          {/* <div className="p-1 rounded-lg text-gray-300">
            <Moon className="h-5 w-5" />
          </div> */}
        </div>

        <div className="p-2 mt-4">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-[#C3CC5A] flex items-center justify-center text-black font-medium">
                VK
              </div>
              <div className="flex-1">
                <div className="text-gray-300 text-sm font-medium">
                  Varun_kubal
                </div>
                <div className="text-xs text-gray-500">
                  varun_kubal@gmail.com
                </div>
              </div>
            </div>
            <button className="rounded-lg bg-[#303030] p-2 text-gray-400">
              <img src="/logout.svg" alt="Logout" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
