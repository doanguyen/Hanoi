import { BaseState } from "./BaseState";
import { vault } from "./Vault";
import { State } from "./decorators";

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