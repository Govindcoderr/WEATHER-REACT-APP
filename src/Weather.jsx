import React, { useState } from "react";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const API_KEY = "1ed9dfe179ec368035a59fe7559a35cb";

    const fetchWeather = async () => {
        if (!city) return;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="weather-app">
            <h2>Weather App</h2>
            <input
                type="text"
                placeholder="Enter City Name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {weather && (
                <div>
                    <h3>
                        {weather.name}, {weather.sys.country}
                    </h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
