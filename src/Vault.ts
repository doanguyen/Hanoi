import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, distinctUntilChanged } from "rxjs/operators";
import {Map} from "immutable"

export type IStore<T> = {
    [key: string]: T
}

type MapStore = Record<string, any>

export class Vault {

    private readonly _store: BehaviorSubject<MapStore> = new BehaviorSubject<MapStore>(Map<string, any>());

    store = this._store.asObservable();

    constructor() {}

    dispatch = () => {
        let that = this;
        return (func: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            let originalMethod = descriptor.value;
            descriptor.value = function (...args: any[]) {
                let value = originalMethod.apply(this, args);

                // console.log(this.constructor.prototype.__metadata__)

                // When we have the result:
                // 1. We update the global store
                // 2. We update the local store so that we can get the current value of the store
                let storeName: string
                if (this.constructor.prototype.__metadata__) {
                    storeName = this.constructor.prototype.__metadata__;
                } else {
                    storeName = this.constructor.name;
                }

                that.updateStore(
                    { storeName, value }
                );
                
                this.state.next(value);
                return value;
            };
        };
    };

    /**
     * Select the local store
     * @param storeName Get the store name, either by string or the function name
     */
    select<T>(storeName: string | Function): Observable<IStore<T>> {

        if (typeof storeName === 'function') {
            // It first check the __metadata__ property in the class
            // if not fall back to the class name
            storeName = storeName.constructor.prototype.__metadata__ ? storeName.constructor.prototype.__metadata__ : storeName.prototype.constructor.name;
        }

        // It must be sure that the store value must be immutable
        return this.store.pipe(
            filter(store => store.has(storeName)),
            map(store => store.get(storeName)),
            distinctUntilChanged(),
        );
    }


    /**
     * TODO: Update this part
     * @param updateState part of the state
     */
    private updateStore(updateState: any) {
        const {storeName, value} = updateState,
        currentGlobalState: MapStore = this._store.value
        let newState = currentGlobalState.set(storeName, value)
        this._store.next(newState);
    }

    getSnapshot() {
        return this._store.value;
    }
}

export const vault = new Vault();
