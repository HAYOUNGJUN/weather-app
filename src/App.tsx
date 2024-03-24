import { type ReactNode, useEffect, useState } from 'react';
import WeatherBox, { type WeatherData } from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
import { ClipLoader } from 'react-spinners';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  const [city, setCity] = useState('');

  const cities = ['paris', 'new york', 'tokyo', 'seoul'];
  const API_KEY = import.meta.env.VITE_API_KEY;

  // function getCurrentLocation() {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const { latitude, longitude } = position.coords;

  //     getWeatherByCurrentLocation(latitude, longitude);
  //   });
  // }

  const getCurrentLocation = new Promise<{
    latitude: number;
    longitude: number;
  }>((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      resolve({ latitude, longitude });
    });
  });

  async function getWeatherByCurrentLocation() {
    try {
      setIsFetching(true);

      const { latitude, longitude } = await getCurrentLocation;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
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

  async function getWeatherByCity() {
    try {
      setIsFetching(true);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
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
    if (city) {
      getWeatherByCity();
    } else {
      getWeatherByCurrentLocation();
    }
  }, [city]);

  let content: ReactNode;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isFetching) {
    content = <ClipLoader color='red' loading={isFetching} size={150} />;
  }

  if (weatherData) {
    content = <WeatherBox weatherData={weatherData} />;
  }

  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      {content}
      <WeatherButton cities={cities} setCity={setCity} />
    </div>
  );
}

export default App;
