import React, { useState } from 'react';
import './WeatherApp.css';

export default function WeatherApp() {
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const [cityInput, setCityInput] = useState('');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<{
    tempC?: number;
    description?: string;
    humidity?: number;
    wind?: number;
    sunrise?: number;
    sunset?: number;
    icon?: string;
    timezone?: number;
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState(false); // default to Fahrenheit

  const convertToF = (celsius: number) => (celsius * 9) / 5 + 32;

  async function fetchWeather(cityToFetch: string) {
    if (!apiKey) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityToFetch
        )}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather({
        tempC: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        icon: data.weather[0].icon,
        timezone: data.timezone,
      });
      setCity(cityToFetch);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather');
      setWeather({});
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    if (cityInput.trim()) {
      fetchWeather(cityInput.trim());
    }
  }

  function toggleUnit() {
    setIsCelsius(prev => !prev);
  }

  function formatTime(unix: number, offset: number) {
    const localTime = new Date((unix + offset) * 1000);
    const hours = localTime.getUTCHours();
    const minutes = localTime.getUTCMinutes();
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = ((hours + 11) % 12) + 1;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const utcOffset = `UTC${offset >= 0 ? '+' : ''}${offset / 3600}`;
    return `${formattedHour}:${formattedMinutes} ${suffix} (${utcOffset})`;
  }

  if (!apiKey) {
    return <p>Please set your OpenWeatherMap API key in the .env file.</p>;
  }

  const hasWeather = weather.tempC !== undefined;

  const displayTemp = hasWeather
    ? isCelsius
      ? weather.tempC!.toFixed(1)
      : convertToF(weather.tempC!).toFixed(1)
    : null;

  return (
    <div className="weather-app-container">
      <h2>Weather App</h2>

      <div className="controls">
        <input
          type="text"
          value={cityInput}
          onChange={e => setCityInput(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
        {hasWeather && (
          <button onClick={toggleUnit}>
            Show °{isCelsius ? 'F' : 'C'}
          </button>
        )}
      </div>

      <footer className="weather-footer">
        Powered by{' '}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0077cc', textDecoration: 'none'}}
        >
          OpenWeather
        </a>
      </footer>


      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && hasWeather && (
        <div className="weather-card">
          <h3>{city}</h3>
          <p className="temperature">
            {displayTemp}°{isCelsius ? 'C' : 'F'}
          </p>
          <p className="description">{weather.description}</p>

          {weather.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather icon"
              className="weather-icon"
            />
          )}

          <div className="weather-details">
            <p>💧 Humidity: {weather.humidity}%</p>
            <p>
              🌬️ Wind:{' '}
              {isCelsius
                ? weather.wind
                : (weather.wind! * 2.23694).toFixed(1)}{' '}
              {isCelsius ? 'm/s' : 'mph'}
            </p>
            <p>🌅 Sunrise: {formatTime(weather.sunrise!, weather.timezone!)}</p>
            <p>🌇 Sunset: {formatTime(weather.sunset!, weather.timezone!)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
