import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Nullish } from '@finance-app/shared/cdk/types';

import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import { ConfirmDataDialogModel } from './models/confirm-data-dialog.model';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    private readonly _dialog = inject(MatDialog);

    confirm(config?: MatDialogConfig<ConfirmDataDialogModel>): Observable<boolean | Nullish> {
        return this._dialog.open<ConfirmDialogComponent, ConfirmDataDialogModel, boolean>(ConfirmDialogComponent, config).afterClosed();
    }
}
