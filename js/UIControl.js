const DOMstr = {
  city: ".city",
  temperature: ".temperature",
  min: ".min-btn",
  max: ".max-btn",
  description: ".description",
  icon: ".icon",
  toggleTemp: ".toggle-temp"
};

const UIController = {
  //Put data on the DOM
  showData: function(dataObj) {
    let {
      city,
      temp: { actual, min, max, type },
      desc,
      icon
    } = dataObj;
    type = type === "cel" ? "C" : "F";
    document.querySelector(DOMstr.city).innerHTML = city;
    document.querySelector(
      DOMstr.temperature
    ).innerHTML = `${actual} ${type}&deg;`;
    document.querySelector(DOMstr.min).innerHTML = `MIN: ${min} ${type}&deg;`;
    document.querySelector(DOMstr.max).innerHTML = `MAX: ${max} ${type}&deg;`;
    document.querySelector(DOMstr.description).innerHTML = desc;
    document.querySelector(DOMstr.icon).src = iconsPath[icon];

  //Show error messages
  errorMsg: function(msg) {
    document.querySelector(DOMstr.city).innerHTML = msg;
  },

  getDOMStr: function() {
    return DOMstr;
  },

  toggleBtn: function(el) {
    el.firstElementChild.classList.toggle("active");
    el.lastElementChild.classList.toggle("active");
  }
};

export default UIController;
