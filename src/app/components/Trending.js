import React from 'react';
import { BookmarkIcon, ChevronRight } from 'lucide-react';

const Trending = () => {
  const trendingNews = [
    {
      id: 1,
      title: "Results And Scores From The Premier League...!!",
      image: "/api/placeholder/40/40",
      timeAgo: "5 Hours Ago"
    },
    {
      id: 2,
      title: "Results And Scores From The Premier League...!!",
      image: "/api/placeholder/40/40",
      timeAgo: "5 Hours Ago"
    },
    {
      id: 3,
      title: "Results And Scores From The Premier League...!!",
      image: "/api/placeholder/40/40",
      timeAgo: "5 Hours Ago"
    },
    {
      id: 4,
      title: "Results And Scores From The Premier League...!!",
      image: "/api/placeholder/40/40",
      timeAgo: "5 Hours Ago"
    },
    {
      id: 5,
      title: "Results And Scores From The Premier League...!!",
      image: "/api/placeholder/40/40",
      timeAgo: "5 Hours Ago"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-sm font-medium">Trending News</h3>
        <ChevronRight className="w-4 h-4 text-[#C3CD5A]" />
      </div>

      <div className="space-y-4">
        {trendingNews.map((news) => (
          <div key={news.id} className="flex items-start gap-3 group">
            <img
              src={news.image}
              alt="News thumbnail"
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex-1">
              <h4 className="text-white text-sm leading-tight mb-1">{news.title}</h4>
              <span className="text-gray-400 text-xs">{news.timeAgo}</span>
            </div>
            <BookmarkIcon className="w-5 h-5 text-gray-400 hover:text-[#C3CD5A] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;