class Controller {
  constructor(WeatherView, WeatherModel) {
    this.WeatherView = WeatherView;
    this.WeatherModel = WeatherModel;
  }
  toggleTemp(e) {
    //TODO
  }
  getLocation() {
    const self = this;
    this.WeatherView.loading();
    if (!navigator.geolocation) {
      self.WeatherView.errorMsg("Geolocation is not supported by your browser");
      return;
    }

    //Fetch data and display in the UI
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      //Fetch
      self.WeatherModel.fetchData(lat, lon, self.showData.bind(self));
    }
    //Display error in the UI
    function error() {
      self.WeatherView.errorMsg("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }
  showData(WeatherModelData) {
    const {
      name: city,
      visibility,
      main: { temp: actual, temp_min: min, temp_max: max, humidity, pressure },
      weather: [{ description: desc, icon }],
      sys: { sunrise, sunset },
      wind: { speed, deg }
    } = WeatherModelData;
    const WeatherViewModel = {
      city: city,
      temp: {
        actual: Math.floor(actual),
        min: Math.floor(min),
        max: Math.floor(max)
      },
      desc: desc,
      icon: icon.substr(icon.search(/\.png/) - 3, 3),
      humidity: humidity,
      pressure: pressure,
      visibility: visibility,
      wind: { speed: speed, deg: deg },
      sunrise: sunrise,
      sunset: sunset
    };

    this.WeatherView.render(WeatherViewModel);
  }
}

export default Controller;
