let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let todayDate = document.querySelector("#date");
todayDate.innerHTML = ` ${currentDay}, ${hours}:${minutes} `;

function searchLocation(position) {
  let apiKey = "c9e7c616f339faf20a83dcb2c84cda54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longtitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function locateMe(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function search(city) {
  let apiKey = "c9e7c616f339faf20a83dcb2c84cda54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function showWeatherCondition(response) {
  console.log(response);
  document.querySelector("#mainCity").innerHTML = response.data.name;
  document.querySelector("#mainTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentState").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);
}

let locateButton = document.querySelector("locate-button");
locateButton.addEventListener("click", locateMe);
//let input = document.querySelector("#search-city-input");
//let inputResult = document.querySelector("h1");
//inputResult.innerHTML = `${input.value}`;
search("Kyiv");
let form = document.querySelector(".city-form");
form.addEventListener("submit", searchCity);
