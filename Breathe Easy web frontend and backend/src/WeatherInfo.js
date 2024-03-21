import React, { useState, useEffect } from 'react';

const WeatherInfo = ({ setApiOutput }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {

    const apiKey = '9763e547782743b8ab6c86269af51953';

    const aucklandCoords = {
      lat: -36.8485,
      lon: 174.7583,
    };
    const apiUrl = `https://api.weatherbit.io/v2.0/current?lat=${aucklandCoords.lat}&lon=${aucklandCoords.lon}&key=${apiKey}&include=minutely`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Weather API Response:', data);
        const newWeatherData = {
          wDIR: data.data[0].wind_dir,
          WSpd: data.data[0].wind_spd,
          Rainfall: data.data[0].precip,
          RH: data.data[0].rh,
        };
        setWeatherData(newWeatherData);
        setApiOutput({ weather: newWeatherData });
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, [setApiOutput]);

  return null;
};

export default WeatherInfo;
