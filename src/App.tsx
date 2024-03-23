import { useEffect, useState } from 'react';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    });
  }

  async function getWeatherByCurrentLocation(lat: number, lon: number) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    setWeatherData(data);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      <WeatherBox weatherData={weatherData} />
      <WeatherButton />
    </div>
  );
}

export default App;
