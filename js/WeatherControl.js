const data = {
  city: "",
  temp: {
    type: "cel",
    min: 0,
    max: 0,
    actual: 0
  },
  wind: {
    speed: 0,
    deg: 0
  },
  humidity: 0,
  pressure: 0,
  sunrise: 0,
  sunset: 0,
  visibility: 0,
  desc: "",
  icon: ""
};

class WeatherController {
  //Fetch the API data
  async fetchData(lat, lon) {
    const end = `https://fcc-weather-api.glitch.me/api/current?lat=${lat.toFixed(
      2
    )}&lon=${lon.toFixed(2)}`;
    const res = await axios.get(end);
    try {
      this.setData(res.data);
      console.log(res.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  //Return the record data
  getData() {
    return data;
  }
  //Toggle between the two temperatures
  toggleTemp() {
    if (data.temp.type === "cel") {
      data.temp.actual = this.calcFarenheit(data.temp.actual);
      data.temp.max = this.calcFarenheit(data.temp.max);
      data.temp.min = this.calcFarenheit(data.temp.min);
      data.temp.type = "fah";
    } else if (data.temp.type === "fah") {
      data.temp.actual = this.calcCelcius(data.temp.actual);
      data.temp.max = this.calcCelcius(data.temp.max);
      data.temp.min = this.calcCelcius(data.temp.min);
      data.temp.type = "cel";
    }
  }
  //Put the API fetched data in the object data
  setData(json) {
    const {
      name: city,
      visibility,
      main: { temp: actual, temp_min: min, temp_max: max, humidity, pressure },
      weather: [{ description: desc, icon }],
      sys: { sunrise, sunset },
      wind: { speed, deg }
    } = json;
    data.city = city;
    data.temp.actual = Math.floor(actual);
    data.temp.min = Math.floor(min);
    data.temp.max = Math.floor(max);
    data.desc = desc;
    data.icon = icon.substr(icon.search(/\.png/) - 3, 3);
    data.humidity = humidity;
    data.pressure = pressure;
    data.visibility = visibility;
    data.wind.speed = speed;
    data.wind.deg = deg;
    data.sunrise = sunrise;
    data.sunset = sunset;
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
