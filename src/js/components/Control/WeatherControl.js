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

//Convert Celcius to Fahrenheit
function calcFarenheit(temp) {
  return Math.round(temp * 1.8 + 32);
}

function calcCelcius(temp) {
  return Math.round((temp - 32) * 0.5556);
}
