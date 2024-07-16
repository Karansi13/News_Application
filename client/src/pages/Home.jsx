import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Banner from "../components/Banner/Banner";
import LatestNews from "../components/LN/LatestNews";
import { FiChevronsRight } from "react-icons/fi"; // Assuming you're using React Icons for the chevrons

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const [topStories, setTopStories] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [editorsPicks, setEditorsPicks] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      console.log(data);
      setPosts(data.posts);
      setBreakingNews(
        data.posts.filter((post) => post.category === "Breaking News")
      );
      setTopStories(data.posts.slice(0, 5));
      setFeaturedPosts(
        data.posts.filter((post) => post.category === "Featured Posts")
      );
      setEditorsPicks(
        data.posts.filter((post) => post.category === "Editor's Pick")
      ); // Assuming there's a category for Editor's Pick
      setTrendingNews(
        data.posts.filter((post) => post.category === "Trending").slice(0, 3)
      ); // Assuming 'Trending' category
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
                    to={`/search/${category.toLowerCase()}`}
                    className="mr-2 hover:underline"
                  >
                    View all in {category.replace("-", " ")}
                  </Link>
                  <FiChevronsRight className="title-icon" />
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
