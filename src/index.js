function formatDate(newDate) {
  let now = new Date();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  document.getElementById("currentDay").innerHTML = `${day}`;
  document.getElementById("currentTime").innerHTML = `${hours}:${minutes}`;
}
formatDate();

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
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(displayTemperature);
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  document.getElementById("currentCity").innerHTML = city;
  document.querySelector("#currentTemperatureC").innerHTML = `${temperature}`;
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
