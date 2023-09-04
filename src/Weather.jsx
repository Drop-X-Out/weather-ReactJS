import React, { useState, useEffect } from "react";
import './Weather.css'
import moment from 'moment';

const api = {
  key: "6758040c9fe32b53131848ec23f87a32",
  base: "https://api.openweathermap.org/data/2.5/"
};

function Weather(){
  const [query, setQuery] = useState(''); // to make URL for weather API
  const [weather, setWeather] = useState({});// for Detail
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          return result;
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          // Handle the error appropriately, e.g., show an error message to the user
        });
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
  }
  export default Weather;