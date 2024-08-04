import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/post/getposts?category=${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [category]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className=' h-[70vh] sm:h-[65vh] p-3 w-full flex justify-center items-center'>
        <div className='flex text-[1.5rem] sm:text-[2rem] font-sans'>There are no posts in this category</div>
      </div>
    );
  }
  

  return (
    <div className='max-w-6xl mx-auto p-2 flex flex-col gap-8 py-7'>
      <div className='flex flex-col gap-6'>
        <h2 className='text-3xl font-semibold text-center'>{category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize the first letter */}</h2>
        <div className="flex flex-wrap py-4">
                <div className="flex flex-wrap gap-4 px-4  justify-center sm:justify-start">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
        <Link
          to={'/search'}
          className={`text-lg ${theme === 'light' ? 'text-black' : 'text-white'} hover:underline text-center`}
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};

export default CategoryPage;
