import React, { useEffect } from "react";
import { useWeatherContext } from "../weatherContext/weatherContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaTemperatureHigh } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import cloudPng from "../assets/cloudPng.png";

const WeatherData = () => {
  const { city, weatherData, setWeatherData } = useWeatherContext();

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = "5e4264872e29e642a21ad3acae2b4e10";
      const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
      try {
        const response = await axios.get(
          `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (response.status === 200) {
          setWeatherData(response.data);
          console.log(response.data);
        } else {
          console.error("Error fetching weather data.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city, setWeatherData]);

  if (!weatherData) {
    return (
      <div className="h-screen w-full bg-[#43AEFC] flex justify-center items-center">
        <h1 className="text-[white] font-bold text-[3rem]">Loading... 😛</h1>
      </div>
    );
  }
  return (
    <div className="h-screen w-full bg-[#43AEFC] flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-[80%] md:w-[30%]">
        <Link to={"/"} className="flex items-center">
          <AiOutlineArrowLeft className="mr-[5px] text-[#43AEFC]" />
          <h1 className="text-[1.1rem] border-[grey] font-semibold text-[#43AEFC]">
            Weather App
          </h1>
        </Link>
        <img
          className="w-[250px] h-[100px] m-auto object-contain mt-[10px]"
          src={cloudPng}
          alt=""
        />
        <h1 className="text-[3rem] font-bold text-center my-[10px] ">
          {Math.floor(weatherData.main.temp)}°C
        </h1>
        <p className="text-lg font-semibold text-center">
          {weatherData.weather[0].main}
        </p>
        <div className="flex items-center justify-center  mt-[5px]">
          <SlLocationPin
            style={{
              color: "grey",
              width: "20px",
              height: "15px",
              marginRight: "5px",
            }}
          />
          <p className="text-lg font-semibold text-center">
            {weatherData.name}, {weatherData.sys.country}
          </p>
        </div>
        <div className="flex justify-evenly border-t-[1px] border-[grey] mt-[20px] ">
          <div className="flex pt-[6px] items-center">
            <FaTemperatureHigh
              style={{
                color: "#43AEFC",
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            />
            <div>
              <p className="font-bold">
                {Math.floor(weatherData.main.feels_like)}°C
              </p>
              <p className="text-[10px]">Feels like</p>
            </div>
          </div>
          <div className="border-1 border"></div>
          <div className="flex pt-[6px] items-center">
            <BsDropletHalf
              style={{
                color: "#43AEFC",
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            />
            <div>
              <p className="font-bold">{weatherData.main.humidity}%</p>
              <p className="text-[10px]">Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
