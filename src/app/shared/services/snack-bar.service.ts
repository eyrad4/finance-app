import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    private readonly _snackBar = inject(MatSnackBar);

    open(
        message: string,
        options?: {
            actionName?: string;
            duration?: number;
        }
    ): void {
        const { actionName = 'Hide', duration = 5000 } = options || {};

        this._snackBar.open(message, actionName, { duration });
    }
}
