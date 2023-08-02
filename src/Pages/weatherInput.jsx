import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useWeatherContext } from "../weatherContext/weatherContext";

const WeatherInput = () => {
  const navigate = useNavigate();
  const { setCity } = useWeatherContext();
  const [cityInput, setCityInput] = useState("");

  const handleInputChange = (event) => {
    setCityInput(event.target.value);
  };

  const handleSearch = () => {
    setCity(cityInput);
    navigate("/weather");
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const API_KEY = "5e4264872e29e642a21ad3acae2b4e10";
          const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
          const { latitude, longitude } = position.coords;
          axios
            .get(
              `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            )
            .then((response) => {
              setCity(response.data.name);
              navigate("/weather");
            })
            .catch((error) => {
              console.error("Error fetching city data.", error);
            });
        },
        (error) => {
          console.error("Error getting current location.", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-screen w-full bg-[#43AEFC] flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg flex flex-col w-[30%] ">
        <h1 className="text-[1.4rem] font-bold text-[#43AEFC]">Weather App</h1>
        <input
          type="text"
          value={cityInput}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder="Enter city name"
          className="p-[0.8rem] my-2"
        />
        <button
          className="p-[0.6rem] font-semibold text-white rounded bg-[#43AEFC] my-[12px]"
          onClick={handleSearch}
        >
          Search
        </button>
        <div class="flex items-center">
          <hr class="flex-1 border-1 border-black" />
          <p class="mx-4">or</p>
          <hr class="flex-1 border-1 border-black" />
        </div>
        <button
          className="p-[0.6rem] font-semibold text-white rounded bg-[#43AEFC] mt-[12px]"
          onClick={handleGetCurrentLocation}
        >
          Get Current Location
        </button>
      </div>
    </div>
  );
};

export default WeatherInput;
