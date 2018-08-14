class WeatherController {
  //Fetch the API data
  async fetchData(lat, lon, fn) {
    const end = `https://fcc-weather-api.glitch.me/api/current?lat=${lat.toFixed(
      2
    )}&lon=${lon.toFixed(2)}`;
    const res = await axios.get(end);
    try {
      fn(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  //Convert Celcius to Fahrenheit
  calcFarenheit(temp) {
    return Math.floor(temp * 1.8 + 32);
  }

  //Convert Fahrenheit to Celcius
  calcCelcius(temp) {
    return Math.floor(((temp - 32) * 5) / 9);
  }
}

export default WeatherController;
