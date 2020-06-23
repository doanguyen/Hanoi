import { Bike } from "./Bike";
import { Car } from "./Car";
import { vault } from "./Vault";

const x = new Car()
const car = vault.select(Car)

car.subscribe(v => console.log(v))

x.updateCar('Honda', "Honda Civic")


const anotherCar = {
    name: "Toyota",
    price: 24
}

x.insertCar(anotherCar)


let bike = new Bike();
bike.addBike()
setTimeout(() => {
    x.updateCar('Honda Civic', "Honda City")
}, 5000)

const selectBike = vault.select(Bike)
selectBike.subscribe(x => console.log("This is the bike subscription", x))
x.insertCar(anotherCar)

// x.insertAsync(anotherCar)
