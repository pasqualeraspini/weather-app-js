import { elements } from "./base.js";

// Get Input Value
export const getInput = () => elements.searchInput.value;

// Clear Card Stats
export const clearStats = () => {
    elements.currentWeather.innerHTML = '';
    elements.forecastWeather.innerHTML = '';
    elements.h1.style.display = 'none';
}

// Show Current Weather Stats
export const showWeather = weather => {
    const html = `
        <div class="header__container-card--stats-city-name">
            <span>${weather.data.name}, ${weather.data.sys.country}</span>
            <div class="weather-city icon">
                <img src="http://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png">
            </div>
        </div>

        <div class="header__container-card--stats-coords">Coords: <a href="https://maps.google.com/?q=${weather.data.name}" target="_blank" class="coords__link">${weather.data.coord.lon} - ${weather.data.coord.lat}</a></div>

        <div class="header__container-card--stats-city">
            <div class="date">Today ${getDate()}</div>
            <div class="temperature">${Math.ceil(weather.data.main.temp) - elements.kelvin}°</div>
        </div> 

        <div class="header__container-card--stats-secondary">
            <div class="minmax">
                <div>Temp Min: ${Math.ceil(weather.data.main.temp_min) - elements.kelvin}°</div>
                <div>Temp Max: ${Math.ceil(weather.data.main.temp_max) - elements.kelvin}°</div>
            </div> 
            <div class="parameters">
                <div>Humidity: ${weather.data.main.humidity} %</div>
                <div>Pressure: ${weather.data.main.pressure} hpa</div>
                <div>Wind Speed: ${weather.data.wind.speed} m/s</div>
            </div> 
        </div>

        <div class="btn header__container-card--stats-btn" id="add-city">Add city</div>
    `;

    elements.currentWeather.insertAdjacentHTML('afterbegin', html)
    elements.searchInput.value = ''
}

// Show forecast Weather Stats
export const forecastWeather = weather => {
    let dateArray = weather.dt_txt.split(' ')[0].split('-')

    const html = `
        <li class="days-list__item">
            <div class="date">${dateArray[2]}/${dateArray[1]}/${dateArray[0]}</div>
            <div class="icon" style="top: 2.8rem">
                <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png">
            </div>
            <div class="temperature">${weather.weather[0].main} ${Math.ceil(weather.main.temp) - elements.kelvin}°</div>
        </li>
    `

    elements.forecastWeather.insertAdjacentHTML('afterbegin', html)
}

// Show loader 
export const showLoader = async () => {
    const loader = `
        <div class="header__container-card--loader">
            <svg> 
                <clipPath id="filler">
                    <rect width="100%" height="100%" />
                </clipPath>
                <use clip-path="url(#filler)" xlink:href="#icon-logo" />
            </svg>
        </div>
    `;

    elements.currentWeather.insertAdjacentHTML('beforebegin', loader)
}

// Remove Loader
export const removeLoader = () => {
    elements.currentWeatherCard.children[1].remove()
};

// Get Today Date
const getDate = () => {
    let today = String(
                new Date())
                .split(' ')
                .splice(0, 4);
    return `${today[2]}th ${today[1]} ${today[3]}`
}

