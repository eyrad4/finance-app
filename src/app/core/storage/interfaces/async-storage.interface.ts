import { Observable } from 'rxjs';

export interface AsyncStorageInterface {
    getItem$<T>(key: string): Observable<T>;
    setItem<T>(key: string, value: T): void;
    removeItem(key: string): void;
    clear(): void;
}
