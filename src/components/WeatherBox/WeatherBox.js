import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = (props) => {
  const [cityWeather, setCityWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [detectedError, setDetectedError] = useState(false);

  const handleCityChange = useCallback((city) => {
    const cityName = city;
    setPending(true);
    setDetectedError(false);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6d0bccc9ad8a3faed305b98156d2843b&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };

          setPending(false);
          setCityWeather(weatherData);
        });
      } else {
        setDetectedError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {cityWeather && !pending && <WeatherSummary {...cityWeather} />}
      {pending && !detectedError && <Loader />}
      {detectedError && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
