import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = (props) => {
  const [cityWeather, setCityWeather] = useState('');

  const handleCityChange = useCallback((city) => {
    const cityName = city;

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6d0bccc9ad8a3faed305b98156d2843b&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        };

        setCityWeather(weatherData);

        console.log(weatherData);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary {...cityWeather} />
      <Loader />
    </section>
  );
};

export default WeatherBox;
