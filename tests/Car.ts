import { BehaviorSubject } from "rxjs";
import { BaseState } from "../src/State";
import { vault } from "../src/Vault";
import { State } from "../src/decorators";

interface ICar {
    name: string
    price: number
}

@State()
export class Car extends BaseState<ICar[]> {
    
    readonly state: BehaviorSubject<ICar[]> = new BehaviorSubject<ICar[]>([]);


    @vault.dispatch()
    updateCar(carName: string, newName: string): ICar[] {
        return this.state.value.map(s => {
            if (s.name === carName) {
                s.name = newName
            }
            return s
        })
    }

    @vault.dispatch()
    insertCar(car: ICar){
        return [
            ...this.state.value,
            car
        ]
    }

    @vault.dispatch()
    async insertAsync(car: ICar) {
        const newCar = await resolveAfter1Seconds(car);
        console.log(newCar)
        return []
    }

}


async function resolveAfter1Seconds(anotherCar) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(anotherCar);
      }, 1000);
    });
  }
