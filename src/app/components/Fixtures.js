'use client'

import React, { useState } from 'react';
import { Search, Home, Users, MapPin, MessageSquare, Bell, Settings, Download, Sun, Calendar, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useQuery } from '@tanstack/react-query';

const Fixtures = () => {
  const [date, setDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: fixtures, isLoading } = useQuery({
    queryKey: ['fixtures', format(date, 'yyyy-MM-dd')],
    queryFn: async () => {
      const response = await fetch(`/api/fixtures?date=${format(date, 'yyyy-MM-dd')}`);
      if (!response.ok) throw new Error('Failed to fetch fixtures');
      return response.json();
    }
  });

  const getDates = () => {
    const dates = [];
    for (let i = -2; i <= 3; i++) {
      const currentDate = i === 0 ? date : i < 0 ? subDays(date, Math.abs(i)) : addDays(date, i);
      let label = format(currentDate, 'EEEE');
      if (i === -1) label = 'Yesterday';
      if (i === 0) label = 'Today';
      if (i === 1) label = 'Tomorrow';
      
      dates.push({
        label,
        date: format(currentDate, 'dd MMM'),
        fullDate: currentDate,
        active: i === 0
      });
    }
    return dates;
  };

  const handleCalendarSelect = (newDate) => {
    if (newDate) {
      setDate(newDate);
      setIsCalendarOpen(false);
    }
  };

  const CustomCalendarHeader = ({
    currentMonth,
    onPreviousMonth,
    onNextMonth,
  }) => {
    const month = format(currentMonth, 'MMMM yyyy');
    return (
      <div className="flex justify-between items-center px-2 py-1">
        <button onClick={onPreviousMonth} className="p-1 hover:bg-[#C3CD5A]/10 rounded-md">
          <ChevronLeft className="h-4 w-4 text-gray-300" />
        </button>
        <div className="text-gray-300 text-sm font-medium">
          {month}
        </div>
        <button onClick={onNextMonth} className="p-1 hover:bg-[#C3CD5A]/10 rounded-md">
          <ChevronRight className="h-4 w-4 text-gray-300" />
        </button>
      </div>
    );
  };

  const filteredFixtures = fixtures?.data?.filter(fixture =>
    fixture.name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-[#C3CD5A] text-xl font-bold">FOOTBALLSHURU</h1>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-[#222222] pl-10 pr-4 py-2 rounded-md text-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <nav className="space-y-4 flex-1">
        {[
          { icon: Home, label: 'Home', active: true },
          { icon: Users, label: 'Leader Board' },
          { icon: MapPin, label: 'Ground' },
          { icon: MessageSquare, label: 'Chat' },
          { icon: Bell, label: 'Notification' },
        ].map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
              item.active ? 'bg-[#C3CD5A]/10 text-[#C3CD5A]' : 'text-gray-300 hover:bg-[#C3CD5A]/10'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <Settings className="h-5 w-5 text-gray-300" />
          <Download className="h-5 w-5 text-gray-300" />
          <Sun className="h-5 w-5 text-gray-300" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#222222]">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#303030] rounded-md"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6 text-gray-300" />
        ) : (
          <Menu className="h-6 w-6 text-gray-300" />
        )}
      </button>

      <div className={`
        fixed inset-y-0 left-0 transform lg:relative
        w-64 bg-[#303030] p-4 transition-transform duration-300 ease-in-out z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar />
      </div>

      <div className="flex-1 p-4 lg:p-6 ml-0 lg:ml-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 mt-12 lg:mt-0">
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
            {getDates().map((d) => (
              <button
                key={d.date}
                onClick={() => setDate(d.fullDate)}
                className={`px-3 sm:px-4 py-2 rounded-md transition-colors ${
                  d.active ? 'bg-[#C3CD5A]/10 text-[#C3CD5A]' : 'text-gray-300 hover:bg-[#303030]'
                }`}
              >
                <div className="text-xs sm:text-sm font-medium">{d.label}</div>
                <div className="text-xs opacity-80">{d.date}</div>
              </button>
            ))}
          </div>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <button className="p-2 rounded-md bg-[#303030] text-gray-300 hover:bg-[#C3CD5A]/10 transition-colors">
                <Calendar className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#222222] border-[#404040]">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleCalendarSelect}
                className="rounded-md border-0 bg-[#222222]"
                components={{
                  Header: CustomCalendarHeader
                }}
                classNames={{
                  months: "bg-[#222222]",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center bg-[#222222]",
                  caption_label: "text-sm font-medium text-gray-300",
                  nav: "space-x-1 flex items-center bg-[#222222]",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1 bg-[#222222]",
                  head_row: "flex bg-[#222222]",
                  head_cell: "text-gray-400 rounded-md w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2 bg-[#222222]",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#222222]",
                  day: "h-8 w-8 p-0 font-normal text-gray-300 aria-selected:opacity-100 hover:bg-[#C3CD5A]/10 rounded-md",
                  day_selected: "bg-[#C3CD5A] text-[#222222] hover:bg-[#C3CD5A]",
                  day_today: "bg-[#C3CD5A]/10 text-[#C3CD5A] font-semibold",
                  day_outside: "text-gray-400 opacity-50",
                  day_disabled: "text-gray-400 opacity-50",
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
        ) : (
          <div className="space-y-2">
            {filteredFixtures.length > 0 ? (
              filteredFixtures.map((fixture) => (
                <div
                  key={fixture.id}
                  className="bg-[#303030] hover:bg-[#404040] p-3 sm:p-4 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        {fixture.league_id ? `League ${fixture.league_id}` : 'League'}
                      </span>
                      {fixture.leg && (
                        <>
                          <span className="text-gray-400 text-xs sm:text-sm">•</span>
                          <span className="text-gray-400 text-xs sm:text-sm">{fixture.leg}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 sm:space-x-8">
                    <div className="w-12 sm:w-16 text-gray-300 text-xs sm:text-sm">
                      {format(new Date(fixture.starting_at), 'HH:mm')}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-300 text-sm sm:text-base">
                        {fixture.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-64 text-gray-400">
                No matches available for this date
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fixtures;
