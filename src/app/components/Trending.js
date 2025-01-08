import React from 'react';
import { ChevronRight, BookmarkIcon } from 'lucide-react';

const Trending = () => {
  return (
    <div className="w-80 p-4 bg-[#1A1A1A] rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-300 font-medium">Trending News</h2>
        <ChevronRight className="h-5 w-5 text-[#C3CD5A]" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex items-start space-x-3">
            <img 
              src="/api/placeholder/80/60" 
              alt="News thumbnail" 
              className="w-20 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-gray-300 text-sm font-medium line-clamp-2">
                Results And Scores From The Premier League...!!
              </h3>
              <p className="text-gray-500 text-xs mt-1">5 Hours Ago</p>
            </div>
            <BookmarkIcon className="h-5 w-5 text-gray-400 hover:text-[#C3CD5A] cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;