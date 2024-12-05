import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { ConfirmDataDialogModel } from '../models/confirm-data-dialog.model';

@Component({
    selector: 'app-confirm-dialog',
    template: `
        <h2 mat-dialog-title>Are you sure?</h2>
        <mat-dialog-content>This item will be deleted.</mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button mat-dialog-close>Cancel</button>
            <button mat-button cdkFocusInitial (click)="_confirm()">Delete</button>
        </mat-dialog-actions>
    `,
    imports: [MatDialogModule, MatDialogActions, MatDialogTitle, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
    private readonly _dialogData: ConfirmDataDialogModel = inject(MAT_DIALOG_DATA, { optional: true });

    private readonly _dialogRef = inject(MatDialogRef<ConfirmDialogComponent, boolean>);

    protected _confirm(): void {
        this._dialogRef.close(true);
    }
}
