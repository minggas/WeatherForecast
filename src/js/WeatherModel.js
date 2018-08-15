function WeatherModel() {
  //Fetch the API data
  async function fetchData(lat, lon, fn) {
    const end = `https://fcc-weather-api.glitch.me/api/current?lat=${lat.toFixed(
      2
    )}&lon=${lon.toFixed(2)}`;
    const res = await axios.get(end);
    try {
      res.data.main.tempF = calcFarenheit(res.data.main.temp);
      fn(res.data);
    } catch (error) {
      if (/TypeError:/.test(error)) {
        fetchData(lat, lon, fn);
      }
    }
  }

  //Convert Celcius to Fahrenheit
  function calcFarenheit(temp) {
    return Math.floor(temp * 1.8 + 32);
  }

  return Object.freeze({ fetchData });
}

export default WeatherModel;
