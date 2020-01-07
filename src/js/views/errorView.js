import { elements } from "./base";

export const inputError = (className, message) => {
    // Add class
    elements.inputError.classList.add(className);

    // Add message
    elements.inputError.innerHTML = `
        <svg>
            <use xlink:href="#error-icon"/>
        </svg> 
        ${message}
    `;

    // Add style
    elements.inputError.style.opacity = '1';
    elements.inputError.style.zIndex = '1';

    // Reset
    setTimeout(() => {
        elements.inputError.classList.remove(className)
        elements.inputError.style.opacity = '0';
        elements.inputError.style.zIndex = '-1';
    }, 2000);
}


export const savedErr = (className, message) => {
    const div = document.createElement('div');

    div.className = `header__container-saved-card--${className}`

    div.textContent = message;

    elements.savedCardTitle.insertAdjacentElement('beforebegin', div);

    // Reset
    setTimeout(() => {
        elements.savedCard.removeChild(div);
    }, 2000);
}
 