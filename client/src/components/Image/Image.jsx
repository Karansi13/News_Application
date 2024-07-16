import { useState } from "react";
import { Link } from "react-router-dom";


// function Image({ image, heading, content, author, date, linkTo }) {
//   const [scaleHover, setScaleHover] = useState("");

//   return (
//     <Link
//   // to={`/post/${posts.slug}`}
//   className="flex w-full h-full relative overflow-hidden"
//   onMouseEnter={() => setScaleHover("bg-[#4db2ec] scale-[1.08]")}
//   onMouseLeave={() => setScaleHover("scale-[1]")}
// >
//       <img
//         className={`absolute w-full top-0 left-0 h-full object-cover ${scaleHover} transition-all`}
//         src={image}
//         alt={heading}
//       />
//       <div className="absolute w-full h-full left-0 top-0 flex flex-col justify-end">
//         <div className="z-60 relative text-white pb-4 pl-4 flex flex-col gap-2">
//           <div className="flex">
//             <Link
//               className={`bg-[#222222] text-white px-2 py-1 text-xs text-center flex items-center ${scaleHover}`}
//             >
//               {heading}
//             </Link>
//           </div>
//           <div className="text-[1rem] font-semibold text-sm md:text-xl md:max-w-[26rem]">
//             {content}
//           </div>
//           <div>
//             <span>{author}</span> - <span>{date}</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default Image;


function Image({ image, heading, content, author, date, linkTo }) {
  const [scaleHover, setScaleHover] = useState("");

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

  return (
    <Link
      to={linkTo}
      className="flex w-full h-full relative overflow-hidden"
      onMouseEnter={() => setScaleHover("bg-[#4db2ec] scale-[1.08]")}
      onMouseLeave={() => setScaleHover("scale-[1]")}
    >
      <img
        className={`absolute w-full top-0 left-0 h-full object-cover ${scaleHover} transition-all`}
        src={image}
        alt={heading}
      />
      <div className="absolute w-full h-full left-0 top-0 flex flex-col justify-end">
        <div className="z-60 relative text-white pb-4 pl-4 flex flex-col gap-2">
          <div className="flex">
            <Link
              className={`bg-[#222222] text-white px-2 py-1 text-xs text-center flex items-center ${scaleHover}`}
            >
              {heading}
            </Link>
          </div>
          <div className="text-[1rem] font-semibold text-sm md:text-xl md:max-w-[26rem]">
            {content}
          </div>
          <div>
          <span>{formatDate(date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}


export default Image;