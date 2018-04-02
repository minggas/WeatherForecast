/* jshint browser: true */
(function () {
    'use strict';
    const tempMap = {
        main: 0,
        min: 0,
        max: 0
    };
    const city = document.getElementById('city');
    const temperature = document.getElementById('temperature');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const description = document.getElementById('description');
    const icon = document.getElementById('icon');    
    temperature.addEventListener('click', toggleTemp);
    
    //Get Latitude and Longitude with GeoLocation
    (function () {
        if (!navigator.geolocation) {
            city.innerHTML = "<p>Geolocation is not supported by your browser</p>";

            return;
        }
        function success(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const end = `https://fcc-weather-api.glitch.me/api/current?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`;
            getData(end);
        }

        function error() {
            city.innerHTML = "Unable to retrieve your location";
        }
        navigator.geolocation.getCurrentPosition(success, error);
    })();


    function getData(end) {
        fetch(end, {cache: "no-store"}).then((response) => response.json()).then((myJson) => {
            if (myJson.weather[0].icon) {
                renderData(myJson);
            } else {
                getData(end);
            }
        }).catch(() => getData(end));
    }


    function renderData(data) {
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

    }
    /* Toggle convert celsius <-> farenheit */
    function toggleTemp(e) {
        if (e.target.innerHTML.indexOf('C') !== -1) {
            const tempF = (tempMap.main * 1.8 + 32).toFixed(1);
            const tempMin = (tempMap.min * 1.8 + 32).toFixed(1);
            const tempMax = (tempMap.max * 1.8 + 32).toFixed(1);
            temperature.innerHTML = `${tempF}&deg; F`;
            min.innerHTML = `MIN: ${tempMin}&deg`;
            max.innerHTML = `MAX: ${tempMax}&deg`;
        } else {
            temperature.innerHTML = `${tempMap.main}&deg; C`;
            min.innerHTML = `MIN: ${tempMap.min}&deg`;
            max.innerHTML = `MAX: ${tempMap.max}&deg`;
        }
    }
})();