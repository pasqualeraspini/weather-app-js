// Models
import { Search } from "./models/Search.js";
import { Saved } from "./models/Saved.js";

// Views
import { 
        getInput, 
        showWeather, 
        forecastWeather,  
        clearStats, 
        showLoader, 
        removeLoader
        } from "./views/searchView.js";
import { addCity, removeCity } from "./views/savedView.js";
import { inputError, savedErr } from "./views/errorView.js";

// Base
import { elements } from "./views/base.js";

const state = {};
let localStorageArray = [];

/**
* Search Control
*/

state.search = new Search();

// Get data from API and show the response in the UI
const search = async query => {
    // Clear Stats
    clearStats();

    // Show Loader
    await showLoader();

    try {
        // Get results of current weather
        await state.search.getCurrent(query)
            .then(result => {
                // Remove loader
                removeLoader();

                // Show Stats
                showWeather(result);

                // Add searched city to the local storage
                localStorage.setItem('searched city', JSON.stringify(result))
            })

        // Get results of forecast weather
        await state.search.getForecast(query) 
        .then(result => {
            // Reverse array to show natural progression of the days
            result.data.list.reverse().forEach(current => {
                // Midday weather
                const midday = current.dt_txt.includes('12:00:00')

                if (midday) {
                    // Show Stats
                    forecastWeather(current);
                }
            })
        })

        
    } catch(err) {
        // City not found error
        inputError('input-error', 'City not found')

        // Remove loader
        removeLoader();

        // Show heading
        elements.h1.style.display = 'block';
    }

    // Reset utility variable
    state.fav.utility = false
}


// Get query 
const controlSearch = query => {
    // Get search value
    query = getInput();

    // Get results based on query
    if (query) {
        search(query)
    } else {
        inputError('input-error', 'Please search a city')
    }
}

// Button search event
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

/**
* Saved Control
*/

state.fav = new Saved();

const savedControl = () => {
    const current =  state.search.current;
    return current
}

// Add city to save list button event
elements.currentWeather.addEventListener('click', e => {
    if (e.target.closest('#add-city')) {
        const response = savedControl();

        // If city is already saved show error otherwise add city to UI
        if(state.fav.utility === true) {
            savedErr('error', 'City is already saved')
        } else {
            // Add city to saved array
            state.fav.add(response)

            // Add city to UI
            addCity(response);

            // Add saved cities inside the local storage
            localStorageArray.push(response)
            localStorage.setItem('saved cities', JSON.stringify(localStorageArray))
        }        
    }
})

// Show the weather of clicked city from saved cities list
elements.savedCityList.addEventListener('click', e => {
    if (e.target.classList.contains('city-list__item')) search(e.target.firstElementChild.textContent)
})


const removeSavedCity = (e, parentId) => {
    // Remove city from saved array
    state.fav.remove(parentId);

    // Remove city from UI
    removeCity(e);

    // Remove clear button if save list is empty && display heading
    if(state.fav.saved.length === 0 || localStorageArray.length === 0) {
        elements.clearBtn.style.display = 'none';
        elements.savedCardTitle.style.display = 'none';
        elements.h3.style.display = 'block';

        // Reset utility variable
        state.fav.utility = false;

        // Remove local storage array if the number of saved cities is 0
        localStorage.removeItem('saved cities');
    };
}

// Remove clicked from local storage array
const removeCityFromLocalStorage = (parentId) => {
    localStorageArray.filter((city, index) => {
        if (parentId === city.data.id) {
            localStorageArray.splice(index, 1);

            // Update local storage array after splice methdod
            localStorage.setItem('saved cities', JSON.stringify(localStorageArray))
        }
    })
}


// Remove city with delete icon
elements.savedCityList.addEventListener('click', (e, parentId) => {    
    if (e.target.getAttribute('xlink:href')) {
        parentId = Number(e.target.parentElement.parentElement.parentElement.dataset.id);

        removeSavedCity(e, parentId);

        removeCityFromLocalStorage(parentId);
    }
    
    if (e.target.id.includes('svg-icon')) {
        parentId = Number(e.target.parentElement.parentElement.dataset.id)
  
        removeSavedCity(e, parentId);

        removeCityFromLocalStorage(parentId);
    }
})

// Remove all cities from saved list
elements.savedCard.addEventListener('click', e => {
    if (e.target.closest('#clear-btn')) {
        // Reset
        elements.savedCityList.innerHTML = '';
        elements.h3.style.display = 'block';
        elements.clearBtn.style.display = 'none';
        elements.savedCardTitle.style.display = 'none';

        // Remove all cities from saved array
        state.fav.saved.splice(0, state.fav.saved.length);
  
        // Show success message
        savedErr('success', 'All cities have been deleted')

        // Reset utility variable
        state.fav.utility = false

        // Remove local storage array on "clear cities" button
        localStorage.removeItem('saved cities');
    }
})

// Load event to get data from local storage
window.addEventListener('load', () => {
    // Get searched city from local storage
    const name = JSON.parse(localStorage.getItem('searched city')).data.name;

    // Show the searched city in UI
    search(name)

    // Get saved cities from local storage
    let citiesStorage = JSON.parse(localStorage.getItem('saved cities'))

    // Show the saved cities in UI
    citiesStorage.forEach(current => {
        // Add saved cities from local storage to ui when reloading
        addCity(current);

        // Updated local storage array when reloading
        localStorageArray.push(current)
    })

    // Updated saved array when reloading
    state.fav.saved = [...citiesStorage];
})
