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
    <div className="flex flex-col h-full bg-[#1A1A1A]">
      <div className="p-4 space-y-6">
        {/* <h1 className="text-xl font-bold">
          <span className="text-white">FOOTBALL</span>
          <span className="text-[#C3CD5A]">SHURU</span>
        </h1> */}
        <img
          src="/footballshuru.png"
          alt="Main Logo"
        //   className="w-full h-full"
        />

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#252525] pl-10 pr-4 py-2 rounded-lg text-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#C3CD5A]/50"
          />
        </div>
      </div>

      <nav className="px-2 mt-2">
        <div className="space-y-1">
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-[#C3CD5A] rounded-lg bg-[#252525]/50"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#252525]/50 rounded-lg transition-colors"
          >
            <Users className="h-5 w-5" />
            <span>Leader Board</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#252525]/50 rounded-lg transition-colors"
          >
            <MapPin className="h-5 w-5" />
            <span>Ground</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#252525]/50 rounded-lg transition-colors"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Chat</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#252525]/50 rounded-lg transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span>Notification</span>
          </a>
        </div>
      </nav>

      <div className="px-2 mt-8">
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-[#252525]/50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5" />
              <span>Followed Team</span>
            </div>
            <span className="text-xs bg-[#252525] px-2 py-1 rounded-full">
              3
            </span>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-[#252525]/50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5" />
              <span>Followed Players</span>
            </div>
            <span className="text-xs bg-[#252525] px-2 py-1 rounded-full">
              12
            </span>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-[#252525]/50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5" />
              <span>Followed Ground</span>
            </div>
            <span className="text-xs bg-[#252525] px-2 py-1 rounded-full">
              2
            </span>
          </button>
        </div>
      </div>

      <div className="mt-auto p-4 space-y-4">
        <div className="space-y-1">
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#252525]/50 rounded-lg transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#252525]/50 rounded-lg transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Download The App</span>
          </a>
        </div>

        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5 text-gray-300" />
            <span className="text-gray-300">Light</span>
          </div>
          <button className="p-1 rounded-lg bg-[#252525] text-gray-300">
            <Moon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3 px-4 py-3 mt-4 border-t border-[#252525]">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
            VK
          </div>
          <div className="flex-1">
            <div className="text-gray-300 font-medium">Varun_kubal</div>
            <div className="text-sm text-gray-500">varun_kubal@gmail.com</div>
          </div>
          <button className="p-1 rounded-lg hover:bg-[#252525] text-gray-400">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
