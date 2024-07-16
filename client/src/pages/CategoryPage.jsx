// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const CategoryPage = () => {
//   const { category } = useParams();
//   console.log(category)
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(`/api/posts/getposts?category=${category}`);
//         console.log('Response status:', response.status);
//         console.log('Response text:', await response.text());
//         console.log(response);  
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data);
//         setPosts(data.posts);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [category]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (posts.length === 0) {
//     return <div>No posts found for this category</div>;
//   }

//   return (
//     <div className='max-w-6xl mx-auto p-2 flex flex-col gap-8 py-7'>
//         {posts && posts.length > 0 && (
//           <div className='flex flex-col gap-6'>
//             <h2 className='text-3xl font-semibold text-center'>Breaking News</h2>
//             <div className='flex flex-wrap gap-4'>
//               {posts.map((post) => (
//                 <PostCard key={post._id} post={post} />
//               ))}
//             </div>
//             <Link
//               to={'/search'}
//               className='text-lg text-teal-500 hover:underline text-center'
//             >
//               View all posts
//             </Link>
//           </div>
//         )}
//       </div>
//   );
// };

// export default CategoryPage;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';

const CategoryPage = () => {
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
    return <div>No posts found for this category</div>;
  }

  return (
    <div className='max-w-6xl mx-auto p-2 flex flex-col gap-8 py-7'>
      <div className='flex flex-col gap-6'>
        <h2 className='text-3xl font-semibold text-center'>Breaking News</h2>
        <div className="flex overflow-x-auto py-4">
                <div className="flex flex-nowrap gap-4 px-4">
                  {categoryPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
        <Link
          to={'/search'}
          className='text-lg text-teal-500 hover:underline text-center'
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};

export default CategoryPage;
