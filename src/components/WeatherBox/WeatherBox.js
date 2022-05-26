import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';

const WeatherBox = (props) => {
  const handleCityChange = useCallback((city) => {
    const cityName = city;
    console.log(cityName);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6d0bccc9ad8a3faed305b98156d2843b&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary />
      <Loader />
    </section>
  );
};

export default WeatherBox;
