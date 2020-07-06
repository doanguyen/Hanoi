import { BaseState } from "../src/State";
import { vault } from "../src/Vault";
import { State } from "../src/decorators";

interface IBike {
    name: string
    velocity: number
}

@State()
export class Bike extends BaseState<IBike[]> {

    defaultBike: IBike = {
        name: "Phuong Hoang",
        velocity: 33
    }

    @vault.dispatch()
    addBike(){
        return [this.defaultBike]
    }
}