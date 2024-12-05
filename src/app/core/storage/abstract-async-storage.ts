import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AsyncStorageInterface } from './interfaces/async-storage.interface';
import { AsyncStorageModel } from './models/async-storage.model';

export const STORAGE_KEY = 'FINANCE_APP_LOCAL_STATE';

export abstract class AbstractAsyncStorage implements AsyncStorageInterface {
    protected readonly _state$!: BehaviorSubject<AsyncStorageModel<object>>;

    protected readonly _key = STORAGE_KEY;

    protected constructor(public readonly storage: Storage) {
        this._state$ = new BehaviorSubject<AsyncStorageModel<object>>(this._getLocalState());
    }

    get state(): AsyncStorageModel<object> {
        return this._state$.getValue();
    }

    get length(): number {
        return Object.keys(this.state).length;
    }

    clear(): void {
        this._setState({});
    }

    getItem$<T>(key: string): Observable<T> {
        return this._state$.pipe(map((state) => state?.[key] as T));
    }

    getItem<T>(key: string): T | null {
        return (this._state$.value?.[key] as T) || null;
    }

    removeItem(key: string): void {
        const state = { ...this.state };
        if (key in state) {
            delete state[key];
            this._setState(state);
        }
    }

    removeItems(keys: string[]): void {
        const state = { ...this.state };

        for (const key of keys) {
            if (key in state) {
                delete state[key];
            }
        }

        this._setState(state);
    }

    setItem<T>(key: string, value: T | Partial<T>): void {
        const getItem = this.getItem(key);
        let newValue = value;
        if (getItem && typeof getItem === 'object' && !Array.isArray(value)) {
            newValue = {
                ...getItem,
                ...newValue
            };
        }

        this._setState({ ...this._state$.getValue(), [key]: newValue } as AsyncStorageModel<object>);
    }

    protected _setState<T extends object>(state: AsyncStorageModel<T>): void {
        this._state$.next(state);
        this._setLocalState(state);
    }

    protected _setLocalState<T>(state: AsyncStorageModel<T>): void {
        try {
            this.storage.setItem(this._key, JSON.stringify(state));
        } catch (error) {
            console.error(error);
        }
    }

    protected _getLocalState(): AsyncStorageModel<object> {
        const state = this.storage.getItem(this._key);

        return state ? JSON.parse(state) : {};
    }
}
