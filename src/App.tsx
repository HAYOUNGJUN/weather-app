import { type ReactNode, useEffect, useState } from 'react';
import WeatherBox, { type WeatherData } from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
// import { get } from './util/http';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  const API_KEY = import.meta.env.VITE_API_KEY;

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    });
  }

  async function getWeatherByCurrentLocation(lat: number, lon: number) {
    try {
      setIsFetching(true);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);

      setIsFetching(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  let content: ReactNode;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isFetching) {
    content = <p>Fetching data...</p>;
  }

  if (weatherData) {
    content = <WeatherBox weatherData={weatherData} />;
  }

  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      {content}
      <WeatherButton />
    </div>
  );
}

export default App;
