import { Injectable } from '@angular/core';

import { Nullish } from '@finance-app/shared/cdk/types';

import { AbstractAsyncStorage } from './abstract-async-storage';
import { MemoryStorageService } from './memory-storage.service';

type CustomWindow = {
    localStorage: Storage;
} & Window;

/**
 * Return is storage available
 *
 * @param type Storage name like as localStorage, sessionStorage
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */
const storageAvailable = (type: 'localStorage'): boolean | Nullish => {
    let storage;

    if (typeof window === 'undefined') {
        return false;
    }

    try {
        storage = (window as CustomWindow)?.[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
};

@Injectable({
    providedIn: 'root'
})
export class LocalAsyncStorageService extends AbstractAsyncStorage {
    constructor() {
        super(storageAvailable('localStorage') ? window.localStorage : new MemoryStorageService());
    }
}
