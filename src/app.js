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

  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;

  let apiKey = "f752986610da7fc7c155ccdd450923d4";
  apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrlForecast}`).then(displayForecast);
}
function displayForecast(responseForecast) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  let currentDay = new Date();
  let shortenedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 6; i++) {
    let j = i;
    if (j + currentDay.getDay() > 6) {
      j -= 7;
    }
    let day = shortenedDays[currentDay.getDay() + j];

    forecast = responseForecast.data.daily[i];
    forecastElement.innerHTML += ` 
    <div class="col-2">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${day}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                <img src="http://openweathermap.org/img/wn/${
                  responseForecast.data.daily[i].weather[0].icon
                }@2x.png"/>
              </h6>
              <p class="card-text">
                ${Math.round(responseForecast.data.daily[i].temp.day)}°C /
                ${Math.round(responseForecast.data.daily[i].temp.night)}°C
              </p>
            </div>
          </div>
        </div>
      </div>`;
  }
}

function showPosition() {
  let city = document.querySelector("#search-engine");
  if (city.value === "") {
    alert("Type something first");
  } else {
    let apiKey = "f752986610da7fc7c155ccdd450923d4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

    axios.get(`${apiUrl}`).then(showTemperature);
  }
}

function searchForACity(event) {
  event.preventDefault();

  let h1 = document.querySelector("h1");
  let searchedCity = document.querySelector("#search-engine");

  showPosition(searchedCity);
}

function formatDate(data) {
  let date = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();
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

  return `${date}. ${month}. ${year}, ${day} ${hours}:${minutes}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

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
now.get;
let currently = document.querySelector("#current-day-time");
currently.innerHTML = formatDate(now);

let button = document.querySelector("#submit-button");

button.addEventListener("click", searchForACity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f752986610da7fc7c155ccdd450923d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);

  apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrlForecast}`).then(displayForecast);
}

function searchPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector("#location-button");

locationButton.addEventListener("click", searchPosition);
