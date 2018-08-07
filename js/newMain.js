import UI from "./UIControl.js";
import logical from "./Logical.js";

const setupEventListeners = function() {
  const DOM = UI.getDOMStr();
  //add listener to the temparature toggle button
  document.querySelector(DOM.toggleTemp).addEventListener("click", toggleTemp);
};

const toggleTemp = function(e) {
  UI.toggleBtn(e.currentTarget);
  logical.toggleTemp();
  updateData();
};

const getData = function() {
  //Verify if navigator support geolocation
  if (!navigator.geolocation) {
    UI.errorMsg("Geolocation is not supported by your browser");
    return;
  }

  //Fetch data and display in the UI
  async function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    //Fetch
    const data = await logical.fetchData(lat, lon);
    //Display in the UI
    UI.showData(data);
  }
  //Display error in the UI
  function error() {
    UI.errorMsg("Unable to retrieve your location");
  }
  navigator.geolocation.getCurrentPosition(success, error);
};
//Updade the UI
const updateData = function() {
  const data = logical.getData();
  UI.showData(data);
};
const controller = {
  //Initial function
  init: function() {
    setupEventListeners();
    getData();
  }
};

//Start the app
controller.init();
