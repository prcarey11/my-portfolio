import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  if (!apiKey) {
    return <p>Please set your OpenWeatherMap API key in the .env file.</p>;
  }  

  const [weather, setWeather] = useState<{ temp?: number; description?: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}'
        );
        const data = await response.json();
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather...</p>;

  return (
    <div>
      <h2>Weather in London</h2>
      <p>Temperature: {weather.temp}°C</p>
      <p>Conditions: {weather.description}</p>
    </div>
  );
}
