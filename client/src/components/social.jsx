import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaVimeoV, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsCloudsFill, BsInstagram, BsYoutube } from "react-icons/bs";
import { useSelector } from 'react-redux';

function Social() {
  const { currentUser } = useSelector((state) => state.user);
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: null,
    location: "Loading...",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 60000); // Update the date every minute

    const fetchWeather = async (lat, lon) => {
      try {
        const apiKey = "bd5e378503939ddaee76f12ad7a97608";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        setWeather({
          temp: response.data.main.temp,
          location: response.data.name,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather({
          temp: null,
          location: "Unable to fetch location",
        });
      }
    };

    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setWeather({
              temp: null,
              location: "Location access denied",
            });
          }
        );
      } else {
        setWeather({
          temp: null,
          location: "Geolocation not supported",
        });
      }
    };

    fetchLocation();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full bg-[#222222] hidden md:block'>
      <div className='mx-auto max-w-[1070px] flex flex-col'>
        <div className='flex items-center py-1 px-1 w-full justify-between text-[#fafafa] text-xs font-semibold'>
          <div className='flex gap-8 items-center'>
            <span className='flex items-center gap-2'>
              <BsCloudsFill size={20} />
              {weather.temp !== null ? `${weather.temp}°C` : "Loading..."}
              <span>{weather.location}</span>
            </span>
            <span>{date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className='flex gap-3 items-center'>
            {!currentUser ? (
          <li>
            <Link className='hover:text-[#4db2ec]' to={'/sign-in'}>
              Sign in / Join
            </Link>
          </li>
        ) : null}
              
            </span>
          </div>
          <div className='flex gap-3'>
            <Link className='hover:text-[#4db2ec]' to={"#"}>
              <FaFacebookF />
            </Link>
            <Link className='hover:text-[#4db2ec]' to={"#"}>
              <BsInstagram />
            </Link>
            <Link className='hover:text-[#4db2ec]' to={"#"}>
              <FaXTwitter />
            </Link>
            {/* <Link className='hover:text-[#4db2ec]' to={"#"}>
              <FaVimeoV />
            </Link> */}
            <Link className='hover:text-[#4db2ec]' to={"#"}>
              <BsYoutube />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Social;
