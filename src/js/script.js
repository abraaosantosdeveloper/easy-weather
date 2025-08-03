document.addEventListener('DOMContentLoaded', () => {
    let valueSearch = document.getElementById("city-input");
    let cityName = document.getElementById('city-name');
    let cityWeatherInfo = document.getElementById('city-weather-info');
    let maxtemperature = document.getElementById('temperature-max');
    let mintemperature = document.getElementById('temperature-min');
    let currentTemperature = document.getElementById('temperature-current');
    let description = document.getElementById('city-weather-info');
    let humidity = document.getElementById('humidity');
    let windSpeed = document.getElementById('wind-speed');
    let form = document.getElementById('weather-form');
    let weatherIcon = document.getElementById('weather-icon');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (valueSearch.value != "") {
            searchWeather();
        }
    });

    const searchWeather = async () => {
        try {
            const response = await fetch(`/api/weather?city=${valueSearch.value}`);
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            console.log(data);
            weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            cityName.textContent = data.name;
            cityWeatherInfo.textContent = data.weather[0].description;
            maxtemperature.textContent = `${data.main.temp_max} °C`;
            mintemperature.textContent = `${data.main.temp_min} °C`;
            currentTemperature.textContent = `${data.main.temp.toFixed(0)}°C`;
            description.textContent = `${data.weather[0].description}`;
            humidity.textContent = `${data.main.humidity} %`;
            windSpeed.textContent = `${data.wind.speed} m/s`;
            valueSearch.value = "";
        } catch (error) {
            console.error('Error:', error);
        }
    };
});