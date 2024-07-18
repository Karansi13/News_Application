import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShare2 } from "react-icons/fi"; 
import MyLoader from "./Loader";
import moment from "moment";
import { FiChevronsRight } from "react-icons/fi";

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        console.log(data.posts);
        setLatestNews(data.posts.slice(-5)); 
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch latest news:", error);
        setLoading(false);
      }
    };
    fetchLatestNews();
  }, []);

  // Function to handle sharing the post
  const handleSharePost = (slug) => {
    const shareUrl = `${window.location.origin}/post/${slug}`;
    navigator.share({ url: shareUrl })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
  };

  return (
    <section className="latestNews-page p-4">
      <div className="latest-news-title flex justify-between items-center cursor-pointer">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <div className="latest-news-title-panel flex items-center cursor-pointer text-blue-500 dark:text-blue-300">
          <Link to="/search" className="mr-2 text-black">
            See more
          </Link>
          <FiChevronsRight className="title-icon text-black" />
        </div>
      </div>
      {loading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <React.Fragment key={index}>
              <div className="news-box cursor-pointer p-4 bg-gray-100 dark:bg-gray-800 rounded-md mb-4">
                <MyLoader />
              </div>
              {index < 4 && <hr className="border-gray-300 dark:border-gray-700" />}
            </React.Fragment>
          ))}
        </>
      ) : (
        latestNews.map((news) => (
          <div key={news._id} className="mt-4 sm:flex-col">
            <div className="news-box flex flex-col sm:flex-row p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              {/* Image Section */}
              <Link to={`/post/${news.slug}`} className="news-box-img mb-4 sm:mr-4 sm:mb-0 sm:w-1/3">
                <img src={news.image} alt="news" className="w-full h-auto rounded-md" />
              </Link>
              
              {/* Content Section */}
              <div className="news-box-details flex-1">
                <div className="news-box-info">
                  <Link to={`/post/${news.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {news.title}
                    </h3>
                    <p className="line-clamp-4 text-gray-700 dark:text-gray-300">
                      {news.content}
                    </p>
                  </Link>
                </div>
                <div className="news-box-detail flex items-center justify-between mt-4 text-gray-500 dark:text-gray-400">
                  <p className="flex items-center">
                    {moment(news.createdAt).format("D MMMM YY")} - {moment(news.createdAt).fromNow()}
                  </p>
                  <span>
                    <button onClick={() => handleSharePost(news.slug)} className="icon text-xl cursor-pointer">
                      <FiShare2 />
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <hr className="border-gray-300 dark:border-gray-700 my-4" />
          </div>
        ))        
      )}
    </section>
  );
};

export default LatestNews;
