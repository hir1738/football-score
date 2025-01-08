"use client";

import React, { useState } from "react";
import { Search, Menu, X, BookmarkIcon } from "lucide-react";
import { format, addDays, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import Sidebar from "./Sidebar";
import Trending from "./Trending";

const Fixtures = () => {
  const [date, setDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["fixtures", format(date, "yyyy-MM-dd")],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/fixtures?date=${format(date, "yyyy-MM-dd")}`
        );
        if (!response.ok) throw new Error("Failed to fetch fixtures");
        const data = await response.json();
        console.log("Fetched data:", data);
        return data;
      } catch (error) {
        console.error("Error fetching fixtures:", error);
        return { data: [] };
      }
    },
  });

  const fixtures = apiResponse?.data || [];

  const getDates = () => {
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const currentDate = addDays(date, i);
      const dateStr = format(currentDate, "dd MMM");
      const fullDateStr = format(currentDate, "yyyy-MM-dd");
      const today = format(new Date(), "yyyy-MM-dd");

      let label = format(currentDate, "EEE");
      if (fullDateStr === today) label = "Today";

      dates.push({
        label,
        date: dateStr,
        fullDate: currentDate,
        isActive: fullDateStr === format(date, "yyyy-MM-dd"),
      });
    }
    return dates;
  };

  const groupFixturesByLeague = (fixturesData) => {
    if (!fixturesData || !Array.isArray(fixturesData)) return {};

    const leagueNames = {
      501: "Scottish Premiership",
    };

    return fixturesData.reduce((acc, fixture) => {
      const leagueId = fixture.league_id;
      if (!acc[leagueId]) {
        acc[leagueId] = {
          id: leagueId,
          name: leagueNames[leagueId] || `League ${leagueId}`,
          matches: [],
        };
      }
      acc[leagueId].matches.push({
        id: fixture.id,
        name: fixture.name,
        starting_at: fixture.starting_at,
        state_id: fixture.state_id,
      });
      return acc;
    }, {});
  };

  const handleCalendarSelect = (newDate) => {
    setDate(newDate);
    setIsCalendarOpen(false);
  };

  const hasFixtures = fixtures && fixtures.length > 0;
  const groupedFixtures = hasFixtures ? groupFixturesByLeague(fixtures) : {};

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#121212]">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#252525] rounded-lg"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6 text-gray-300" />
        ) : (
          <Menu className="h-6 w-6 text-gray-300" />
        )}
      </button>
      <div
        className={`lg:w-64 bg-[#121212] ${
          isSidebarOpen ? "fixed inset-0 z-40 w-64" : "hidden lg:block"
        }`}
      >
        <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="flex-1">
        <div className="container mx-auto px-4 py-6 max-w-[1440px] lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <div>
                <img
                  src="/HeroBanner.png"
                  alt="Football banner"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 mt-6">
                <div className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-[#C3CD5A] rounded-full"></div>
                  <span className="text-gray-300 text-sm">Live</span>
                  <span className="text-gray-300 text-sm">(1)</span>
                </div>
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search For Matches"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1A1A1A] pl-10 pr-4 py-2 rounded-lg text-gray-300 text-sm focus:outline-none"
                  />
                </div>
                <select className="bg-[#1A1A1A] text-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none w-full sm:w-auto">
                  <option>All Matches</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                  <div className="flex space-x-2">
                    {getDates().map((d, index) => (
                      <button
                        key={index}
                        onClick={() => setDate(d.fullDate)}
                        className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm ${
                          d.isActive
                            ? "bg-[#C3CD5A] text-black"
                            : "bg-[#1A1A1A] text-gray-300"
                        }`}
                      >
                        <div className="font-medium">{d.label}</div>
                        <div className="text-xs mt-1">{d.date}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button className="px-4 py-2 bg-[#1A1A1A] text-gray-300 rounded-lg text-sm hover:bg-[#252525] w-full sm:w-auto">
                      View Calendar
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#1A1A1A] border-[#252525]">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={handleCalendarSelect}
                      className="rounded-lg border-0"
                      classNames={{
                        months: "space-y-4",
                        month: "space-y-4",
                        caption:
                          "flex justify-center pt-1 relative items-center text-gray-100",
                        caption_label: "text-sm font-medium",
                        nav: "space-x-1 flex items-center",
                        nav_button:
                          "h-7 w-7 bg-[#252525] hover:bg-[#303030] rounded-md flex items-center justify-center text-gray-300",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell:
                          "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "text-center text-sm relative p-0 hover:bg-[#252525] rounded-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal text-gray-100 hover:bg-[#252525] rounded-md aria-selected:opacity-100",
                        day_selected:
                          "bg-[#C3CD5A] text-black hover:bg-[#C3CD5A] hover:text-black focus:bg-[#C3CD5A] focus:text-black",
                        day_today: "bg-[#252525] text-gray-100",
                        day_outside: "text-gray-600 opacity-50",
                        day_disabled: "text-gray-600",
                        day_range_middle:
                          "aria-selected:bg-[#252525] aria-selected:text-gray-100",
                        day_hidden: "invisible",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="w-8 h-8 border-4 border-[#C3CD5A] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : !hasFixtures ? (
                <div className="mx-4 flex justify-center items-center h-64 bg-[#1A1A1A] rounded-lg">
                  <p className="text-gray-400 text-lg">
                    No Matches for the given date
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.values(groupedFixtures).map((league) => (
                    <div key={league.id} className="bg-[#1A1A1A]">
                      <div className="px-4 py-3 bg-[#252525] flex items-center gap-2">
                        <img
                          src="/api/placeholder/20/20"
                          alt={league.name}
                          className="w-5 h-5"
                        />
                        <span className="text-gray-300 text-sm">
                          {league.name}
                        </span>
                      </div>
                      <div className="px-4 py-2 space-y-4">
                        {league.matches.map((match) => (
                          <div
                            key={match.id}
                            className="flex items-center justify-between py-2"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-[#C3CD5A] w-12 text-sm">
                                {format(parseISO(match.starting_at), "HH:mm")}
                              </span>
                              <span className="text-gray-300">
                                {match.name}
                              </span>
                            </div>
                            <BookmarkIcon className="h-5 w-5 text-gray-400 hover:text-[#C3CD5A] cursor-pointer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 lg:hidden">
                <div className="bg-[#1A1A1A] p-4">
                  <Trending />
                </div>
              </div>
            </div>
            <div className="hidden lg:block w-[280px] flex-shrink-0">
              <div className="bg-[#1A1A1A] p-4 rounded-lg">
                <Trending />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fixtures;
