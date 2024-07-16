import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Trending from "../Trending/Trending";
import { AiOutlineDoubleRight } from "react-icons/ai";

const Banner = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await fetch('/api/post/getPosts'); // Adjust API endpoint as per your backend setup
        const data = await response.json();
        setTrendingPosts(data.posts.slice(0, 4)); // Assuming you want to display the top 4 trending posts
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <section className="banner-page">
      <div className="banner container">
        <div className="banner-content">
          {loading ? (
            <p>Loading trending posts...</p> // Display a loading indicator
          ) : (
            <Trending posts={trendingPosts} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
