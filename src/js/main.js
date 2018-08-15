import WeatherView from "./WeatherView.js";
import WeatherModel from "./WeatherModel.js";
import WeatherController from "./WeatherControl.js";
//import "../css/style.css";

const targetElement = document.getElementById("weather-card");

const Model = WeatherModel();
const View = WeatherView(targetElement);

const controller = WeatherController(View, Model);
controller.getLocation();
