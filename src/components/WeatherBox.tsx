import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  // CardFooter,
} from './ui/card';

export type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

type WeatherBoxProps = {
  weatherData: WeatherData;
};

export default function WeatherBox({ weatherData }: WeatherBoxProps) {
  // console.log(weatherData);
  return (
    <Card className='w-[500px] h-[500px] bg-stone-50'>
      <CardHeader>
        <CardTitle>Weather App</CardTitle>
        <CardDescription>Weather app using React</CardDescription>
      </CardHeader>
      <CardContent className='text-center'>
        <h1 className='font-bold text-5xl'>{weatherData.name}</h1>
        <div className='flex justify-center items-center'>
          <img
            className='w-48'
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].icon}
          />
        </div>
        <h3 className='text-xl mb-4'>{weatherData.weather[0].description}</h3>
        <h2 className='font-bold text-2xl'>
          {weatherData.main.temp.toFixed(0)}°C /{' '}
          {(weatherData.main.temp * 1.8 + 32).toFixed(0)}°F
        </h2>
      </CardContent>
    </Card>
  );
}
