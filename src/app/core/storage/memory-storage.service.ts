export class MemoryStorageService implements Storage {
    private _data: Record<string, unknown> = {};

    get length(): number {
        return Object.keys(this._data).length;
    }

    clear(): void {
        this._data = {};
    }

    getItem<T>(key: string): T | null {
        return key in this._data ? (this._data[key] as T) : null;
    }

    key(index: number): string | null {
        const keys = Object.keys(this._data);

        return index >= 0 && keys.length < index ? keys[index] : null;
    }

    removeItem(key: string): void {
        delete this._data[key];
    }

    setItem<T>(key: string, value: T): void {
        this._data[key] = value;
    }
}
