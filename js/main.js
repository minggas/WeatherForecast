/* geolocation is available */
/* Put the DOM Elements in variables */

const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const min = document.getElementById('min');
const max = document.getElementById('max');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const description = document.getElementById('description');
const icon = document.getElementById('icon');
const wSpeed = document.getElementById('test4');

if ("geolocation" in navigator) {
    /* Get location */
    const geo = navigator.geolocation.getCurrentPosition(function (position) {
        let lat = parseFloat(position.coords.latitude);
        let lon = parseFloat(position.coords.longitude);
        let end = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
        getData(end);
    });
} else {
    /* geolocation IS NOT available */
    document.getElementById('card-content').innerHTML = '<h1>Geolocation unavailable</h1>;';
}
async function getData(end){
    const response = await fetch(end);
    const json = await response.json();
    putData(json);        
    }
function putData(data){
        let temp = data.main.temp;
        /* Inserting the data in the DOM */
        city.innerHTML = data.name;
        temperature.innerHTML = temp + '&deg; <span class="blue-text text-lighten-2">C</span>';
        min.innerHTML = 'MIN:' + data.main.temp_min + '&deg';
        max.innerHTML = 'MAX:' + data.main.temp_max + '&deg';
        pressure.innerHTML = data.main.pressure + 'hPa';
        humidity.innerHTML = data.main.humidity + '%';
        description.innerHTML = data.weather[0].description;
        icon.src = data.weather[0].icon;
        wSpeed.innerHTML = data.wind.speed + 'm/s';
        /* Add a listener for toggle between celsius and farenheith */
        temperature.addEventListener('click', toggleTemp);
    }
/* Function to convert celsius <-> farenheit */
function toggleTemp(e) {
    if (e.target.innerHTML === 'C') {

        let tempF = temp * 1.8 + 32;
        let tempMin = data.main.temp_min * 1.8 + 32;
        let tempMax = data.main.temp_max * 1.8 + 32;
        temperature.innerHTML = tempF.toFixed(1) + '&deg; <span class="blue-text text-lighten-2">F</span>';
        min.innerHTML = 'MIN:' + tempMin.toFixed(1) + '&deg';
        max.innerHTML = 'MAX:' + tempMax.toFixed(1) + '&deg';
    } else {
        temperature.innerHTML = temp.toFixed(1) + '&deg; <span class="blue-text text-lighten-2">C</span>';
        min.innerHTML = 'MIN:' + data.main.temp_min + '&deg';
        max.innerHTML = 'MAX:' + data.main.temp_max + '&deg';
    }
}