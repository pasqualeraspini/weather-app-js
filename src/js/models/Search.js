import axios from 'axios';

export class Search {
    constructor() {
        this.key = '52e1ffa360362b361297317f5bc5014f',
        this.proxy = 'https://cors-anywhere.herokuapp.com/'
    };
 
    async getCurrent(query) {
        this.current = await axios.get(`${this.proxy}api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.key}`);
        return this.current
    }

    async getForecast(query) {
        this.forecast = await axios.get(`${this.proxy}api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${this.key}`)
        return this.forecast
    }
}