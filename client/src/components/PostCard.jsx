// import { Link } from 'react-router-dom';

// export default function PostCard({ post }) {
//   return (
//     <div className='group relative lg:w-[290px] border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px]  transition-all'>
//       <Link to={`/post/${post.slug}`}>
//         <img
//           src={post.image}
//           alt='post cover'
//           className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
//         />
//       </Link>
//       <div className='p-3 flex flex-col gap-2'>
//         <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
//         <span className='italic text-sm'>{post.category}</span>
//         <Link
//           to={`/post/${post.slug}`}
//           className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
//         >
//           Read article
//         </Link>
//       </div>
//     </div>
//   );
// }


import { Link } from 'react-router-dom';

function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true, 
    timeZone: 'Asia/Kolkata' 
  };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

export default function PostCard({ post }) {
  return (
    <div className='group relative flex-shrink-0 w-[250px] h-[400px] border border-teal-500 hover:border-2 overflow-hidden rounded-lg transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.category}</span>
        <span className='text-sm'>{formatDate(post.updatedAt)}</span>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read More..
        </Link>
      </div>
    </div>
  );
}