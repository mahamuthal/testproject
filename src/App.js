import React, { useState } from "react";
import axios from "axios";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [aqi, setAqi] = useState("no");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "421aba7ce8774bbbaba103144250408";

  const getWeather = async () => {
    if (!city || !country) {
      setError("Please enter both city and country.");
      return;
    }
    setError("");
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city},${country}&aqi=${aqi}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Unable to fetch weather data. Please check inputs.");
    }
  };

  return (
    <div>
      <center>
      <h2>Weather Fetcher</h2>
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="AQI (yes or no)"
        value={aqi}
        onChange={(e) => setAqi(e.target.value)}
      />
      <br />
      <button onClick={getWeather}>Get Weather</button>
      </center>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h3>
            Weather in {weather.location.name}, {weather.location.country}
          </h3>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather Icon" />
        </div>
        
      )}
    </div>
  );
}

