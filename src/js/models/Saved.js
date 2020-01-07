export class Saved {
    constructor() {
        this.saved = [];
        this.utility = false;
    }

    add(city) {
        this.utility = true;

        if(this.utility === true) {
            this.saved.push({
                id: city.data.id,
                name: city.data.name,
                date: city.headers.date,
                temp: city.data.main.temp 
            });
        }
    }

    remove(parentId) {
        this.saved.filter((savedCity, index) => {
            if (savedCity.id === parentId) {
                this.saved.splice(index, 1);
            }
        })
    }
}