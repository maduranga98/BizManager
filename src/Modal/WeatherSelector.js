import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import OpacityIcon from "@mui/icons-material/Opacity";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

const WeatherSelector = ({ onWeatherChange }) => {
  const [weather, setWeather] = useState("");

  const handleChange = (event) => {
    const selectedWeather = event.target.value;
    setWeather(selectedWeather);
    onWeatherChange(selectedWeather);
  };

  // Weather options with associated icons
  const weatherOptions = [
    { label: "Rain", icon: <OpacityIcon />, value: "Rain" },
    { label: "Sunny", icon: <WbSunnyIcon />, value: "Sunny" },
    { label: "Drizzle", icon: <CloudIcon />, value: "Drizzle" },
    { label: "Warm", icon: <Brightness5Icon />, value: "Warm" },
    { label: "Hot", icon: <ThunderstormIcon />, value: "Hot" },
    { label: "Cold", icon: <AcUnitIcon />, value: "Cold" },
  ];
  return (
    <div className="w-52 m-5">
      <Box sx={{ minWidth: 20 }}>
        <FormControl fullWidth>
          <InputLabel id="weather-select-label">Weather</InputLabel>
          <Select
            labelId="weather-select-label"
            id="weather-select"
            value={weather}
            label="Weather"
            onChange={handleChange}
          >
            {weatherOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <div className="flex items-center">
                  {option.icon} {/* Display the icon */}
                  <span className="ml-2">{option.label}</span>{" "}
                  {/* Label with spacing */}
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default WeatherSelector;
