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
  "01d": "../assets/icons/sun.svg",
  "01n": "../assets/icons/moon.svg",
  "02d": "../assets/icons/f-cloud-d.svg",
  "02n": "../assets/icons/f-cloud-n.svg",
  "03d": "../assets/icons/s-cloud.svg",
  "03n": "../assets/icons/s-cloud.svg",
  "04d": "../assets/icons/b-cloud.svg",
  "04n": "../assets/icons/b-cloud.svg",
  "09d": "../assets/icons/s-rain.svg",
  "09n": "../assets/icons/s-rain.svg",
  "10d": "../assets/icons/rain-d.svg",
  "10n": "../assets/icons/rain-n.svg",
  "11d": "../assets/icons/storm.svg",
  "11n": "../assets/icons/storm.svg",
  "13d": "../assets/icons/snow.svg",
  "13n": "../assets/icons/snow.svg",
  "50d": "../assets/icons/mist.svg",
  "50n": "../assets/icons/mist.svg"
};

class UIController {
  //Put data on the DOM
  showData(dataObj) {
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
    document.querySelector(DOMstr.city).innerHTML = city;
    document.querySelector(DOMstr.temperature).innerHTML = `${actual}`;
    document.querySelector(DOMstr.min).innerHTML = `MIN: ${min} ${type}&deg;`;
    document.querySelector(DOMstr.max).innerHTML = `MAX: ${max} ${type}&deg;`;
    document.querySelector(DOMstr.description).innerHTML = desc;
    document.querySelector(DOMstr.icon).src = iconsPath[icon];
    document.querySelector(
      DOMstr.humidity
    ).innerHTML = `Humidity: ${humidity}%`;
    document.querySelector(
      DOMstr.pressure
    ).innerHTML = `Pressure: ${pressure}hPa`;
    document.querySelector(
      DOMstr.visibility
    ).innerHTML = `Visibility: ${visibility}m`;
    document
      .querySelector(DOMstr.direction)
      .setAttribute("style", `transform: rotate(${deg}deg); width: 10%;`);
    document.querySelector(DOMstr.speed).innerHTML = `${speed}m/s`;
    document.querySelector(DOMstr.sunrise).innerHTML = `Sunrise: ${new Date(
      sunrise * 1000
    )
      .toString()
      .match(/\d{2}:\d{2}:\d{2}/)
      .join("")}`;
    document.querySelector(DOMstr.sunset).innerHTML = `Sunset: ${new Date(
      sunset * 1000
    )
      .toString()
      .match(/\d{2}:\d{2}:\d{2}/)
      .join("")}`;
  }

  //Show error messages
  errorMsg(msg) {
    document.querySelector(DOMstr.city).innerHTML = msg;
  }

  getDOMStr() {
    return DOMstr;
  }

  toggleBtn(el) {
    el.firstElementChild.classList.toggle("active");
    el.lastElementChild.classList.toggle("active");
  }
}

export default UIController;
