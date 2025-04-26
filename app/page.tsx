"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";

type Article = {
  id: number;
  title: string;
  content: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

// Categories for news
const categories = [
  "General",
  "Entertainment",
  "Science",
  "Technology",
  "Sports",
  "Business",
  "Health",
];

export default function Home() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("General");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY;

        const response = await fetch(
          `https://gnews.io/api/v4/top-headlines?category=${activeCategory.toLowerCase()}&apikey=${apiKey}&country=in`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Map GNews API response to our Article type
        const formattedNews = data.articles.map((article, index) => ({
          id: index,
          title: article.title,
          content: article.content,
          description: article.description,
          url: article.url,
          image: article.image || "/placeholder.svg?height=400&width=600",
          publishedAt: article.publishedAt,
          source: {
            name: article.source?.name || "Unknown",
            url: article.source?.url || "#"
          }
        }));

        setNews(formattedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setShowCategoryMenu(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCategoryMenu(false);
    };

    if (showCategoryMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showCategoryMenu]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center px-4">
        {/* Category Selector */}
        {!loading && (
          <div className="w-full max-w-xs">
            <div className="relative">
              <button
                className="w-full flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg shadow-md border border-gray-700 text-gray-100 hover:bg-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCategoryMenu(!showCategoryMenu);
                }}
              >
                <span className="font-semibold text-gray-100">{activeCategory}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-300 transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {showCategoryMenu && (
                <div className="absolute z-20 mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`w-full text-left px-4 py-3 border-b border-gray-700 last:border-0 ${
                        activeCategory === category
                          ? "bg-gray-700 text-blue-400 font-semibold"
                          : "text-gray-100 hover:bg-gray-700"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryChange(category);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {loading ? (
         <div className="flex justify-center items-center min-h-screen">
         <div className="text-center">
           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-3"></div>
           <p className="text-gray-500 text-sm">Loading news...</p>
         </div>
       </div>
      ) : (
        <NewsSection news={news} />
      )}
    </div>
  );
}
