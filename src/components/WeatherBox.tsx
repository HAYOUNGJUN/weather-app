export default function WeatherBox({ weatherData }) {
  console.log(weatherData);
  return (
    <div className='border-4 p-14 rounded-2xl bg-cyan-50'>
      <div>{weatherData?.name}</div>
      <h2>
        {weatherData?.main.temp.toFixed(1)} /{' '}
        {(weatherData?.main.temp * 1.8 + 32).toFixed(1)}
      </h2>
      <h3>{weatherData?.weather[0].description}</h3>
    </div>
  );
}
