const data = {
  city: "",
  temp: {
    type: "cel",
    min: 0,
    max: 0,
    actual: 0
  },
  desc: "",
  icon: ""
};

//Put the API fetched data in the object data
const setData = function(json) {
  const {
    name: city,
    main: { temp: actual, temp_min: min, temp_max: max },
    weather: [{ description: desc, icon }]
  } = json;
  data.city = city;
  data.temp.actual = actual;
  data.temp.min = min;
  data.temp.max = max;
  data.desc = desc;
  data.icon = icon;
};

//Convert Celcius to Fahrenheit
const calcFarenheit = function(temp) {
  return (temp * 1.8 + 32).toFixed(1);
};

//Convert Fahrenheit to Celcius
const calcCelcius = function(temp) {
  return (((temp - 32) * 5) / 9).toFixed(1);
};

const LogicalController = {
  //Fetch the API data
  fetchData: async function(lat, lon) {
    const end = `https://fcc-weather-api.glitch.me/api/current?lat=${lat.toFixed(
      2
    )}&lon=${lon.toFixed(2)}`;
    const res = await axios.get(end);
    try {
      setData(res.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  //Return the record data
  getData: function() {
    return data;
  },
  //Toggle between the two temperatures
  toggleTemp: function() {
    if (data.temp.type === "cel") {
      data.temp.actual = calcFarenheit(data.temp.actual);
      data.temp.max = calcFarenheit(data.temp.max);
      data.temp.min = calcFarenheit(data.temp.min);
      data.temp.type = "fah";
    } else if (data.temp.type === "fah") {
      data.temp.actual = calcCelcius(data.temp.actual);
      data.temp.max = calcCelcius(data.temp.max);
      data.temp.min = calcCelcius(data.temp.min);
      data.temp.type = "cel";
    }
  }
};

export default LogicalController;
