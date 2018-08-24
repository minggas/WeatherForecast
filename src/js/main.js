import WeatherView from "./components/View/WeatherView.js";
import WeatherModel from "./components/Model/WeatherModel.js";
import WeatherController from "./components/Control/WeatherControl.js";
import "../css/style.css";

const targetElement = document.getElementById("weather-card");

const Model = new WeatherModel();
const View = new WeatherView(targetElement);

const controller = new WeatherController(View, Model);
controller.init();
