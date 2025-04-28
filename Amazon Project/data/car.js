class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;
    
    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo() {
        console.log(`Brand: ${this.#brand} Model: ${this.#model} Speed: ${this.speed} km/h Trunk: ${this.isTrunkOpen === false ? 'Close' : 'Open'}`)
    }
    go() {
        if (this.speed <= 200 && this.isTrunkOpen === false) {
            this.speed += 5;
        }
    }
    brake() {
        if(this.speed >= 0) {
            this.speed -= 5;
        }
    }
    openTrunk() {
        if(this.speed === 0) {
            this.isTrunkOpen = true
        }
    }
    closeTrunk() {
        this.isTrunkOpen = false
    }
    
}

class RaceCar extends Car {
    acceleration;
    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration
    }
    go() {
        if (this.speed <= 300) {
            this.speed += this.acceleration;
        }
    }
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'})
const car2 = new Car({brand: 'Tesla', model: 'Model 3'})
const raceCar1 = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20})

car1.go();
car1.openTrunk();
car1.displayInfo();
car2.displayInfo();

raceCar1.go();
raceCar1.displayInfo();