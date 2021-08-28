function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;

  // function formatDay(timestamp) {
  //   let date = new Date(timestamp * 1000);
  //   let day = date.getDay();
  //   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //   return days[day];
  // }
}

function showCurrentCity(event) {
  event.preventDefault();
  let cityInput = document.getElementById("enterCity");
  if (cityInput.value) {
    document.getElementById("currentCity").innerHTML = cityInput.value;
    fetchCityWeather(cityInput.value);
  } else {
    alert("Search box empty!!!!");
  }
}

function fetchCityWeather(city) {
  let apiKey = "535adbff4597f2b7f1f8f5bc7a5b73aa";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&timezone=0`;

  axios.get(`${url}&appid=${apiKey}`).then(displayTemperature);
}

function displayTemperature(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  let city = response.data.name;
  let descriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#lastUpdated");
  let iconElement = document.querySelector("#icon");

  document.getElementById("currentCity").innerHTML = city;
  document.querySelector("#currentTemperature").innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "535adbff4597f2b7f1f8f5bc7a5b73aa";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(displayTemperature);
}

function handleLocationButton() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
document
  .querySelector("#currentLocationButton")
  .addEventListener("click", handleLocationButton);

document
  .querySelector("#searchForm")
  .addEventListener("submit", showCurrentCity);

//navigator.geolocation.getCurrentPosition(showPosition);

function displayFahrenheidTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheidLink.classList.add("active");
  let fahrenheidTemperature = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(fahrenheidTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheidLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheidLink = document.querySelector("#currentTemperatureF");
fahrenheidLink.addEventListener("click", displayFahrenheidTemperature);

let celsiusLink = document.querySelector("#currentTemperatureC");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemp = null;

fetchCityWeather("New York");
