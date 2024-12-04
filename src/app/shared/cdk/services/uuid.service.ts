import { inject, Injectable } from '@angular/core';

import { CRYPTO } from '@finance-app/shared/cdk/web-apis';

@Injectable({ providedIn: 'root' })
export class UuidService {
    private readonly _crypto = inject(CRYPTO);

    uuid(): string {
        if (typeof this._crypto?.randomUUID === 'function') {
            return this._crypto?.randomUUID();
        }
        return new Date().getTime().toString();
    }
}
