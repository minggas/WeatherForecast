class WeatherModel {
  //Fetch the API data
  async fetchData(lat, lon) {
    const end = `https://minggas-api.glitch.me/weather?lat=${lat.toFixed(
      2
    )}&lon=${lon.toFixed(2)}`;
    try {
      const res = await fetch(end);
      const data = await res.json();

      let {
        name: city,
        visibility,
        main: { temp, humidity, pressure },
        weather: [{ description: desc, icon }],
        sys: { sunrise, sunset },
        wind: { speed, deg }
      } = data;
      temp = Math.round(temp);
      icon = icon.substr(icon.search(/\.png/) - 3, 3);

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
