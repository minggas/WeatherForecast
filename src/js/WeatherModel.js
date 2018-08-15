function WeatherModel() {
  //Convert Celcius to Fahrenheit
  function calcFarenheit(temp) {
    return Math.floor(temp * 1.8 + 32);
  }

  return {
    //Fetch the API data
    fetchData: async (lat, lon, fn) => {
      const end = `https://fcc-weather-api.glitch.me/api/current?lon=${lon.toFixed(
        1
      )}&lat=${lat.toFixed(1)}`;
      const res = await axios.get(end);
      try {
        res.data.main.tempF = calcFarenheit(res.data.main.temp);
        fn(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
}

export default WeatherModel;
