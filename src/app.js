function formatDate(timestapm) {
  let date = new Date(timestapm);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#mainTemp");
  let cityElement = document.querySelector("#mainCity");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "c9e7c616f339faf20a83dcb2c84cda54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city-input");
  search(cityInputElement.value);
}

function formatDay(timestapm) {
  let date = new Date(timestapm * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
search("Kyiv");

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecatsHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecatsHTML =
        forecatsHTML +
        `<div class="col-2">
<div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div> 
<img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="sunny" width="60">
<div class="weather-forecast-temp"> <span class="weather-forecast-temp-max"> ${Math.round(
          forecastDay.temp.max
        )}°</span> 
<span class="weather-forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span>  
</div>
</div>`;
    }
  });

  forecatsHTML = forecatsHTML + `</div>`;
  forecastElement.innerHTML = forecatsHTML;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#mainTemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusitLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#mainTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusitLink.classList.add("active");
}

let celsiusTemp = null;
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusitLink = document.querySelector("#celsius-link");
celsiusitLink.addEventListener("click", displayCelsiusTemp);
