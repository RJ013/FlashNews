"use client";

import React from "react";
import Image from "next/image";

type Article = {
  id: number;
  title: string;
  content: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source?: {
    name: string;
    url: string;
  };
};

type NewsSectionProps = {
  news: Article[];
};

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  // Sort news by publishedAt date, putting the most recent items first
  const sortedNews = [...news].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // Format date function (similar to what would be in @/lib/utils)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="py-12 px-4 sm:px-8 lg:px-16 bg-gray-100 mx-auto max-w-screen-xl lg:max-w-screen-2xl" style={{ margin: "0 auto" }}>
      <div className="flex justify-between items-center mb-10">
        <div className="hidden md:flex space-x-2">
          <button className="px-3 py-2 bg-white text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 mx-auto" style={{ maxWidth: "90%", margin: "0 auto" }}>
        {sortedNews.map((item, index) => (
          <div key={`${item.id}-${index}`} className="h-full flex flex-col md:flex-row md:items-center justify-center px-4 py-6 md:py-0">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full mx-auto flex flex-col md:flex-row hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-56 md:h-auto md:w-1/2">
                <Image
                  src={item.image || "/placeholder.svg?height=400&width=600"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{formatDate(item.publishedAt)}</span>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">{item.source?.name}</span>
                </div>
                <p className="text-black font-bold mb-3">{item.title}</p>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <br/>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center text-blue-500 font-large hover:underline"
                >
                  <span className="text-sm bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">Read full story</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;