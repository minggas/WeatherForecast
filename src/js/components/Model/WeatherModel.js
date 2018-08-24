class WeatherModel {
  //Fetch the API data
  async fetchData(lat, lon) {
    const end = `https://minggas-api.glitch.me/weather?lat=${lat.toFixed(
      2
    )}&lon=${lon.toFixed(2)}`;
    //console.log(end);
    const local = "./weather.json";
    try {
      const res = await axios.get(end);
      let {
        name: city,
        visibility,
        main: { temp, humidity, pressure },
        weather: [{ description: desc, icon }],
        sys: { sunrise, sunset },
        wind: { speed, deg }
      } = res.data;
      temp = Math.round(temp);
      icon = icon.substr(icon.search(/\.png/) - 3, 3);
      console.log(res.data);
      return {
        city,
        visibility,
        temp,
        humidity,
        pressure,
        desc,
        icon,
        sunrise,
        sunset,
        speed,
        deg
      };
    } catch (error) {
      console.log(error);
    }
  }
}

export default WeatherModel;
