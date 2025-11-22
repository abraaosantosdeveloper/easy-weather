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

    // Usando variável de ambiente do Vite
    const appId = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

    // Validação da API Key
    if (!appId) {
        console.error('API Key não configurada! Configure VITE_OPENWEATHER_API_KEY no arquivo .env');
        showError('Configuration error. Please contact the administrator.');
        return;
    }

    const searchWeather = () => {
        const url = `${baseUrl}?q=${valueSearch.value}&units=metric&appid=${appId}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
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
            })
            .catch(error => {
                showError('City not found. Please try again.');
            });
    };

    function showError(message) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.innerHTML = `<p>${message}</p>`;
        errorDiv.classList.add('show');

        // Hide the error message after 3 seconds
        setTimeout(() => {
            errorDiv.classList.remove('show');
        }, 3000);
    }
});