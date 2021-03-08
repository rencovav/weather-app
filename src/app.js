function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let heading = document.querySelector("h1");
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  heading.innerHTML = `${cityName}, ${countryName}`;

  let description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].description;

  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind Speed ${Math.round(response.data.wind.speed)} km/h`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${response.data.main.humidity} %`;

  let visibility = document.querySelector("#visibility");

  visibility.innerHTML = `Visibility ${response.data.visibility / 1000} km`;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels Like ${Math.round(
    response.data.main.feels_like
  )}°C`;
}

function showPosition() {
  let city = document.querySelector("#search-engine");

  let apiKey = "f752986610da7fc7c155ccdd450923d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function searchForACity(event) {
  event.preventDefault();

  let h1 = document.querySelector("h1");
  let searchedCity = document.querySelector("#search-engine");

  if (searchedCity !== undefined) {
    showPosition(searchedCity);
  } else {
    alert("Type something first");
  }
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let celsiusLink = document.querySelector("#celsius-link");

  let attributeCelsius = celsiusLink.getAttribute("is-active");

  if (attributeCelsius === "true") {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
    celsiusLink.setAttribute("is-active", "false");
  }
}

function convertToCelsius(event) {
  event.preventDefault();
  let celsiusLink = document.querySelector("#celsius-link");

  let attributeCelsius = celsiusLink.getAttribute("is-active");

  if (attributeCelsius === "false") {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round((temperature - 32) / 1.8);
    celsiusLink.setAttribute("is-active", "true");
  }
}

let now = new Date();
let currently = document.querySelector("#current-day-time");
currently.innerHTML = formatDate(now);

let button = document.querySelector("#submit-button");

button.addEventListener("click", searchForACity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function retrievePosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f752986610da7fc7c155ccdd450923d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function searchPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector("#location-button");

locationButton.addEventListener("click", searchPosition);
