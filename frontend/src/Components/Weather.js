import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WCard = ({ location, current }) => {
    return (
      <div className="weather-card">
        <h2>{location.name}, {location.region}, {location.country}</h2>
        <p>Current Condition: {current.condition.text}</p>
        <img src={`https:${current.condition.icon}`} alt={current.condition.text} />
        <p className='highlight'>Temperature: {current.temp_c}°C / {current.temp_f}°F</p>
        <p>Feels like: {current.feelslike_c}°C / {current.feelslike_f}°F</p>
        <p>Wind: {current.wind_kph} km/h from {current.wind_dir}</p>
        <p>Pressure: {current.pressure_mb} mb</p>
        <p>Humidity: {current.humidity}%</p>
        <p>Visibility: {current.vis_km} km / {current.vis_miles} miles</p>
      </div>
    );
  };

const WeatherCard = ({navState, info, menu, searchItem, setSearchItem }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        setSearchItem('Ahmedabad');
    },[navState])

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `http://api.weatherapi.com/v1/current.json?key=7a09b3186ab04365bf242412241204&q=${searchItem}&aqi=no`
                );
                setWeather(response.data);
                console.log(weather)
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        };
        fetchWeather();

    }, [searchItem,info,menu,navState]);

    return (
        <div className='gen'>
            {weather && <WCard location={weather.location} current={weather.current}/>}
        </div>
    );
};

export default WeatherCard;
