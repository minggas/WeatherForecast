import sun from "./icons/sun.svg";
import moon from "./icons/moon.svg";
import fCloudDay from "./icons/f-cloud-d.svg";
import fCloudNight from "./icons/f-cloud-n.svg";
import sCloud from "./icons/s-cloud.svg";
import bCloud from "./icons/b-cloud.svg";
import sRain from "./icons/s-rain.svg";
import rainDay from "./icons/rain-d.svg";
import rainNight from "./icons/rain-n.svg";
import storm from "./icons/storm.svg";
import snow from "./icons/snow.svg";
import mist from "./icons/mist.svg";
import windArrow from "./icons/arrows.svg";

class WeatherView {
  constructor(element) {
    this.element = element;
    this.toggleBtn = null;
  }
  //Put data on the DOM
  render(dataObj) {
    const {
      city,
      temp,
      tempF,
      desc,
      icon,
      humidity,
      pressure,
      visibility,
      speed,
      deg,
      sunrise,
      sunset
    } = dataObj;
    this.element.classList.remove("card-loading");
    this.element.innerHTML = `<span class="city">${city}</span>
    <div class="temp-wrap">
        <img class="icon" class="responsive-img" src=${iconsPath[icon]}
            alt="Weather icon">
        <span class="temperature celcius">${temp}</span><div class="toggle-temp">
            <span class="left-btn active">C &deg;</span>
            <span class="right-btn">F &deg;</span>
        </div>
    </div>    
    <div class="description">${desc}</div>
    <div class="details">
        <div class="humidity flex-center"><span>Humidity:</span> ${humidity}%</div>
        <div class="pressure flex-center"><span>Pressure:</span> ${pressure}hPa</div>
        <div class="visibility flex-center"><span>Visibility:</span> ${visibility ||
          "N/A"}</div>
        <div class="wind flex-center">
          <span>Wind:</span>
          <div class="flex-center">
            <img src=${windArrow} class="direction" style = "transform: rotate(${deg}deg);" />
            <div class="speed">${speed}m/s</div>
          </div>
        </div>
        <div class="sunrise flex-center"><span>Sunrise:</span> ${parseTime(
          sunrise
        )}</div>
        <div class="sunset flex-center"><span>Sunset:</span> ${parseTime(
          sunset
        )}</div>
    </div>`;
    const btn = this.element.querySelector(".toggle-temp");
    btn.addEventListener("click", this.toggleBtn);
  }

  //Show error messages
  errorMsg(msg) {
    this.element.innerHTML = `<div>${msg}<div/>`;
  }

  loading() {
    this.element.classList.add("card-loading");
    this.element.innerHTML = `<div class="spinner" />`;
  }
}

export default WeatherView;

const iconsPath = {
  "01d": sun,
  "01n": moon,
  "02d": fCloudDay,
  "02n": fCloudNight,
  "03d": sCloud,
  "03n": sCloud,
  "04d": bCloud,
  "04n": bCloud,
  "09d": sRain,
  "09n": sRain,
  "10d": rainDay,
  "10n": rainNight,
  "11d": storm,
  "11n": storm,
  "13d": snow,
  "13n": snow,
  "50d": mist,
  "50n": mist
};

function parseTime(unixTime) {
  return new Date(unixTime * 1000)
    .toString()
    .match(/\d{2}:\d{2}:\d{2}/)
    .join("");
}
