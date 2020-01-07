export const elements = {
    // General selectors
    kelvin: 273,
    h1: document.querySelector('.header__container-card--text'),
    h3: document.querySelector('.header__container-saved-card--text'),
    searchForm: document.querySelector('.header__container-nav--form'),
    searchInput: document.querySelector('.header__container-nav--form-input'),
    savedCardTitle: document.querySelector('.header__container-saved-card--title'),
    loader: document.querySelector('.header__container-card--loader'),
    savedCities: document.querySelectorAll('.city-list__item'),
    
    // Buttons
    inputBtn: document.querySelector('.header__container-nav--form-btn'),
    clearBtn: document.querySelector('.header__container-saved-card--clear'),

    // Containers
    header: document.querySelector('.header'),
    currentWeatherCard: document.querySelector('.header__container-card'),
    currentWeather: document.querySelector('.header__container-card--stats'),
    forecastWeather: document.querySelector('.days-list'),
    savedCard: document.querySelector('.header__container-saved-card'),
    savedCityList: document.querySelector('.city-list'),
    
    inputError: document.querySelector('.header__container-nav--form-error'),
    savedErr: document.querySelector('.header__container-saved-card--success')
} 
