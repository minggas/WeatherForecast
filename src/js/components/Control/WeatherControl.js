class Controller {
  constructor(WeatherView, WeatherModel) {
    this.WeatherView = WeatherView;
    this.WeatherModel = WeatherModel;
  }

  toggleBtn(el) {
    const temp = el.currentTarget.previousSibling;
    el.currentTarget.firstElementChild.classList.toggle("active");
    el.currentTarget.lastElementChild.classList.toggle("active");
    if (temp.classList.contains("celcius")) {
      temp.innerHTML = calcFarenheit(temp.innerHTML);
    } else {
      temp.innerHTML = calcCelcius(temp.innerHTML);
    }
    temp.classList.toggle("celcius");
  }

  init() {
    const self = this;
    self.WeatherView.loading();
    getLocation()
      .then(res => {
        const { latitude: lat, longitude: lon } = res.coords;
        self.WeatherModel.fetchData(lat, lon).then(res =>
          self.WeatherView.render(res)
        );
      })
      .catch(err => self.WeatherView.errorMsg(err));
    self.WeatherView.toggleBtn = self.toggleBtn;
  }
}

export default Controller;

function getLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

//Convert Celcius to Fahrenheit
function calcFarenheit(temp) {
  return Math.round(temp * 1.8 + 32);
}

function calcCelcius(temp) {
  return Math.round((temp - 32) * 0.5556);
}
