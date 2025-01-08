import React from 'react';
import { BookmarkIcon, ChevronRight } from 'lucide-react';

const Trending = () => {
  const trendingNews = [
    {
      id: 1,
      title: "Results And Scores From The Premier League...!!",
      image: "/BigNews.png",
      timeAgo: "5 Hours Ago",
      isBig: true
    },
    {
      id: 2,
      title: "Here Are The Top 100 Players And Managers",
      image: "/SmallNews1.png",
      timeAgo: "11 Oct 2023, 06:00 AM"
    },
    {
      id: 3,
      title: "Results And Scores From The Premier League...!!",
      image: "/SmallNews2.png",
      timeAgo: "10 Oct 2023, 09:00 PM"
    },
    {
      id: 4,
      title: "Join Or Start A Competition Now!",
      image: "/SmallNews3.png",
      timeAgo: "10 Oct 2023, 02:40 PM"
    },
    {
      id: 5,
      title: "Results And Scores From The Premier League...!!",
      image: "/SmallNews4.png",
      timeAgo: "09 Oct 2023, 08:12 AM"
    },
    {
      id: 6,
      title: "Results And Scores From The Premier League...!!",
      image: "/SmallNews5.png",
      timeAgo: "09 Oct 2023, 02:00 PM"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-base font-medium">Trending News</h3>
        <ChevronRight className="w-5 h-5 text-[#C3CD5A]" />
      </div>

      <div className="space-y-4">
        {trendingNews.map((news, index) => (
          <div key={news.id} className="group">
            {index === 0 ? (
              <div className="mb-4">
                <img
                  src={news.image}
                  alt="News thumbnail"
                  className="w-full h-40 rounded-xl object-cover mb-3"
                />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white text-sm leading-tight mb-1">{news.title}</h4>
                    <span className="text-gray-400 text-xs">{news.timeAgo}</span>
                  </div>
                  <BookmarkIcon className="w-5 h-5 text-[#C3CD5A] cursor-pointer" />
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <img
                  src={news.image}
                  alt="News thumbnail"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-white text-sm leading-tight mb-1">{news.title}</h4>
                  <span className="text-gray-400 text-xs">{news.timeAgo}</span>
                </div>
                <BookmarkIcon className="w-5 h-5 text-gray-400 hover:text-[#C3CD5A] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
