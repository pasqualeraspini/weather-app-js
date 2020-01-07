import { elements } from "./base.js";

// Add city to the saved card
export const addCity = city => {
    const html = `
        <li class="city-list__item" data-id="${city.data.id}">
            <div class="city-name">${city.data.name}</div>
            <div class="temperature">${city.data.weather[0].main} ${Math.ceil(city.data.main.temp) - elements.kelvin}°</div>
            <div class="icon" id="delete-icon">
                <svg id="svg-icon">
                    <use xlink:href="#icon-delete"></use>
                </svg>
            </div>
        </li>
    `;

    elements.savedCityList.insertAdjacentHTML('beforeend', html);

    // Show the saved cities title
    elements.savedCardTitle.style.display = 'block';

    // Show the clear cities button
    elements.clearBtn.style.display = 'block';

    // Hide heading (h3)
    elements.h3.style.display = 'none';
}

export const removeCity = e => {
    // Remove city element
    e.target.closest('#delete-icon > svg > use') ? e.target.parentElement.parentElement.parentElement.remove() : e.target.parentElement.parentElement.remove();
}