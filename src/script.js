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
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}

let date = document.querySelector(".date");
date.innerHTML = `${day}, ${hours}:${min}`;

function formatDay(timestamp){
  let date = new Date(timestamp* 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri,", "Sat"]

  return days[day];

}

function displayForecast(response){
    console.log(response.data.daily);
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`
    forecast.forEach(function(forecastDay, index){
      if (index <6){
        forecastHTML = forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
         <div class="weather-forecast-icon"> <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="icon" width="40"></div>
          <div class="weather-forecast-temp">
            <span id="max-temp">${Math.round(forecastDay.temp.max)}°</span> 
          <span id="min-temp">${Math.round(forecastDay.temp.min)}°</span>
        </div>
        </div>`
      }
     
  })
forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}


function search(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    searchCity(cityInputElement.value);
}
function searchCity(city){
    let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemp);
}

function showTemp(response){
let tempElement = document.querySelector("#number");
let cityElement = document.querySelector("h2");
let descriptionElement = document.querySelector(".weather");
let humidityElement = document.querySelector("#humidity");
let windspeedElement = document.querySelector("#windspeed");
let iconElement =document.querySelector("#icon-description");

celsiusTemperature =response.data.main.temp;

tempElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windspeedElement.innerHTML = Math.round(response.data.wind.speed);
iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

getForecast(response);
}

function getForecast(response){
let lat = response.data.coord.lat;
let lon = response.data.coord.lon;
let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}


function currentLocation(){
    function showposition(position){
        let lat = position.coords.latitude;
        let lon = position.coords.longitude; 
        let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
        axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp)
    }
    navigator.geolocation.getCurrentPosition(showposition);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("click", search);



let locationButton = document.querySelector("#search-location");
locationButton.addEventListener("click",currentLocation )

searchCity("Paris");
