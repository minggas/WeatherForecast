const convert = require("../../helpers/tempConverter");

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
      temp.innerHTML = convert.calcFarenheit(temp.innerHTML);
    } else {
      temp.innerHTML = convert.calcCelcius(temp.innerHTML);
    }
    temp.classList.toggle("celcius");
  }

  init() {
    this.WeatherView.loading();
    getLocation()
      .then(res => {
        const { latitude: lat, longitude: lon } = res.coords;
        this.WeatherModel.fetchData(lat, lon).then(res =>
          this.WeatherView.render(res)
        );
      })
      .catch(err => this.WeatherView.errorMsg(err));
    this.WeatherView.toggleBtn = this.toggleBtn;
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
