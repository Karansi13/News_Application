import { useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "../../Components/Image/Image";

function Trending({ posts }) {
  const [bgColor, setBgColor] = useState("bg-primary");
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [scaleHover, setScaleHover] = useState("");

  console.log(posts);

  if (!posts || posts.length === 0) {
    return <p>No trending posts available.</p>;
  }

  const handlePrevPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  const handleNextPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  function truncateTitle(title, wordLimit) {
    const words = title.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return title;
  }


  const currentTitle = posts[currentPostIndex]?.title;
  const truncatedTitle = truncateTitle(currentTitle, 4);

  return (
    <>  
      <div className="flex sm:justify-between justify-between items-center p-3 w-full ">
        <div className="flex justify-center items-center flex-row p-3 md:p-5 gap-3 md:gap-3">
          <Link
             className={`bg-[#222222] text-white px-2 py-1 text-xs text-center flex items-center ${scaleHover}`}
             onMouseEnter={() => setScaleHover("bg-[#4db2ec]")}
      onMouseLeave={() => setScaleHover("scale-[1]")}
          >
            TRENDING NOW:-
          </Link>
          <div
            className="text-secondary font-medium hover:cursor-pointer text-center"
            onMouseEnter={() => setBgColor("bg-accent")}
            onMouseLeave={() => setBgColor("bg-primary")}
          >
            <Link
              to={`/post/${posts[currentPostIndex].slug}`}
              className="text-grey hover:underline"
            >
              <span className="hidden md:inline">{currentTitle}</span>
              <span className="inline md:hidden">{truncatedTitle}</span>
            </Link>

          </div>
        </div>
        <div className="flex items-center sm:justify-between gap-2  sm:flex-row ">
          <button
            onClick={handlePrevPost}
            className="border p-1 text-secondary hover:bg-accent hover:text-white"
          >
            <MdKeyboardArrowLeft size={15} />
          </button>
          <button
            onClick={handleNextPost}
            className="border p-1 text-secondary hover:bg-accent hover:text-white"
          >
            <MdKeyboardArrowRight size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-[2px]">
        <div className="w-full h-[320px] md:w-[49%] md:h-[400px] lg:h-[470px]">
          {posts[currentPostIndex] && (
            <Link to={`/post/${posts[currentPostIndex].slug}`}>
              <Image
                image={posts[currentPostIndex].image}
                heading={"TRENDING NOW"}
                content={posts[currentPostIndex].title}
                author={posts[currentPostIndex].author}
                date={posts[currentPostIndex].updatedAt}
              />
            </Link>
          )}
        </div>
        <div className="w-full h-[180px] md:w-[51%] md:h-[400px] lg:h-[470px] overflow-x-scroll md:overflow-hidden flex md:flex-col gap-[2px]">
          {/* {posts.map((post, index) => {
            if (index === currentPostIndex) return null;
            return (
              <div key={post.slug} className="w-[400px] md:w-full h-full md:h-[248px] lg:h-[298px] ">
                <Link to={`/post/${posts[currentPostIndex].slug}`}>
                  <Image
                    image={post.image}
                    heading={"TRENDING NOW"}
                    content={post.title}
                    author={post.author}
                    date={post.date}
                  />
                </Link>
              </div>
            );
          })} */}
          {posts.map((post, index) => {
            if (index === currentPostIndex) return null;
            return (
              <div
                key={post.slug}
                className="w-[400px] md:w-full h-full md:h-[248px] lg:h-[298px] "
              >
                <Link to={`/post/${post.slug}`}>
                  <Image
                    image={post.image}
                    heading={"TRENDING NOW"}
                    content={post.title}
                    author={post.author}
                    date={post.updatedAt}
                    linkTo={`/post/${post.slug}`}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Trending;
