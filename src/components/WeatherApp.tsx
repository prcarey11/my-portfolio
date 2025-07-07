import React, { useState } from 'react';

export default function WeatherApp() {
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const [cityInput, setCityInput] = useState('London');
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState<{
    tempC?: number;
    description?: string;
    humidity?: number;
    wind?: number;
    sunrise?: number;
    sunset?: number;
    icon?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState(false); // Start in Fahrenheit

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
    fetchWeather(cityInput);
  }

  function toggleUnit() {
    setIsCelsius(prev => !prev);
  }

  function formatTime(unix: number) {
    return new Date(unix * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
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
    <div>
      <h2>Weather App</h2>

      <input
        type="text"
        value={cityInput}
        onChange={e => setCityInput(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: '0.5rem', fontSize: '1rem', marginRight: '0.5rem' }}
      />

      <button
        onClick={handleSearch}
        style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginRight: hasWeather ? '1rem' : 0 }}
      >
        Search
      </button>

      {hasWeather && (
        <button
          onClick={toggleUnit}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
        >
          Show °{isCelsius ? 'F' : 'C'}
        </button>
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && hasWeather && (
        <div>
          <p>
            Temperature in <strong>{city}</strong>: {displayTemp}°{isCelsius ? 'C' : 'F'}
          </p>
          <p>Conditions: {weather.description}</p>

          {weather.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather icon"
              style={{ verticalAlign: 'middle' }}
            />
          )}

          <p>💧 Humidity: {weather.humidity}%</p>
          <p>🌬️ Wind: {weather.wind} {isCelsius ? 'm/s' : 'mph'}</p>
          <p>🌅 Sunrise: {formatTime(weather.sunrise!)}</p>
          <p>🌇 Sunset: {formatTime(weather.sunset!)}</p>
        </div>
      )}
    </div>
  );
}
