import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Banner from "../components/Banner/Banner";
import LatestNews from "../components/LN/LatestNews";
import { FiChevronsRight } from "react-icons/fi"; 

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      console.log(data);
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const categories = [
    "top-headlines",
    "cultural",
    "bank-nifty-sensex",
    "education",
    "bollywood-hollywood",
    "sports",
    "health",
    "international-news",
  ];

  const getCategoryPosts = (category) => {
    return posts.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-8 py-7">
      {/* Banner Section */}
      {/* <Banner trendingNews={trendingNews} /> */}
      <Banner />

      {/* Category Sections */}
      {categories.map((category, index) => {
        const categoryPosts = getCategoryPosts(category);
        return (
          categoryPosts.length > 0 && (
            <section
              key={category}
              className={`flex flex-col gap-6 ${
                index !== 0 ? "mt-8 pt-8 border-t border-gray-300" : ""
              }`}
            >
              <div className="latest-news-title flex justify-between items-center cursor-pointer">
                <h2 className="text-3xl font-semibold text-center capitalize hover:text-blue-500">
                  {category.replace("-", " ")}
                </h2>
                <div className="latest-news-title-panel flex items-center cursor-pointer text-blue-500 dark:text-blue-300">
                  <Link
                    to={`/search?${category.toLowerCase()}`}
                    className="mr-2 hover:underline text-black"
                  >
                    View all in {category.replace("-", " ")}
                  </Link>
                  <FiChevronsRight className="title-icon text-black" />
                </div>
              </div>
              <div className="flex overflow-x-auto py-4">
                <div className="flex flex-nowrap gap-4 px-4">
                  {categoryPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            </section>
          )
        );
      })}

      <LatestNews />
    </div>
  );
}
