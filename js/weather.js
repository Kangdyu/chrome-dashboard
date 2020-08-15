const API_KEY = "c566c63d8fe82a8696255e14ce8e133f";

const weatherDiv = document.querySelector(".weather");

function printWeather(json) {
    const weatherData = {
        city: json.name,
        temperature: json.main.temp,
        weather: json.weather[0].main,
        icon: json.weather[0].icon,
    };
    const icon = document.createElement("img");
    const city = document.createElement("span");
    const temperature = document.createElement("span");

    icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${weatherData.icon}.png`
    );
    city.innerText = weatherData.city;
    temperature.innerText = weatherData.temperature + "\u2103";

    icon.classList.add("weather-icon");
    city.classList.add("weather-city");
    temperature.classList.add("weather-temp");

    weatherDiv.appendChild(icon);
    weatherDiv.appendChild(city);
    weatherDiv.appendChild(temperature);
}

function getWeather(coords) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            printWeather(json);
        });
}

function getCoordinate(pos) {
    const coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
    };

    getWeather(coords);
}

function getPosition() {
    navigator.geolocation.getCurrentPosition(getCoordinate);
}

function init() {
    getPosition();
}

init();
