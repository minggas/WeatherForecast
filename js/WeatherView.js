const DOMstr = {
  city: ".city",
  temperature: ".temperature",
  min: ".min-btn",
  max: ".max-btn",
  description: ".description",
  icon: ".icon",
  toggleTemp: ".toggle-temp",
  humidity: ".humidity",
  pressure: ".pressure",
  speed: ".speed",
  direction: ".direction",
  sunrise: ".sunrise",
  sunset: ".sunset",
  visibility: ".visibility"
};

const iconsPath = {
  "01d": "assets/icons/sun.svg",
  "01n": "assets/icons/moon.svg",
  "02d": "assets/icons/f-cloud-d.svg",
  "02n": "assets/icons/f-cloud-n.svg",
  "03d": "assets/icons/s-cloud.svg",
  "03n": "assets/icons/s-cloud.svg",
  "04d": "assets/icons/b-cloud.svg",
  "04n": "assets/icons/b-cloud.svg",
  "09d": "assets/icons/s-rain.svg",
  "09n": "assets/icons/s-rain.svg",
  "10d": "assets/icons/rain-d.svg",
  "10n": "assets/icons/rain-n.svg",
  "11d": "assets/icons/storm.svg",
  "11n": "assets/icons/storm.svg",
  "13d": "assets/icons/snow.svg",
  "13n": "assets/icons/snow.svg",
  "50d": "assets/icons/mist.svg",
  "50n": "assets/icons/mist.svg"
};

class UIController {
  constructor(element) {
    this.element = element;
  }
  //Put data on the DOM
  render(dataObj) {
    let {
      city,
      temp: { actual, min, max, type },
      desc,
      icon,
      humidity,
      pressure,
      visibility,
      wind: { speed, deg },
      sunrise,
      sunset
    } = dataObj;
    type = type === "cel" ? "C" : "F";

    this.element.innerHTML = `<span class="city">${city}</span>
    <div class="temp-wrap">
        <img class="icon" class="responsive-img" src=${iconsPath[icon]}
            alt="Weather icon">
        <span class="temperature">${actual}</span>
        <div class="toggle-temp">
            <span class="left-btn active">C &deg;</span>
            <span class="right-btn">F &deg;</span>
        </div>
    </div>
    <div class="minmax-row flex-center">
        <span class="btn min-btn">MIN: ${min} ${type}&deg;</span>
        <span class="btn max-btn">MAX: ${max} ${type}&deg;</span>
    </div>
    <div class="description">${desc}</div>
    <div class="details">
        <div class="humidity">Humidity: ${humidity}%</div>
        <div class="pressure">Pressure: ${pressure}hPa</div>
        <div class="visibility">Visibility: ${visibility || "N/A"}</div>
        <div class="wind">
            <span>Wind: </span>
            <img src="assets/icons/arrows.svg" class="direction" style = "transform: rotate(${deg}deg); width: 10%;" />
            <div class="speed">${speed}m/s</div>
        </div>
        <div class="sunrise">Sunrise: ${this.parseTime(sunrise)}</div>
        <div class="sunset">Sunset: ${this.parseTime(sunset)}</div>
    </div>`;
  }

  //Show error messages
  errorMsg(msg) {
    document.querySelector(DOMstr.city).innerHTML = msg;
  }

  loading() {
    this.element.innerHTML = `<div class="spinner" />`;
  }

  toggleBtn(el) {
    el.firstElementChild.classList.toggle("active");
    el.lastElementChild.classList.toggle("active");
  }

  parseTime(unixTime) {
    return new Date(unixTime * 1000)
      .toString()
      .match(/\d{2}:\d{2}:\d{2}/)
      .join("");
  }
}

export default UIController;
