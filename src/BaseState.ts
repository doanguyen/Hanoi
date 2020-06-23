import { BehaviorSubject } from "rxjs";

interface IState {
    readonly state
}

export class BaseState<T> implements IState {
    // _name: string
    state: BehaviorSubject<T> = new BehaviorSubject<T>(null);

    // get state() {
        // return this.__state
    // }

    // get name(): string {
    //     if (!this._name){
    //         throw ('Not yet implemented');
    //     }
    //     return this._name
    // }

    // set name(name: string) {
    //     this._name = name
    // }
}
