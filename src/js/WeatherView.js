const WeatherView = element => {
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

  function toggleBtn(el) {
    el.currentTarget.firstElementChild.classList.toggle("active");
    el.currentTarget.lastElementChild.classList.toggle("active");
    element.querySelectorAll(".temperature").forEach(element => {
      element.classList.toggle("active");
    });
  }

  function parseTime(unixTime) {
    return new Date(unixTime * 1000)
      .toString()
      .match(/\d{2}:\d{2}:\d{2}/)
      .join("");
  }

  return {
    //Put data on the DOM
    render: dataObj => {
      let {
        city,
        temp,
        tempF,
        desc,
        icon,
        humidity,
        pressure,
        visibility,
        wind: { speed, deg },
        sunrise,
        sunset
      } = dataObj;
      element.classList.remove("card-loading");
      element.innerHTML = `<span class="city">${city}</span>
      <div class="temp-wrap">
          <img class="icon" class="responsive-img" src=${iconsPath[icon]}
              alt="Weather icon">
          <span class="temperature active">${temp}</span>
          <span class="temperature">${tempF}</span>
          <div class="toggle-temp">
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
              <img src="assets/icons/arrows.svg" class="direction" style = "transform: rotate(${deg}deg);" />
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
      const btn = element.querySelector(".toggle-temp");
      btn.addEventListener("click", toggleBtn);
    },

    //Show error messages
    errorMsg: msg => {
      element.innerHTML = `<div>${msg}<div/>`;
    },

    loading: () => {
      element.classList.add("card-loading");
      element.innerHTML = `<div class="spinner" />`;
    }
  };
};

export default WeatherView;
