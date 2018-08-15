const Controller = (WeatherView, WeatherModel) => {
  function showData(WeatherModelData) {
    const {
      name: city,
      visibility,
      main: { temp, tempF, humidity, pressure },
      weather: [{ description: desc, icon }],
      sys: { sunrise, sunset },
      wind: { speed, deg }
    } = WeatherModelData;
    const WeatherViewModel = {
      city: city,
      temp: Math.floor(temp),
      tempF: Math.floor(tempF),
      desc: desc,
      icon: icon.substr(icon.search(/\.png/) - 3, 3),
      humidity: humidity,
      pressure: pressure,
      visibility: visibility,
      wind: { speed: speed, deg: deg },
      sunrise: sunrise,
      sunset: sunset
    };

    WeatherView.render(WeatherViewModel);
  }
  return {
    getLocation: () => {
      WeatherView.loading();
      if (!navigator.geolocation) {
        WeatherView.errorMsg("Geolocation is not supported by your browser");
        return;
      }

      //Fetch data and display in the UI
      function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        //Fetch
        WeatherModel.fetchData(lat, lon, showData);
      }
      //Display error in the UI
      function error() {
        WeatherView.errorMsg("Unable to retrieve your location");
      }
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
};

export default Controller;
