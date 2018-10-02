//Convert Celcius to Fahrenheit
function calcFarenheit(temp) {
  return Math.round(temp * 1.8 + 32);
}

function calcCelcius(temp) {
  return Math.round((temp - 32) * 0.5556);
}

module.exports = { calcCelcius, calcFarenheit };
