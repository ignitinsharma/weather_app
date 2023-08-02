import React from "react";
import { Route, Routes } from "react-router-dom";
import WeatherData from "../Pages/weatherData";
import WeatherInput from "../Pages/weatherInput";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WeatherInput />} />
      <Route path="/weather" element={<WeatherData />} />
    </Routes>
  );
};

export default AllRoutes;
