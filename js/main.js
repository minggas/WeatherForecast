/* geolocation is available */
/* Put the DOM Elements in variables */

const tempMap = {
  main: 0,
  min: 0,
  max: 0
}
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const min = document.getElementById('min');
const max = document.getElementById('max');
const description = document.getElementById('description');
const icon = document.getElementById('icon');
//const pressure = document.getElementById('pressure');
//const humidity = document.getElementById('humidity');
//const wSpeed = document.getElementById('test4');
temperature.addEventListener('click', toggleTemp);

//Get Latitude and Longitude
if ("geolocation" in navigator) {
    /* Get location */
    const geo = navigator.geolocation.getCurrentPosition(function (position) {
        let lat = parseFloat(position.coords.latitude);
        let lon = parseFloat(position.coords.longitude);
        let end = `https://fcc-weather-api.glitch.me/api/current?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`;
        //call FCC Weather API
        getData(end);
    });
} else {
    /* geolocation IS NOT available */
    document.getElementById('card-content').innerHTML = '<h1>Geolocation unavailable</h1>;';
}

async function getData(end){
    const response = await fetch(end, {cache: "no-store"});
    if(response.status === 200 ){
      const json = await response.json();
      if(json.weather[0].icon){
        renderData(json);
      }else{
        getData(end);
      }
    }else{
      alert("Sorry for the incovenient the API return: " + response.status);
    }
  }

function renderData(data){
    //Put the temperatures variables in the tempMap
        tempMap.main = data.main.temp.toFixed(1);
        tempMap.min = data.main.temp_min.toFixed(1);
        tempMap.max = data.main.temp_max.toFixed(1);
        // Inserting the data in the DOM 
        city.innerHTML = data.name;
        temperature.innerHTML = `${tempMap.main}&deg; C`;
        min.innerHTML = `MIN: ${tempMap.min}&deg`;
        max.innerHTML = `MAX: ${tempMap.max}&deg`;
        description.innerHTML = data.weather[0].description;
        icon.src = data.weather[0].icon;

        //pressure.innerHTML = data.main.pressure + 'hPa';
        //humidity.innerHTML = data.main.humidity + '%';
        //wSpeed.innerHTML = data.wind.speed + 'm/s';
    }
/* Function to convert celsius <-> farenheit */
function toggleTemp(e) {
    if (e.target.innerHTML.indexOf('C') !== -1) {
        let tempF = (tempMap.main * 1.8 + 32).toFixed(1);
        let tempMin = (tempMap.min * 1.8 + 32).toFixed(1);
        let tempMax = (tempMap.max * 1.8 + 32).toFixed(1);
        temperature.innerHTML = `${tempF}&deg; F`;
        min.innerHTML = `MIN: ${tempMin}&deg`;
        max.innerHTML = `MAX: ${tempMin}&deg`;
    } else {
        temperature.innerHTML = `${tempMap.main}&deg; C`;
        min.innerHTML = `MIN: ${tempMap.min}&deg`;
        max.innerHTML = `MAX: ${tempMap.max}&deg`;
    }
}
