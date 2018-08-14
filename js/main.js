import WeatherView from "./WeatherView.js";
import WeatherModel from "./WeatherModel.js";
import WeatherController from "./WeatherControl.js";

const targetElement = document.getElementById("weather-card");

const Model = new WeatherModel();
const View = new WeatherView(targetElement);

const controller = new WeatherController(View, Model);
controller.getLocation();
