import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import footerImage from "../../assets/footer-bg1.jpg";
import logo from "../../assets/Spreadly.png";
import { Link } from "react-router-dom";
import { FaFacebookF, FaPlay, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [editorPicksPosts, setEditorPicksPosts] = useState([]);
  const [fashionPosts, setFashionPosts] = useState([]);
  const [lifestylePosts, setLifestylePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/api/post/getposts');
        const data = await response.json();

       
        const editorPicks = data.posts.filter(post =>
          post.category.includes("top-headlines") 
        ).slice(0, 3); 

        
        const fashion = data.posts.filter(post =>
          post.category.includes("education") 
        ).slice(0, 3); 

       
        const lifestyle = data.posts.filter(post =>
          post.category.includes("health") 
        ).slice(0, 3);

        // Set states
        setEditorPicksPosts(editorPicks);
        setFashionPosts(fashion);
        setLifestylePosts(lifestyle);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching footer data:', error);
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return <div>Loading footer content...</div>;
  }

  return (
    <div className='flex w-full mt-10 text-white'>
      <div className='w-full relative md:min-h-[800px] sm:min-h-[1300px] min-h-[1000px]'>
        <div className='absolute top-0 left-0 w-full h-full'>
          <img src={footerImage} className='w-full h-full object-cover' alt='' />
        </div>
        <div className='top-0 left-0 bottom-0 absolute w-full h-full bg-neutral-900 opacity-[0.9] z-10 text-white'>
          <div className='mx-auto max-w-[1070px] h-full flex flex-col px-6 md:px-2'>
            <div className='w-full pt-12'>
              <div className='flex flex-col md:flex-row md:gap-[2%]'>
                <div className='flex flex-col gap-4 w-full md:w-[32%]'>
                  <div className='flex text-white font-semibold'>Top Headlines</div>
                  {editorPicksPosts.map((post, idx) => (
                    <Link key={idx} to={`/post/${post.slug}`} className="w-full">
                      <Card
                        card_class={"flex gap-5 w-full"}
                        image_class={"w-[100px] sm:w-[150px] sm:h-[90px] md:w-[100px] h-[60px] md:h-[80px]"}
                        image={post.image}
                        title={post.title}
                        author={post.author}
                        text_hover={" text-[#f9c100] "}
                        text_size={"text-sm text-white"}
                      />
                    </Link>
                  ))}
                </div>
                <div className='flex flex-col gap-4 w-full md:w-[32%]'>
                  <div className='flex text-white font-semibold'>Education</div>
                  {fashionPosts.map((post, idx) => (
                    <Link key={idx} to={`/post/${post.slug}`} className="w-full">
                      <Card
                        card_class={"flex gap-5 w-full"}
                        image_class={"w-[100px] sm:w-[150px] sm:h-[90px] md:w-[100px] h-[60px] md:h-[80px]"}
                        image={post.image}
                        title={post.title}
                        author={post.author}
                        text_hover={" text-[#f9c100] "}
                        text_size={"text-sm text-white"}
                      />
                    </Link>
                  ))}
                </div>
                <div className='flex flex-col gap-4 w-full md:w-[32%]'>
                  <div className='flex text-white font-semibold'>Health</div>
                  {lifestylePosts.map((post, idx) => (
                    <Link key={idx} to={`/post/${post.slug}`} className="w-full">
                      <Card
                        card_class={"flex gap-5 w-full"}
                        image_class={"w-[100px] sm:w-[150px] sm:h-[90px] md:w-[100px] h-[60px] md:h-[80px]"}
                        image={post.image}
                        title={post.title}
                        author={post.author}
                        text_hover={" text-[#f9c100] "}
                        text_size={"text-sm text-white"}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className='w-full px-[10%] py-10 md:py-20'>
              <div className='w-full border-b-gray-500 border-b-[1px]'></div>
            </div>
            <div className='flex flex-col w-full gap-4 md:gap-[4%] md:flex-row'>
              <div className='flex items-center md:w-[23%]'>
                <div className='flex justify-center w-full'>
                  <img src={logo} alt="Logo" />
                </div>
              </div>
              <div className='flex items-center md:w-[50%]'>
                <div className='flex items-center flex-col md:items-start gap-4 w-full'>
                  <div className='flex text-white font-semibold'>ABOUT US</div>
                  <div className='text-center md:text-start'>
                    Spreadly Bharat is your news portal providing you with an endless variety of news, entertainment, music, fashion website. We
                    provide you with the latest breaking news and videos.
                  </div>
                  <div className='flex gap-1 items-center'>
                    <div>Contact us: </div>
                    <div>
                      <Link className='text-[#4db2ec]' to="mailto:contact@yoursite.com">bharatspreadly@gmail.com</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex md:w-[23%]'>
                <div className='flex items-center flex-col md:items-start gap-4 w-full'>
                  <div className='flex text-white font-semibold'>FOLLOW US</div>
                  <div className='flex w-full gap-2 justify-center md:justify-start'>
                    <Link className='flex items-center justify-between' to="https://facebook.com">
                      <span className='flex items-center justify-center bg-slate-500 text-white p-2'>
                        <FaFacebookF size={20} />
                      </span>
                    </Link>
                    <Link className='flex items-center justify-between' to="https://twitter.com">
                      <span className='flex items-center justify-center bg-[#4DB2EC] text-white p-2'>
                        <FaTwitter size={20} />
                      </span>
                    </Link>
                    <Link className='flex items-center justify-between' to="https://youtube.com">
                      <span className='flex items-center justify-center bg-[#da513b] text-white p-2'>
                        <FaPlay size={20} />
                      </span>
                    </Link>
                    <Link className='flex items-center justify-between' to="https://instagram.com">
                      <span className='flex items-center justify-center bg-[#ee2a7b] text-white p-2'>
                        <FaInstagram size={20} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full text-center py-4'>
              <div>© 2024 Developed by Novanex Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
