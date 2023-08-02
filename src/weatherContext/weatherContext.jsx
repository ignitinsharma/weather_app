import React, { createContext, useState, useContext } from "react";

const WeatherContext = createContext();

export const useWeatherContext = () => useContext(WeatherContext);

export const WeatherContextProvider = ({ children }) => {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);

  return (
    <WeatherContext.Provider
      value={{ city, setCity, weatherData, setWeatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
