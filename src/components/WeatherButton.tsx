import { Button } from '@/components/ui/button';

type WeatherButtonProps = {
  cities: string[];
  setCity: (city: string) => void;
};

export default function WeatherButton({ cities, setCity }: WeatherButtonProps) {
  return (
    <div className='my-2'>
      <Button variant='secondary' className='mx-1' onClick={() => setCity('')}>
        Current Location
      </Button>
      {cities.map((city, key) => (
        <Button
          variant='secondary'
          key={key}
          className='mx-1'
          onClick={() => setCity(city)}
        >
          {city.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
